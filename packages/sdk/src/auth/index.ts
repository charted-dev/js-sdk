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

/**
 * Represents an abstraction for providing authentication via the `Authorization` header.
 */
export abstract class AbstractAuthStrategy {
    /** The prefix to use when creating the `Authorization` header. */
    abstract prefix: string;

    /** The raw value to use when creating the `Authorization` header. */
    abstract value: string;

    toString() {
        return `${this.prefix} ${'*'.repeat(this.value.length)}`;
    }
}

class Basic extends AbstractAuthStrategy {
    prefix: string;
    value: string;

    constructor(username: string, password: string) {
        super();

        this.prefix = 'Basic';
        this.value = Buffer.from(`${username}:${password}`).toString('base64');
    }
}

class APIKey extends AbstractAuthStrategy {
    prefix: string;

    constructor(public value: string) {
        super();

        this.prefix = 'ApiKey';
    }
}

class SessionToken extends AbstractAuthStrategy {
    prefix: string;
    value: string;

    constructor(accessToken: string, public refreshToken?: string) {
        super();

        this.prefix = 'ApiKey';
        this.value = accessToken;
    }
}

export const AuthStrategy = {
    SessionToken,
    APIKey,
    Basic
} as const;
