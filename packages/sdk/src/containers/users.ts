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

import { ApiResponse, NameOrSnowflake, User } from '@ncharts/types';
import type { Client, RequestOptions } from '../client';
import { transformJSON } from 'src/internal';

export class UserContainer {
    #idOrName: NameOrSnowflake;
    #client: Client;

    constructor(client: Client, idOrName: NameOrSnowflake) {
        this.#idOrName = idOrName;
        this.#client = client;
    }

    get(
        options?: Omit<
            RequestOptions<'/users/{idOrName}', 'get'>,
            'pathParameters' | 'queryParameters' | 'contentType' | 'body'
        >
    ) {
        return new Promise<ApiResponse<User>>((resolve, reject) =>
            this.#client
                .get('/users/{idOrName}', {
                    contentType: 'application/json',
                    pathParameters: {
                        idOrName: this.#idOrName
                    },

                    ...(options ?? {})
                })
                .then((resp) => transformJSON<ApiResponse<User>>(resp).then(resolve).catch(reject))
                .catch(reject)
        );
    }
}
