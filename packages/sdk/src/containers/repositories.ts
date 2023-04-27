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

import type { NameOrSnowflake, ApiResponse, responses, payloads } from '@ncharts/types';
import type { RequestOptions } from '.';
import { transformJSON } from '../internal';
import { Client } from '../client';

export class RepositoryContainer {
    constructor(
        private readonly client: Client,
        private readonly owner: NameOrSnowflake,
        private readonly type: 'user' | 'organization'
    ) {}

    /**
     * Retrives a list of all the repositories available
     */
    all(
        options?: RequestOptions<'/users/{idOrName}/repositories', 'get', unknown>
    ): Promise<ApiResponse<responses.repositories.All>> {
        return new Promise((resolve, reject) =>
            this.client
                .get(
                    this.type === 'organization'
                        ? '/organizations/{idOrName}/repositories'
                        : '/users/{idOrName}/repositories',
                    {
                        contentType: 'application/json',
                        pathParameters: {
                            idOrName: this.owner
                        },

                        ...(options ?? {})
                    }
                )
                .then((resp) =>
                    transformJSON<ApiResponse<responses.repositories.All>>(resp).then(resolve).catch(reject)
                )
                .catch(reject)
        );
    }

    get(
        idOrName: NameOrSnowflake,
        options?: RequestOptions<'/users/{idOrName}/repositories/{repoIdOrName}', 'get', unknown>
    ): Promise<ApiResponse<responses.repositories.Single>> {
        return new Promise((resolve, reject) =>
            this.client
                .get(
                    this.type === 'organization'
                        ? '/organizations/{idOrName}/repositories/{repoIdOrName}'
                        : '/users/{idOrName}/repositories/{repoIdOrName}',
                    {
                        contentType: 'application/json',
                        pathParameters: {
                            idOrName: this.owner,
                            repoIdOrName: idOrName
                        },

                        ...(options ?? {})
                    }
                )
                .then((resp) =>
                    transformJSON<ApiResponse<responses.repositories.Single>>(resp).then(resolve).catch(reject)
                )
                .catch(reject)
        );
    }

    create(
        payload: payloads.repositories.CreateRepositoryPayload,
        options?: RequestOptions<'/users/{idOrName}/repositories', 'put', unknown>
    ): Promise<ApiResponse<responses.repositories.Create>> {
        return new Promise((resolve, reject) =>
            this.client
                .put(
                    this.type === 'organization'
                        ? '/organizations/{idOrName}/repositories'
                        : '/users/{idOrName}/repositories',
                    {
                        contentType: 'application/json',
                        body: payload,
                        pathParameters: {
                            idOrName: this.owner
                        },

                        ...(options ?? {})
                    }
                )
                .then((resp) =>
                    transformJSON<ApiResponse<responses.repositories.Single>>(resp).then(resolve).catch(reject)
                )
                .catch(reject)
        );
    }
}
