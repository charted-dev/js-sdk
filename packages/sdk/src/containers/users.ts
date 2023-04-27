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

import type { ApiResponse, NameOrSnowflake, payloads, responses } from '@ncharts/types';
import { RepositoryContainer } from './repositories';
import type { RequestOptions } from '.';
import { transformJSON } from '../internal';
import type { Client } from '../client';

export class UserContainer {
    #idOrName: NameOrSnowflake;
    #client: Client;

    constructor(client: Client, idOrName: NameOrSnowflake) {
        this.#idOrName = idOrName;
        this.#client = client;
    }

    /**
     * Retrives this user's resource.
     * @param options Request options to override in this request
     * @returns Promise of the user itself.
     */
    get(options?: RequestOptions<'/users/{idOrName}', 'get'>): Promise<ApiResponse<responses.users.Single>> {
        return new Promise((resolve, reject) =>
            this.#client
                .get('/users/{idOrName}', {
                    contentType: 'application/json',
                    pathParameters: {
                        idOrName: this.#idOrName
                    },

                    ...(options ?? {})
                })
                .then((resp) => transformJSON<ApiResponse<responses.users.Single>>(resp).then(resolve).catch(reject))
                .catch(reject)
        );
    }

    /**
     * Patch this user's metadata with the `PATCH /users` REST controller. This is not allowed
     * when you use a different user that isn't `@me` or the authentication resource is not
     * your account.
     *
     * @param body The body payload
     * @param options Request options
     * @returns API response as a Promise.
     */
    patch(
        body: payloads.users.PatchUserPayload,
        options?: RequestOptions<'/users', 'patch', typeof body>
    ): Promise<ApiResponse<responses.users.Patch>> {
        return new Promise((resolve, reject) =>
            this.#client
                .patch('/users', {
                    contentType: 'application/json',
                    body,

                    ...(options ?? {})
                })
                .then((resp) => transformJSON<ApiResponse<responses.users.Patch>>(resp).then(resolve).catch(reject))
                .catch(reject)
        );
    }

    /**
     * Delete this user's resource. This is not allowed when you use a different user
     * that isn't you, it will always be rejected.
     *
     * @param options Request options
     * @returns API response as a {@link Promise Promise}.
     */
    delete(options?: RequestOptions<'/users', 'delete'>): Promise<ApiResponse<responses.users.Delete>> {
        return new Promise((resolve, reject) =>
            this.#client
                .delete('/users', {
                    contentType: 'application/json',
                    ...(options ?? {})
                })
                .then((resp) => transformJSON<ApiResponse<responses.users.Delete>>(resp).then(resolve).catch(reject))
        );
    }

    /**
     * Returns the {@link RepositoryContainer} to do operations on
     * this user's repositories.
     */
    get repositories() {
        return new RepositoryContainer(this.#client, this.#idOrName, 'user');
    }
}
