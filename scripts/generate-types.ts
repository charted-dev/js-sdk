/*
 * 🐻‍❄️📦 @ncharts/sdk: TypeScript SDK library for Noelware's Charts Platform
 * Copyright 2023 Noelware, LLC. <team@noelware.org>
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

import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { Signale } from 'signale';
import openapi from 'openapi-typescript';

const log = new Signale({
    scope: 'charted:sdk:openapi[types]',
    config: {
        displayBadge: true,
        displayScope: true,
        displayTimestamp: true,
        displayDate: true
    }
});

const TITLE = [
    '/*',
    " * 🐻‍❄️📦 @ncharts/sdk: TypeScript SDK library for Noelware's Charts Platform",
    ' * Copyright 2023 Noelware, LLC. <team@noelware.org>',
    ' *',
    ' * Permission is hereby granted, free of charge, to any person obtaining a copy',
    ' * of this software and associated documentation files (the "Software"), to deal',
    ' * in the Software without restriction, including without limitation the rights',
    ' * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell',
    ' * copies of the Software, and to permit persons to whom the Software is',
    ' * furnished to do so, subject to the following conditions:',
    ' *',
    ' * The above copyright notice and this permission notice shall be included in all',
    ' * copies or substantial portions of the Software.',
    ' *',
    ' * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR',
    ' * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,',
    ' * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE',
    ' * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER',
    ' * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,',
    ' * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE',
    ' * SOFTWARE.',
    ' */',
    '',
    '/* eslint-ignore */',
    '// prettier-ignore',
    '',
    '// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=',
    '//            This file was generated from ./scripts/generate-types.ts',
    '// Please do not make any changes. It will not be present in the next invocation.',
    '// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='
].join('\n');

async function main() {
    const code = await openapi('http://localhost:3651/_openapi', {
        silent: true,
        supportArrayLength: true
    });

    const newContent = `${TITLE}\n${code.split('\n').slice(5).join('\n')}`.trim();
    await writeFile(resolve(process.cwd(), 'packages/types/src/generated.d.ts'), newContent);

    log.info('✨ Updated generated OpenAPI types!');
}

main().catch((ex) => {
    log.error(ex);
    process.exit(1);
});
