/*
 * 🐻‍❄️📦 @ncharts/sdk: TypeScript SDK library for Noelware's Charts Platform
 * Copyright 2022-2023 Noelware <team@noelware.org>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { relative, resolve } from 'path';
import { warning, error } from '@actions/core';
import { Signale } from 'signale';
import { ESLint } from 'eslint';

const log = new Signale({
  scope: 'charted:eslint',
  config: {
    displayBadge: true,
    displayScope: true,
    displayTimestamp: true,
    displayDate: true
  }
});

const DIRS = ['packages/sdk', 'packages/types', 'scripts'] as const;
let symbols: typeof import('log-symbols')['default'] = null!;

const printResults = (dir: string, results: ESLint.LintResult[]) => {
  for (const result of results) {
    const path = relative(resolve(__dirname, '..', dir), result.filePath);
    const hasErrors = result.errorCount > 0;
    const hasWarnings = result.warningCount > 0;
    const symbol = hasErrors ? symbols.error : hasWarnings ? symbols.warning : symbols.success;

    log.info(`${symbol}   ${dir}/${path}`);
    for (const message of result.messages) {
      const s = message.severity === 1 ? symbols.warning : symbols.error;
      if (process.env.CI !== undefined) {
        const method = message.severity === 1 ? warning : error;
        method(`${s} ${message.message} (${message.ruleId})`, {
          endColumn: message.endColumn,
          endLine: message.endLine,
          file: result.filePath,
          startLine: message.line,
          startColumn: message.column
        });
      } else {
        const method = message.severity === 1 ? log.warn : log.error;
        method(`    * ${s}   ${message.message} (${message.ruleId})`);
      }
    }
  }
};

async function main() {
  symbols = await import('log-symbols').then((f) => f.default);
  const eslint = new ESLint({
    useEslintrc: true,
    fix: process.env.CI === undefined
  });

  for (const dir of DIRS) {
    log.info(`Linting directory [${dir}]`);
    const results = await eslint.lintFiles(`${dir}/**/*.{ts,js}`);
    printResults(dir, results);
  }
}

main().catch((ex) => {
  log.error(ex);
  process.exit(1);
});
