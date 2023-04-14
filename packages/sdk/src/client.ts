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

import {
    APIVersion,
    ApiResponse,
    NameOrSnowflake,
    PathParamMap,
    QueryParamMap,
    Route,
    responses
} from '@ncharts/types';
import { DEFAULT_API_VERSION, DEFAULT_BASE_URL } from './constants';
import type { AbstractAuthStrategy } from './auth';
import { hasOwnProperty, isBrowser, isObject } from '@noelware/utils';
import { UserContainer } from './containers/users';
import { HTTPError } from './errors/HTTPError';
import assert from 'assert';
import defu from 'defu';
import { transformJSON, transformYaml } from './internal';

export type HTTPMethod = 'get' | 'put' | 'head' | 'post' | 'patch' | 'delete';
export const Methods: readonly HTTPMethod[] = ['get', 'put', 'head', 'post', 'patch', 'delete'] as const;

export type Fetch = (input: RequestInit | URL, init?: RequestInit) => Promise<Response>;

// @ts-ignore
const containers: Readonly<[[string, new (client: Client, ...args: any[]) => any]]> = [
    ['users', UserContainer],
    ['@me', UserContainer]
];

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

        for (const method of Methods) {
            this[method] = function (
                this: Client,
                endpoint: string,
                options?: RequestOptions<Route, typeof method, unknown>
            ) {
                return this.request.apply(this, [endpoint as any, method, options]);
            };
        }

        for (const [key, cls] of containers) {
            this[key] = function (this: Client, ...args: any[]) {
                return new cls(this, ...args);
            };
        }
    }

    // @ts-ignore
    async request<Body = unknown, R extends Route, Method extends HTTPMethod>(
        endpoint: R,
        method: Method,
        options?: RequestOptions<R, Method, Body>
    ): Promise<Response> {
        assert(typeof endpoint === 'string', `endpoint expected to be [string], received: ${typeof endpoint}`);
        assert(Methods.includes(method), `method [${method}] was not [${Methods.join(', ')}]`);

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
            headers.Authorization = `${this.#authStrategy.prefix} ${this.#authStrategy.value}`;
        }

        const fetchOptions: RequestInit = {
            method: method.toUpperCase(),
            signal: options?.signal,
            headers
        };

        if (body !== null) fetchOptions.body = body;
        return this.#fetch(new URL(url), fetchOptions);
    }

    /**
     * Returns an {@link Buffer} on Node.js, or a {@link ArrayBuffer} in the browser of a CDN object
     * if the feature is enabled. The prefix is required since it is dynamic (can be configured with
     * the [`config.cdn.prefix`](https://charts.noelware.org/docs/server/current/self-hosting/configuration#cdn.prefix)
     * configuration key).
     *
     * @param prefix CDN prefix to use. Will default to `/cdn`, if `...paths` was not specified.
     * @param paths The extra paths to append (i.e, `cdn('/cdn', 'avatars', <uid>, '1234', 'hash.png')` -> `/cdn/avatars/<uid>/1234/hash.png`)
     * @returns An {@link Buffer} on Node.js, or a {@link ArrayBuffer} in the browser of a CDN object
     * if the feature is enabled.
     */
    cdn(prefix: string = '/cdn', ...paths: string[]) {
        let path = '';
        if (!paths.length) path = '/';
        else {
            for (let i = 0; i < paths.length; i++) {
                path += `/${paths[i]}`;
            }
        }

        return new Promise<responses.main.CDN>((resolve, reject) =>
            this.get(`/${prefix}${path}` as unknown as Route)
                .then(async (resp) => {
                    if (!resp.ok) {
                        if (resp.status === 404) {
                            return reject(new Error("Server doesn't have the CDN feature enabled"));
                        }

                        return reject(new HTTPError(resp.status));
                    }

                    const buf = await resp.arrayBuffer();
                    if (isBrowser) return resolve(buf);

                    const buffer = Buffer.alloc(buf.byteLength);
                    for (let i = 0; i < buffer.length; i++) {
                        buffer[i] = buf[i];
                    }

                    return resolve(buf);
                })
                .catch(reject)
        );
    }

    /**
     * Generic main entrypoint.
     * @param options Request options
     * @return API response of the {@link responses.main.Main} object.
     */
    main(
        options?: Omit<
            RequestOptions<'/features', 'get'>,
            'pathParameters' | 'queryParameters' | 'body' | 'contentType'
        >
    ) {
        return new Promise<ApiResponse<responses.main.Main>>((resolve, reject) =>
            this.get('/', { contentType: 'application/json', ...(options ?? {}) }).then((resp) =>
                transformJSON<ApiResponse<responses.main.Main>>(resp).then(resolve).catch(reject)
            )
        );
    }

    /**
     * Returns minimal information about this current instance.
     * @param options Request options
     * @return API response of the {@link responses.main.Info} object.
     */
    info(
        options?: Omit<
            RequestOptions<'/features', 'get'>,
            'pathParameters' | 'queryParameters' | 'body' | 'contentType'
        >
    ) {
        return new Promise<ApiResponse<responses.main.Info>>((resolve, reject) =>
            this.get('/info', { contentType: 'application/json', ...(options ?? {}) }).then((resp) =>
                transformJSON<ApiResponse<responses.main.Info>>(resp).then(resolve).catch(reject)
            )
        );
    }

    /**
     * Returns the Prometheus metrics, if enabled.
     *
     * @param options Request options
     * @returns The string representation of the Prometheus metrics, if it is enabled,
     * or an API response object (usually a 404 if it is not enabled).
     */
    metrics(
        options?: Omit<
            RequestOptions<'/features', 'get'>,
            'pathParameters' | 'queryParameters' | 'body' | 'contentType'
        >
    ) {
        return new Promise<ApiResponse | string>((resolve, reject) =>
            this.get('/metrics' as unknown as Route, options).then((resp) =>
                !resp.ok && resp.headers.get('content-type')?.includes('application/json')
                    ? transformJSON<ApiResponse>(resp).then(resolve).catch(reject)
                    : resp.text().then(resolve).catch(reject)
            )
        );
    }

    /**
     * Gets all the server features.
     *
     * @param options Request options
     * @returns An API response of the {@link responses.main.Features} object.
     */
    features(
        options?: Omit<
            RequestOptions<'/features', 'get'>,
            'pathParameters' | 'queryParameters' | 'body' | 'contentType'
        >
    ) {
        return new Promise<ApiResponse<responses.main.Features>>((resolve, reject) =>
            this.get('/features', { contentType: 'application/json', ...(options ?? {}) }).then((resp) =>
                transformJSON<ApiResponse<responses.main.Features>>(resp).then(resolve).catch(reject)
            )
        );
    }

    /**
     * Sends a heartbeat to the server, this is usually for checking
     * if the server is alive or not.
     *
     * @param options Request options
     * @returns Nothing if the heartbeat was a success, or an error if the
     * data was not `Ok.` or if the request failed.
     * @example
     * client.heartbeat()
     *  .then(() => console.log('heartbeat was ok!'))
     *  .catch(console.error);
     */
    heartbeat(options?: RequestOptions<'/heartbeat', 'head'>) {
        return new Promise<void>((resolve, reject) =>
            this.head('/heartbeat', options)
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

    // indexMappings(id: string) {
    //     return new Promise<responses.main.IndexMappings>((resolve, reject) =>
    //         this.get('/indexes/{idOrName}', { contentType: 'application/json', pathParameters: {} }).then((resp) =>
    //             transformYaml<responses.main.IndexMappings>(resp).then(resolve).catch(reject)
    //         )
    //     );
    // }

    private _buildUrl<R extends Route>(url: R, options?: RequestOptions<R, HTTPMethod>) {
        let formedUrl = this.#baseURL;
        if (this.#apiVersion !== 'latest') {
            formedUrl += `/v${this.#apiVersion}`;
        }

        formedUrl += url;

        if (url.match(/{([\w\.]+)}/g) && options !== undefined && hasOwnProperty(options, 'pathParameters')) {
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
