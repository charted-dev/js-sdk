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

import type { HTTPMethod, RequestOptions as RequestOptions_ } from '../client';
import type { Route } from '@ncharts/types';

/**
 * Generic type-alias for the {@link RequestOptions_ RequestOptions} for all container
 * methods.
 */
export type RequestOptions<R extends Route, M extends HTTPMethod, Body = unknown> = Omit<
    RequestOptions_<R, M, Body>,
    'pathParameters' | 'queryParameters' | 'contentType' | 'body'
>;
