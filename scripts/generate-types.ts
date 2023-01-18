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

import { GenericContainer } from 'testcontainers';
import { Signale } from 'signale';

const log = new Signale({
  scope: 'charted:generate:types',
  config: {
    displayBadge: true,
    displayScope: true,
    displayTimestamp: true,
    displayDate: true
  }
});

async function main() {
  const argv = process.argv.slice(2);
  const tag = argv.at(0) || 'nightly';

  log.info(`Running Docker image [ghcr.io/charted-dev/charted:${tag}]`);
  const container = new GenericContainer(`ghcr.io/charted-dev/charted:${tag}`).withCommand([
    'charted',
    'openapi',
    '--stdout',
    '--format=json',
    '--version=3.0'
  ]);

  const ct = await container.start();
  const stream = await ct.logs();
  const stdout: any[] = [];

  await new Promise<void>((resolve, reject) => {
    stream
      .on('data', console.log)
      .on('error', (error) => {
        log.error('Unable to run `charted openapi --stdout --format=json --version=3.0`:', error);
        reject(error);
      })
      .on('end', () => {
        log.info('Stream has ended');
        resolve();
      });
  });

  console.log(stdout);
}

main().catch((ex) => {
  log.error(ex);
  process.exit(1);
});
