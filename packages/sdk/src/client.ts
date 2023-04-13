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

import type { APIVersion, NameOrSnowflake, PathParamMap, QueryParamMap, Route } from '@ncharts/types';
import { DEFAULT_API_VERSION, DEFAULT_BASE_URL } from './constants';
import type { AbstractAuthStrategy } from './auth';
import { hasOwnProperty, isObject } from '@noelware/utils';
import { HTTPError } from './errors/HTTPError';
import defu from 'defu';
import { UserContainer } from './containers/users';

export type HTTPMethod = 'get' | 'put' | 'head' | 'post' | 'patch' | 'delete';
export const Methods: readonly HTTPMethod[] = ['get', 'put', 'head', 'post', 'patch', 'delete'] as const;

export type Fetch = (input: RequestInit | URL, init?: RequestInit) => Promise<Response>;

/**
 * Options for the {@link Client} constructor.
 */
export interface ClientOptions {
    /**
     * API version to use, this doesn't guarantee complete type-safety
     * if set to `'latest'`, properties can be removed or added.
     *
     * @default 1
     */
    apiVersion?: APIVersion | 'latest';

    /**
     * Base URL to send requests to
     *
     * @default 'https://charts.noelware.org/api'
     */
    baseURL?: string;

    /**
     * Any additional headers to append to every request
     * @default {}
     */
    headers?: Record<string, string>;

    /**
     * {@link Fetch `fetch`} implementation to use when sending requests. This will opt into the global's
     * `fetch` method (if in the browser or Node.js 18+) or it will throw an error.
     *
     * To avoid the error in Node.js, you can use the `node-fetch` package if you can't upgrade to Node.js
     * 18 or higher. If you're using ^16.15.0 ~ ^17.5.0 of Node.js, you can pass in the `--experimental-fetch`
     * flag in your Node options.
     */
    fetch?: Fetch;

    /**
     * Authentication strategy for privileged routes.
     */
    auth?: AbstractAuthStrategy;
}

export interface RequestOptions<R extends Route, Method extends HTTPMethod, Body = unknown> {
    /**
     * Query parameters, if needed.
     */
    queryParameters?: R extends keyof QueryParamMap ? QueryParamMap[R] : never;

    /**
     * The path parameters to use when creating the full route URL.
     */
    pathParameters?: R extends keyof PathParamMap ? PathParamMap[R] : never;

    /**
     * Options for the `fetch` function, for extra granularity.
     */
    fetchOptions?: Omit<RequestInit, 'body' | 'headers' | 'method' | 'window'>;

    /**
     * The determined `Content-Type` value to use
     */
    contentType?: string;

    /**
     * Any additional headers to append to this request
     * @default {}
     */
    headers?: Record<string, string>;

    /**
     * Timeout (in milliseconds) to abort the request if it is taking
     * too long.
     */
    timeout?: number;

    /**
     * The abort signal to use.
     */
    signal?: AbortSignal;

    /**
     * The body to attach
     */
    body?: Method extends 'get' | 'head' ? never : Body;
}

const kClientOptions = {
    apiVersion: DEFAULT_API_VERSION,
    baseURL: DEFAULT_BASE_URL,
    headers: {}
} satisfies ClientOptions;

export class Client {
    #authStrategy: AbstractAuthStrategy | undefined;
    #apiVersion: APIVersion | 'latest';
    #baseURL: string;
    #headers: Record<string, string>;
    #fetch: Fetch;

    delete!: <Body, R extends Route>(endpoint: R, options?: RequestOptions<R, 'delete', Body>) => Promise<Response>;
    patch!: <Body, R extends Route>(endpoint: R, options?: RequestOptions<R, 'patch', Body>) => Promise<Response>;
    post!: <Body, R extends Route>(endpoint: R, options?: RequestOptions<R, 'post', Body>) => Promise<Response>;
    head!: <Body, R extends Route>(endpoint: R, options?: RequestOptions<R, 'head', Body>) => Promise<Response>;
    put!: <Body, R extends Route>(endpoint: R, options?: RequestOptions<R, 'put', Body>) => Promise<Response>;
    get!: <Body, R extends Route>(endpoint: R, options?: RequestOptions<R, 'get', Body>) => Promise<Response>;

    ['@me']!: UserContainer;
    users!: (idOrName: NameOrSnowflake) => UserContainer;

