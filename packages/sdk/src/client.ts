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

import type { APIVersion, PathParamMap, QueryParamMap, Route } from '@ncharts/types';
import { DEFAULT_API_VERSION, DEFAULT_BASE_URL } from './constants';
import type { AbstractAuthStrategy } from './auth';
import type { UndiciOptions } from '@aero/http';
import { hasOwnProperty } from '@noelware/utils';

export type HTTPMethod = 'get' | 'put' | 'head' | 'post' | 'patch' | 'delete';
export const Methods: readonly HTTPMethod[] = ['get', 'put', 'head', 'post', 'patch', 'delete'] as const;

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
     * Authentication strategy for privileged routes.
     */
    auth?: AbstractAuthStrategy;
}

export interface RequestOptions<R extends Route, Method extends HTTPMethod, Body = unknown> {
    /**
     * Query parameters, if needed.
     */
    queryParameters?: QueryParamMap[R];

    /**
     * The path parameters to use when creating the full route URL.
     */
    pathParameters?: PathParamMap[R];

    /**
     * Extra options for `undici`.
     */
    undiciOptions?: UndiciOptions;

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

    delete!: <Body, R extends Route>(endpoint: R, options?: RequestOptions<R, 'delete', Body>) => any;
    patch!: <Body, R extends Route>(endpoint: R, options?: RequestOptions<R, 'patch', Body>) => any;
    post!: <Body, R extends Route>(endpoint: R, options?: RequestOptions<R, 'post', Body>) => any;
    head!: <Body, R extends Route>(endpoint: R, options?: RequestOptions<R, 'head', Body>) => any;
    put!: <Body, R extends Route>(endpoint: R, options?: RequestOptions<R, 'put', Body>) => any;
    get!: <Body, R extends Route>(endpoint: R, options?: RequestOptions<R, 'get', Body>) => any;

    constructor(options: ClientOptions = kClientOptions) {
        this.#authStrategy = options.auth;
        this.#apiVersion = options.apiVersion || 1;
        this.#baseURL = options.baseURL || DEFAULT_BASE_URL;
        this.#headers = options.headers || {};
    }

    async request<Body, R extends Route, Method extends HTTPMethod>(
        endpoint: R,
        method: Method,
        options?: RequestOptions<R, Method, Body>
    ) {
        const url = this._buildUrl(endpoint, options);
    }

    async heartbeat(options?: RequestOptions<'/heartbeat', 'head'>) {
        return this.request('/heartbeat', 'head', options);
    }

    async openapi(options?: RequestOptions<'/_openapi', 'get'>) {
        return this.request('/_openapi', 'get', options);
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
