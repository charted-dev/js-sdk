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

if (require.main === module) {
    process.emitWarning('Do not import this module into code', {
        code: 'NLW_NOT_IMPORTABLE',
        detail: [
            'Importing @ncharts/types into your application is *not* recommended',
            'Please use `import type {} from "@ncharts/types"` to remove this warning'
        ].join('\n')
    });
}
