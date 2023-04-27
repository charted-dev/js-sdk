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

import { npmPublish } from '@jsdevtools/npm-publish';
import { readFile } from 'fs/promises';
import { Signale } from 'signale';
import { resolve } from 'path';
import { bold } from 'colorette';
import run from './util/run';

const log = new Signale({
    scope: 'charted:sdk:publish',
    config: {
        displayBadge: true,
        displayScope: true,
        displayTimestamp: true,
        displayDate: true
    }
});

run(log, async () => {
    const version = await readFile(resolve(process.cwd(), '.sdk-version'), 'utf-8');
    log.info(`🐻‍❄️✨ Publishing ${bold(`@ncharts/types@${version}`)}...`);

    const authToken = process.env.NPM_AUTH_TOKEN;
    if (!authToken) {
        log.fatal(`Missing ${bold(`\`NPM_AUTH_TOKEN\``)} environment variable.`);
        process.exit(1);
    }

    const resultsForTypes = await npmPublish({
        package: resolve(process.cwd(), 'dist/types/package.json'),
        access: 'public',
        token: authToken
    });

    log.info(
        `🐻‍❄️✨ Published ${
            resultsForTypes.oldVersion !== undefined ? `${bold(`@ncharts/types@${resultsForTypes.oldVersion}`)} ~>` : ''
        } ${bold(`@ncharts/types@${version}`)}`.trim()
    );

    // wait for NPM to propagate @ncharts/types
    await new Promise((resolve) => setTimeout(resolve, 3500)); // 3.5 seconds

    log.info(`🐻‍❄️✨ Publishing ${bold(`@ncharts/sdk@${version}`)}...`);
    const resultsForSdk = await npmPublish({
        package: resolve(process.cwd(), 'dist/sdk/package.json'),
        access: 'public',
        token: authToken
    });

    log.info(
        `🐻‍❄️✨ Published ${
            resultsForSdk.oldVersion !== undefined ? `${bold(`@ncharts/sdk@${resultsForSdk.oldVersion}`)} ~>` : ''
        } ${bold(`@ncharts/sdk@${version}`)}`.trim()
    );
});
