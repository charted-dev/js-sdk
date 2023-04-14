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

import { cp, mkdir, readFile, writeFile } from 'fs/promises';
import { bold, gray } from 'colorette';
import { existsSync } from 'fs';
import { Signale } from 'signale';
import { resolve } from 'path';
import { build } from 'tsup';
import run from './util/run';

const log = new Signale({
    scope: 'charted:sdk:build',
    config: {
        displayBadge: true,
        displayScope: true,
        displayTimestamp: true,
        displayDate: true
    }
});

const rootDistDir = resolve(process.cwd(), 'dist');
const packagesDir = resolve(process.cwd(), 'packages');
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
    ''
].join('\n');

run(log, async () => {
    const version = await readFile(resolve(process.cwd(), '.sdk-version'), 'utf-8').then((f) => f.trim());
    const serverVersion = await readFile(resolve(process.cwd(), '.api-server-version'), 'utf-8').then((f) => f.trim());

    if (!existsSync(resolve(rootDistDir, 'types'))) await mkdir(resolve(rootDistDir, 'types'), { recursive: true });
    if (!existsSync(resolve(rootDistDir, 'sdk'))) await mkdir(resolve(rootDistDir, 'sdk'), { recursive: true });

    // scope for @ncharts/types
    {
        let now = Date.now();
        const created = now;
        log.info(`🐻‍❄️✨ Building ${bold('@ncharts/types')}...`);

        const generatedAt = new Date();
        const readme = await readFile(resolve(packagesDir, 'types/README.md'), 'utf-8');
        const packageJson = await readFile(resolve(packagesDir, 'types/package.json'), 'utf-8').then((json) =>
            JSON.parse(json)
        );

        // packages/types/package.json ~> dist/types/package.json
        packageJson.version = version;
        await writeFile(resolve(rootDistDir, 'types/package.json'), JSON.stringify(packageJson, null, 4));
        log.success(
            `${' '.repeat('🐻‍❄️✨'.length - 1)} ${gray(
                'packages/types/package.json       ~> dist/types/package.json'
            )} [${gray(`${Date.now() - now}ms`)}]`
        );

        now = Date.now();

        // packages/types/README.md ~> dist/types/README.md
        await writeFile(
            resolve(rootDistDir, 'types/README.md'),
            readme.replace('{{SERVER_VERSION}}', serverVersion).replace('{{GENERATED_AT}}', generatedAt.toISOString())
        );

        log.success(
            `${' '.repeat('🐻‍❄️✨'.length - 1)} ${gray(
                'packages/types/README.md          ~> dist/types/README.md'
            )} [${gray(`${Date.now() - now}ms`)}]`
        );

        now = Date.now();

        // LICENSE ~> dist/types/LICENSE
        await cp(resolve(process.cwd(), 'LICENSE'), resolve(rootDistDir, 'types/LICENSE'), {
            errorOnExist: false,
            preserveTimestamps: true
        });

        log.success(
            `${' '.repeat('🐻‍❄️✨'.length - 1)} ${gray(
                'LICENSE                           ~> dist/types/LICENSE'
            )} [${gray(`${Date.now() - now}ms`)}]`
        );

        now = Date.now();

        // packages/types/src/index.d.ts ~> dist/types/dist/index.d.ts
        const indexDts = await readFile(resolve(packagesDir, 'types/src/index.d.ts'), 'utf-8');
        if (!existsSync(resolve(rootDistDir, 'types/dist')))
            await mkdir(resolve(rootDistDir, 'types/dist'), { recursive: true });

        await writeFile(
            resolve(rootDistDir, 'types/dist/index.d.ts'),
            indexDts.replace('{{SERVER_VERSION}}', serverVersion).replace('{{GENERATED_AT}}', generatedAt.toISOString())
        );

        log.success(
            `${' '.repeat('🐻‍❄️✨'.length - 1)} ${gray(
                'packages/types/src/index.d.ts     ~> dist/types/dist/index.d.ts'
            )} [${gray(`${Date.now() - now}ms`)}]`
        );

        now = Date.now();

        // packages/types/src/generated.d.ts ~> dist/types/dist/generated.d.ts
        await cp(
            resolve(process.cwd(), 'packages/types/src/generated.d.ts'),
            resolve(rootDistDir, 'types/dist/generated.d.ts'),
            {
                errorOnExist: false,
                preserveTimestamps: true
            }
        );

        log.success(
            `${' '.repeat('🐻‍❄️✨'.length - 1)} ${gray(
                'packages/types/src/generated.d.ts ~> dist/types/dist/generated.d.ts'
            )} [${gray(`${Date.now() - now}ms`)}]`
        );

        now = Date.now();

        // packages/types/index.js ~> dist/types/types/index.js
        await cp(resolve(process.cwd(), 'packages/types/index.js'), resolve(rootDistDir, 'types/dist/index.js'), {
            errorOnExist: false,
            preserveTimestamps: true
        });

        log.success(
            `${' '.repeat('🐻‍❄️✨'.length - 1)} ${gray(
                'packages/types/index.js           ~> dist/types/dist/index.js'
            )} [${gray(`${Date.now() - now}ms`)}]`
        );

        now = Date.now();

        // packages/types/index.mjs ~> dist/types/types/index.mjs
        await cp(resolve(process.cwd(), 'packages/types/index.mjs'), resolve(rootDistDir, 'types/dist/index.mjs'), {
            errorOnExist: false,
            preserveTimestamps: true
        });

        log.success(
            `${' '.repeat('🐻‍❄️✨'.length - 1)} ${gray(
                'packages/types/index.mjs          ~> dist/types/dist/index.mjs'
            )} [${gray(`${Date.now() - now}ms`)}]`
        );

        log.success(
            `${' '.repeat('🐻‍❄️✨'.length - 1)} ${gray(`took ${Date.now() - created}ms to build`)} ${bold(
                '@ncharts/types'
            )}`
        );
    }

    // scope for @ncharts/sdk
    {
        let now = Date.now();
        const created = now;
        log.info(`🐻‍❄️✨ Building ${bold('@ncharts/sdk')}...`);

        if (!existsSync(resolve(rootDistDir, 'sdk/dist')))
            await mkdir(resolve(rootDistDir, 'sdk/dist'), { recursive: true });

        // LICENSE ~> dist/sdk/LICENSE
        await cp(resolve(process.cwd(), 'LICENSE'), resolve(rootDistDir, 'sdk/LICENSE'), {
            errorOnExist: false,
            preserveTimestamps: true
        });

        log.success(
            `${' '.repeat('🐻‍❄️✨'.length - 1)} ${gray('LICENSE                   ~> sdk/types/LICENSE')} [${gray(
                `${Date.now() - now}ms`
            )}]`
        );

        now = Date.now();

        // packages/sdk/README.md ~> dist/sdk/LICENSE
        await cp(resolve(packagesDir, 'sdk/README.md'), resolve(rootDistDir, 'sdk/README.md'), {
            errorOnExist: false,
            preserveTimestamps: true
        });

        log.success(
            `${' '.repeat('🐻‍❄️✨'.length - 1)} ${gray('packages/sdk/README.md    ~> dist/sdk/README.md')} [${gray(
                `${Date.now() - now}ms`
            )}]`
        );

        now = Date.now();

        const packageJson = await readFile(resolve(packagesDir, 'sdk/package.json'), 'utf-8').then((json) =>
            JSON.parse(json)
        );

        // packages/sdk/package.json ~> dist/sdk/package.json
        packageJson.version = version;
        packageJson.dependencies['@ncharts/types'] = version;

        await writeFile(resolve(rootDistDir, 'sdk/package.json'), JSON.stringify(packageJson, null, 4));
        log.success(
            `${' '.repeat('🐻‍❄️✨'.length - 1)} ${gray('packages/sdk/package.json ~> dist/sdk/package.json')} [${gray(
                `${Date.now() - now}ms`
            )}]`
        );

        now = Date.now();

        // packages/sdk/src/*.ts ~> dist/sdk/dist/*.[mjs|js]
        await build({
            platform: 'node',
            target: ['es2022', 'node16'],
            tsconfig: resolve(packagesDir, 'sdk/tsconfig.json'),
            bundle: true,
            outDir: resolve(rootDistDir, 'sdk/dist'),
            format: ['cjs', 'esm'],
            silent: true,
            clean: true,
            entry: [resolve(packagesDir, 'sdk/src/index.ts')],
            dts: true,
            banner: {
                js: TITLE
            }
        });

        log.success(
            `${' '.repeat('🐻‍❄️✨'.length - 1)} ${gray('packages/sdk/src/*.ts     ~> dist/sdk/dist/*.js')} [${gray(
                `${Date.now() - now}ms`
            )}]`
        );

        log.success(
            `${' '.repeat('🐻‍❄️✨'.length - 1)} ${gray(`took ${Date.now() - created}ms to build`)} ${bold(
                '@ncharts/sdk'
            )}`
        );
    }
});