    constructor(options: ClientOptions = kClientOptions) {
        this.#authStrategy = options.auth;
        this.#apiVersion = options.apiVersion || 1;
        this.#baseURL = options.baseURL || DEFAULT_BASE_URL;
        this.#headers = options.headers || {};

        if (global.fetch === undefined || options.fetch === undefined) {
            const [major, minor] = process.version.split('.').map(Number);
            if ((major < 16 && minor < 15) || (major === 17 && minor < 5)) {
                throw new Error(
                    `@ncharts/sdk requires a fetch implementation. Use the \`--experimental-fetch\` flag or upgrade to the latest Node.js version`
                );
            }

            throw new Error(
                `@ncharts/sdk requires a fetch implementation. Upgrade to the latest Node.js version, pass in \`--experimental-fetch\`, or pass in a fetch-compatible module in the option's \`fetch\`.`
            );
        }

        // @ts-ignore
        this.#fetch = global.fetch || options.fetch;
    }

    // @ts-ignore
    async request<Body = unknown, R extends Route, Method extends HTTPMethod>(
        endpoint: R,
        method: Method,
        options?: RequestOptions<R, Method, Body>
    ): Promise<Response> {
        if (!Methods.includes(method)) throw new Error(`Unknown method: ${method}`);

        const url = this._buildUrl(endpoint, options);
        const headers: Record<string, string> = defu({}, options?.headers ?? {}, this.#headers);
        let body: BodyInit | null = null;

        if (options !== undefined && hasOwnProperty(options, 'contentType')) {
            if (hasOwnProperty(options, 'contentType')) {
                if (
                    !Object.keys(headers)
                        .map((s) => s.toLowerCase())
                        .includes('content-type')
                ) {
                    headers['content-type'] = options.contentType!;
                }
            }

            // TODO: add more edge cases
            if (hasOwnProperty(options, 'body')) {
                if (isObject(options.body)) {
                    if (
                        !Object.keys(headers)
                            .map((s) => s.toLowerCase())
                            .includes('content-type')
                    ) {
                        headers['content-type'] = 'application/json; charset=utf-8';
                    }

                    body = JSON.stringify(options.body);
                }
            }
        }

        if (this.#authStrategy !== undefined) {
            headers['authorization'] = `${this.#authStrategy.prefix} ${this.#authStrategy.value}`;
        }

        const fetchOptions: RequestInit = {
            method: method.toUpperCase(),
            signal: options?.signal,
            headers
        };

        if (body !== null) fetchOptions.body = body;
        return this.#fetch(new URL(url), fetchOptions);
    }

    async heartbeat(options?: RequestOptions<'/heartbeat', 'head'>) {
        return new Promise<void>((resolve, reject) =>
            this.request('/heartbeat', 'head', options)
                .then((resp) => {
                    if (!resp.ok) throw new HTTPError(resp.status);
                    return resp.text();
                })
                .then((text) => {
                    if (text !== 'Ok.') return reject(new Error(`Expected: [Ok.] | Received: ${text}`));
                    return resolve();
                })
                .catch(reject)
        );
    }

    private _buildUrl<R extends Route>(url: R, options?: RequestOptions<R, HTTPMethod>) {
        let formedUrl = this.#baseURL;
        if (this.#apiVersion !== 'latest') {
            formedUrl += `/v${this.#apiVersion}`;
        }

        formedUrl += url;

        if (url.match(/([\w\.]+)}/g) && options !== undefined && hasOwnProperty(options, 'pathParameters')) {
            const params = options.pathParameters as Record<string, unknown>;
            formedUrl = formedUrl.replaceAll(/([\w\.]+)}/g, (_, key) => {
                if (hasOwnProperty(params, key)) {
                    return String(params[key]);
                }

                // We couldn't identify it, so we will have to use it.
                return `{${key}}`;
            });
        }

        if (options !== undefined && hasOwnProperty(options, 'queryParameters')) {
            const params = options.queryParameters as Record<string, unknown>;
            let prefix = '?';

            for (const [key, value] of Object.entries(params)) {
                if (prefix === '?') {
                    formedUrl += `?${key}=${encodeURIComponent(value as any)}`;
                    prefix = '&';

                    continue;
                }

                formedUrl += `${prefix}${key}=${encodeURIComponent(value as any)}`;
            }
        }

        return formedUrl;
    }
}

for (const method of Methods) {
    Client.prototype[method] = function (
        this: Client,
        endpoint: string,
        options?: RequestOptions<Route, typeof method, unknown>
    ) {
        return this.request.apply(this, [endpoint as any, method, options]);
    };
}
