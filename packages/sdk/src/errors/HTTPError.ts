/*
 * 🐻‍❄️📦 @ncharts/sdk: SDK bindings and typings for charted-server
 * Copyright 2023 Noelware, LLC. <team@noelware.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { hasOwnProperty, isObject } from '@noelware/utils';
import { STATUS_CODES } from 'http';
import { ApiError } from '@ncharts/types';

const isFatalError = (value: unknown) => isObject<Record<string, unknown>>(value) && hasOwnProperty(value, 'class');

/**
 * {@link Error} that represents an HTTP error.
 */
export class HTTPError extends Error {
    constructor(public readonly statusCode: number, errors: ApiError<unknown>[] = []) {
        super(
            `Received status code ${statusCode} (${
                STATUS_CODES[statusCode] || 'Unknown'
            }) with errors\n${HTTPError._formatErrors(errors)}`.trim()
        );
    }

    private static _formatErrors(errors: ApiError<unknown>[]) {
        let buf = '';
        for (let i = 0; i < errors.length; i++) {
            const error = errors[i];
            if (isFatalError(error)) {
                const details = error.detail as Record<string, unknown>;
                console.log(details);
            }

            buf += `[${error.code}]: ${error.message}${
                error.detail !== undefined
                    ? `\n${
                          error.detail !== null && isObject(error.detail)
                              ? JSON.stringify(error.detail)
                              : String(error.detail)
                      }`
                    : ''
            }\n`;
        }

        return buf.trim();
    }
}
