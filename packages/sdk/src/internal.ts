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

import { hasOwnProperty, tryRequire } from '@noelware/utils';
import { HTTPError } from './errors/HTTPError';

interface YAML {
    load(text: string, ...args: any[]): unknown;
}

export const transformJSON = async <T>(resp: Response) => {
    if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new HTTPError(resp.status, hasOwnProperty(data, 'errors') ? data.errors : []);
    }

    if (!resp.headers.get('content-type')?.includes('application/json')) {
        throw new Error(`Expecting [application/json], received [${resp.headers.get('content-type')}] from server`);
    }

    return resp.json() as T;
};

export const transformYaml = async <T>(resp: Response): Promise<T | string> => {
    const contentType = resp.headers.get('content-type');
    if (!contentType) throw new Error('Expecting content type [text/yaml], received none.');
    if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new HTTPError(resp.status, hasOwnProperty(data, 'errors') ? data.errors : []);
    }

    // check if we have `js-yaml`
    let yaml: YAML | null = null;
    try {
        yaml = tryRequire('js-yaml');
    } catch {
        // don't do anything
    }

    return yaml === null ? resp.text() : ((yaml as YAML).load(await resp.text()) as T);
};
