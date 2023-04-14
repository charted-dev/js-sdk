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

import * as generated from './generated';

/**
 * Generated SDK typings for `@ncharts/sdk`.
 *
 * - Server Version: {{SERVER_VERSION}}
 * - Generated At:   {{GENERATED_AT}}
 */
declare namespace types {
    /**
     * All of the available registered paths.
     */
    export type Route = keyof generated.paths;
    type _QueryParamMap<R extends Route> = generated.paths[R] extends { [k: string]: { parameters: infer P } }
        ? P extends { query: infer Q }
            ? { [K in keyof Q]: Q[K] }
            : never
        : never;

    type _PathParamMap<R extends Route> = generated.paths[R] extends { [k: string]: { parameters: infer P } }
        ? P extends { path: infer PP }
            ? { [K in keyof PP]: PP[K] }
            : never
        : never;

    type _OmitIfNeeded<T, U> = {
        [K in keyof T as T[K] extends U ? never : K]: T[K];
    };

    /**
     * Mapping of all the query parameters for each {@link Route}. It omits any route
     * that doesn't have query parameters.
     */
    export type QueryParamMap = _OmitIfNeeded<
        {
            [K in Route]: _QueryParamMap<K>;
        },
        _QueryParamMap<Route>
    >;

    /**
     * Mapping of all the path parameters for each {@link Route}. Omits any route
     * that doesn't include path parameters.
     */
    export type PathParamMap = _OmitIfNeeded<
        {
            [K in Route]: _PathParamMap<K>;
        },
        _PathParamMap<Route>
    >;

    /**
     * Version number of all the available API versions.
     */
    export type APIVersion = 1;

    /**
     * Prefix for all the {@link APIVersion api versions}.
     */
    export type APIVersionPrefix = `/v${APIVersion}`;

    /**
     * Represents an API error that might occur in a REST handler. It contains the {@link code}
     * and {@link message} elements to give a better understanding on what happened. You can read up
     * on all the codes here: https://charts.noelware.org/docs/server/current/api/reference#error-codes.
     */
    export interface ApiError<D = never> {
        /** The error code that broaden what happened */
        code: string;

        /** Human-readable message of the {@link ApiError.code code} element. */
        message: string;

        /** Extra detail to give more context on what happened. */
        detail?: D;
    }

    /**
     * Represents a generic API response object.
     *
     * - `success`: If the request was successful or not
     *
     * ## Ok<T>
     * Represents a successful response, with any data attached if any.
     *
     * - `data`: The data that was returned to us.
     *
     * ## Err
     * Represents an unsuccessful response, with any errors that might've occurred during
     * an request invocation.
     *
     * - `errors`: A list of API errors that might've occurred when invoking the request.
     */
    export type ApiResponse<T = Unit> =
        | { success: true; data: T }
        | {
              success: false;
              errors: ApiError[];
          };

    /**
     * Represents a resource to securely use the API server without
     * exposing your user credentials. This is one of the most recommended
     * ways to consume the SDK and the API itself.
     *
     * - `description`: The description of the API key.
     * - `expires_in`:  DateTime of when the API key has expired, if it is passed this date, then it is expired.
     * - `token`:       The token, this is only shown when you create an API key and can never be fetched again due to
     * security reasons.
     *
     * - `scopes`:      Bitfield of all the available scopes this API key has.
     * - `owner`:       {@link User} resource that owns this API key
     * - `name`:        API key name.
     * - `id`:          Snowflake ID to identify itself.
     */
    export type ApiKeys = Schema<'ApiKeys'>;

    /**
     * In Helm, one chart may depend on any number of other charts. These dependencies can be dynamically linked using the dependencies'
     * field in Chart.yaml or brought in to the charts/ directory and managed manually. The charts required by the current chart are defined as a
     * list in the dependencies field.
     *
     * - `name`: The name of the chart
     * - `version`: The version of the chart.
     * - `repository`: The repository URL or alias
     * - `condition`: YAML path that resolves to a Boolean, used for enabling/disabling charts.
     * - `tags`: Tags can be used to group charts for enabling/disabling together
     * - `import-values`: ImportValues holds the mapping of source values to parent key to be imported. Each item can be a string or pair of child/parent sublist items.
     * - `alias`: Alias to be used for the chart. Useful when you have to add the same chart multiple times
     */
    export type ChartDependency = Schema<'ChartDependency'>;

    /**
     * Represents a Chart file index from the `index.yaml` file when installing
     * from the Helm CLI.
     *
     * - `name`: The name of the chart
     * - `home`: The URL to a relevant project page, git repo, or contact person
     * - `sources`: List of source URLs to the source code of this chart
     * - `version`: A SemVer 2 conformant version string of the chart. Required.
     * - `description`: A one-sentence description of the chart
     * - `keywords`: A list of string keywords
     * - `maintainers`: A list of name and URL/email address combinations for the maintainer(s)
     * - `icon`: The URL to an icon file.
     * - `apiVersion`: The API Version of this chart.
     * - `tags`: The tags to check to enable chart
     * - `appVersion`: The version of the application enclosed inside of this chart.
     * - `deprecated`: Whether or not this chart is deprecated
     * - `annotations`: Annotations are additional mappings uninterpreted by Helm, made available for inspection by other applications.
     * - `kubeVersion`: a SemVer constraint specifying the version of Kubernetes required.
     * - `dependencies`: List of dependencies for a chart.
     * - `type`: Specifies the chart type: application or library
     */
    export type ChartIndexSpec = Schema<'ChartIndexSpec'>;

    /**
     * Index file in a chart repository.
     *
     * In charted-server, this is represented by a user or organization, not towards a single
     * repository. All the repositories (and its releases) by the user or organization is made
     * available in this single YAML file.
     *
     * - `apiVersion`: API version of the `index.yaml` file.
     * - `entries`: List of repository entries available
     * - `generated`: Date when this `index.yaml` was last generated at
     */
    export type ChartIndexYaml = Schema<'ChartIndexYaml'>;

    /**
     * Describes a Chart maintainer.
     *
     * - `name`: User name or organization name
     * - `email`: Optional email address to contact the named maintainer
     * - `url`: Optional URL to an address for the named maintainer
     */
    export type ChartMaintainer = Schema<'ChartMaintainer'>;

    /**
     * Represents a Chart file (`chart.yaml`) from a Helm repository.
     *
     * - `name`: The name of the chart
     * - `home`: The URL to a relevant project page, git repo, or contact person
     * - `sources`: List of source URLs to the source code of this chart
     * - `version`: A SemVer 2 conformant version string of the chart. Required.
     * - `description`: A one-sentence description of the chart
     * - `keywords`: A list of string keywords
     * - `maintainers`: A list of name and URL/email address combinations for the maintainer(s)
     * - `icon`: The URL to an icon file.
     * - `apiVersion`: The API Version of this chart.
     * - `tags`: The tags to check to enable chart
     * - `appVersion`: The version of the application enclosed inside of this chart.
     * - `deprecated`: Whether or not this chart is deprecated
     * - `annotations`: Annotations are additional mappings uninterpreted by Helm, made available for inspection by other applications.
     * - `kubeVersion`: a SemVer constraint specifying the version of Kubernetes required.
     * - `dependencies`: List of dependencies for a chart.
     * - `type`: Specifies the chart type: application or library
     */
    export type ChartSpec = Schema<'ChartSpec'>;

    /**
     * Represents the payload for creating a user account with the `PUT /users` REST
     * controller.
     *
     * - `username`: The username to use to identify yourself
     * - `password`: Unique password to authenticate as
     * - `email`: Email for receiving member invitations and other things.
     *
     * ### Errors that might occur
     * - If `email` was not a valid email address.
     * - If `username` was blank or empty
     * - If `username` was over 32 characters
     * - If `username` didn't match the Name regex
     * - If `password` didn't match the Password regex
     */
    export type CreateUserPayload = Schema<'CreateUserPayload'>;

    /**
     * Represents a distribution type that the charted-server instance is running on.
     *
     * - `kubernetes`: If the server is running off the [official Helm chart](https://charts.noelware.org/~/charted/server)
     *   or its own manifest.
     * - `unknown`: If the server is running on an unknown distribution. This is not official.
     * - `docker`: If the server is running off the [official Docker image](https://cr.noelware.cloud/-/charted/server)
     * - `rpm`: If the server is running off the RPM distribution from Noelware's Artifacts Registry
     * - `deb`: If the server is running off the Debian distribution from Noelware's Artifact Registry
     * - `git`: If the server was compiled from source.
     */
    export type Distribution = Schema<'InfoResponse'>['distribution'];

    /**
     * ImportValues holds the mapping of source values to parent key to be imported.
     * Each item can be a string or pair of child/parent sublist items.
     *
     * - `child`: The source key of the values to be imported
     * - `parent`: The destination path in the parent chart's values
     */
    export type ImportValue = Schema<'ImportValue'>;

    /**
     * Type discriminator to identify a user, repository, or organization their `Name`
     * or its snowflake ID. This is used if you wish to provide usernames or their
     * IDs when requesting to the API server.
     */
    export type NameOrSnowflake = string | number;

    /**
     * Represents an organization resource. Organizations are a central part
     * to control Helm repositories apart from the owner of the organization,
     * that is uniquely identified by the web UI and anyone else importing
     * any charts.
     *
     * - `verified_publisher`: Whether if this organization is a verified publisher on this instance
     * - `twitter_handle`:     The organization's Twitter handle
     * - `gravatar_email`:     Email to use when using Gravatar for handling avatars
     * - `display_name`:       Organization's display name (i.e, `Noelware, LLC.`)
     * - `created_at`:         DateTime of when the organization was created
     * - `updated_at`:         DateTime of when the organization was last updated
     * - `icon_hash`:          Unique hash to the organization's avatar.
     * - `owner`:              Owner as a {@link User} resource.
     * - `name`:               Organization's name
     * - `id`:                 Snowflake ID of the organization to identify itself
     */
    export type Organization = Schema<'Organization'>;

    /**
     * A Helm repository that can be used with `helm install`.
     *
     * - `description`: Description about this repository
     * - `deprecated`:  If the repository is deprecated or not
     * - `created_at`:  DateTime of when the repository was created
     * - `updated_at`:  DateTime of when the repository was last updated
     * - `icon_hash`:   Unique hash to the repository's icon.
     * - `owner_id`:    Snowflake ID of the owner. This can be an organization or user.
     * - `private`:     Whether if the repository is private or not
     * - `name`:        Repository name.
     * - `type`:        A {@link RepoType repository type}, to uniquely identify what it is.
     * - `id`:          Snowflake ID of the repository to identify itself
     */
    export type Repository = Schema<'Repository'>;

    /**
     * Represents a single {@link Repository repository} release resource. It is meant
     * to signale users all the available releases.
     *
     * - `update_text`: Markdown text of the changelog.
     * - `created_at`: DateTime of when the repository release was created
     * - `updated_at`: DateTime of when the repository release was last updated
     * - `tag`:        SemVer value of the version that this repository is meant to signale
     * - `id`:         Snowflake ID of the repository release to identify itself
     */
    export type RepositoryRelease = Schema<'RepositoryRelease'>;

    /**
     * Enum of all the valid {@link Repository repository} types.
     */
    export type RepoType = 'application' | 'library' | 'operator';

    /**
     * Represents a session token object. This is how sessions are stored when authenticating
     * to charted-server.
     *
     * - `refresh_token`: The token for refreshing this session to get a new one.
     * The web UI uses this token to refresh your session when it expires. This token only lasts for 1 week,
     * and a new session will need to be created.
     *
     * - `access_token`: The token for accessing the API server as the user. This is dangerous to someone who knows your credentials.
     * - `session_id`:   Unique identifier represented as a `UUID` to identify this session.
     * - `user_id`:      The user (by ID) who owns this session.
     */
    export type Session = Schema<'Session'>;

    /**
     * Enum to represent that it can be a {@link string}, or a {@link ImportValue} type.
     */
    export type StringOrImportValue = Schema<'StringOrImportValue'>;

    /**
     * Represents an account resource that can create and own repositories
     * that is tied to their **account**.
     *
     * - `verified_publisher`: Whether if this user is a verified publisher.
     * - `gravatar_email`:     Email to use when using Gravatar for handling avatars
     * - `description`:        Short paragraph about themselves.
     * - `avatar_hash`:        Unique hash to identify a user's avatar.
     * - `created_at`:         DateTime of when the account was created
     * - `updated_at`:         DateTime of when the account was last updated
     * - `username`:           Unique name that this account identify as.
     * - `admin`:              Whether if this user is an administrator of this instance.
     * - `name`:               A proper name to use, otherwise, applicatons might default to `@{username}`.
     * - `id`:                 Snowflake ID to identify this account.
     */
    export type User = Schema<'User'>;

    /**
     * A "unit" type, that doesn't return anything.
     */
    export type Unit = never;

    /**
     * Namespace for all the API responses
     */
    export namespace responses {
        /**
         * Responses for the non-specified API methods (i.e, `/heartbeat`).
         */
        export namespace main {
            /**
             * Response for the `GET /{cdn.prefix}/...` REST controller. This will return a Node.js
             * Buffer of the CDN contents, if we're in Node.js, or the underlying `ArrayBuffer` if
             * in browser.
             */
            export type CDN = Buffer | ArrayBuffer;

            /**
             * Response for the `GET /` REST controller.
             *
             * - `message`: A cute message, always will be `'Hello, world! 👋'`.
             * - `tagline`: Short tag-line. Always will be `'You know, for Helm charts?'`.
             * - `docs`:    URL to the documentation page for that server version.
             */
            export type Main = Schema<'MainResponse'>;

            /**
             * Response for the `GET /info` REST controller.
             *
             * - `distribution`: Distribution flavour that was used.
             * - `commit_sha`:   Git commit of the API server when it was built.
             * - `build_date`:   RFC3339-formatted date of when the API server was last built
             * - `product`:      Product name, always going to be `'charted-server'`.
             * - `version`:      API server version, it will always be a valid SemVer value.
             * - `vendor`:       Product vendor, always going to be `'Noelware, LLC.'`
             */
            export type Info = Schema<'InfoResponse'>;

            /**
             * Response for the `GET /heartbeat` REST controller.
             */
            export type Heartbeat = 'Ok.';

            /**
             * Response for the `GET /features` REST controller.
             *
             * - `docker_registry`: Whether if the external OCI registry experimental feature or the home-made implementation registry feature is enabled or not.
             * - `registrations`:  Whether if registrations are enabled on the server
             * - `integrations`:   Mapping of all the session integrations available.
             * - `audit_logs`:     Whether if the Audit Logging feature is enabled or not.
             * - `webhooks`:       Whether if this server instance is invite-only.
             * - `search`:         Whether if the server has search capabilities with the Elasticsearch or Meilisearch backend
             */
            export type Features = Schema<'FeaturesResponse'>;

            /**
             * Response for the `GET /indexes/{id}` REST controller. This will return a YAML string
             * if `js-yaml` wasn't installed, otherwise, it will return {@link ChartIndexYaml}.
             */
            export type IndexMappings = string | types.ChartIndexYaml;

            /**
             * Response for the `GET /metrics` REST controller. This will always return
             * a string, even from the SDK.
             */
            export type Metrics = string;
        }

        /**
         * Responses for the API Keys endpoints.
         */
        export namespace apikeys {
            /**
             * Response for the `GET /apikeys` REST controller.
             */
            export type All = ApiKeys[];

            /**
             * Response for the `GET /apikeys/{idOrName}` REST controller.
             */
            export type Single = ApiKeys;

            /**
             * Response for the `PUT /apikeys` REST controller.
             */
            export type Create = ApiKeys;

            /**
             * Response for the `PATCH /apikeys/{idOrName}` REST controller.
             */
            export type Patch = types.Unit;

            /**
             * Response for the `DELETE /apikeys/{idOrName}` REST controller.
             */
            export type Delete = types.Unit;
        }

        export namespace users {
            /**
             * Response for the `GET /users/{idOrName}` or `GET /users/@me` REST controller.
             */
            export type Single = User;

            /**
             * Response for the `PUT /users` REST controller.
             */
            export type Create = User;

            /**
             * Response for the `PATCH /users` REST controller.
             */
            export type Patch = types.Unit;

            /**
             * Response for the `DELETE /users` REST controller.
             */
            export type Delete = types.Unit;
        }

        export namespace repositories {
            /**
             * Response type for the `GET /users/{idOrName}/repositories` or `GET /organizations/{idOrName}/repositories`
             * REST controller.
             */
            export type All = Repository[];

            /**
             * Response type for the following REST controllers:
             *  * `GET /users/{idOrName}/repositories/{id}`
             *  * `GET /organizations/{idOrName}/repositories/{id}`
             *  * `GET /repositories/{id}`
             */
            export type Single = Repository;

            /**
             * Response type for the `PUT /repositories` REST controller.
             */
            export type Create = Repository;

            /**
             * Response type for the `PATCH /repositories/{id}` REST controller.
             */
            export type Patch = Unit;

            /**
             * Response type for the `DELETE /repositories/{id}` REST controller.
             */
            export type Delete = Unit;

            export namespace releases {}
        }

        export namespace organizations {}
    }

    /**
     * Namespace for all the available request bodies for REST endpoints.
     */
    export namespace payloads {
        export namespace users {
            /**
             * Request body for the `PUT /users` REST controller.
             */
            export type CreateUserPayload = Schema<'CreateUserPayload'>;

            /**
             * Request body for the `PATCH /users` REST controller.
             */
            export type PatchUserPayload = Schema<'PatchUserPayload'>;
        }

        export namespace repositories {
            /**
             * Request body for the `PUT /users/@me/repositories` or `PUT /organizations/{idOrName}`
             * REST controllers.
             */
            export type CreateRepositoryPayload = Schema<'CreateRepositoryPayload'>;

            /**
             * Request body for the `PATCH /repositories/{id}` REST controller.
             */
            export type PatchRepositoryPayload = never;
            export namespace releases {
                /**
                 * Request body for the `PUT /repositories/{id}/releases/{version}` REST controller.
                 */
                export type CreateRepositoryReleasePayload = Schema<'CreateRepositoryReleasePayload'>;

                /**
                 * Request body for the `PATCH /repositories/{id}/releases/{version}` REST controller.
                 */
                export type PatchRepositoryReleasePayload = never;
            }
        }

        export namespace organizations {
            /**
             * Request body for the `PUT /organizations` REST controller.
             */
            export type CreateOrganizationPayload = Schema<'CreateOrganizationPayload'>;

            /**
             * Request body for the `PATCH /organizations/{idOrName}` REST controller.
             */
            export type PatchOrganizationPayload = never;
        }

        export namespace apikeys {
            /**
             * Request body for the `PUT /apikeys` REST controller.
             */
            export type CreateApiKeyPayload = Schema<'CreateApiKeyPayload'>;

            /**
             * Request body for the `PATCH /apikeys/{id}` REST controller.
             */
            export type PatchApiKeyPayload = never;
        }
    }

    type Schema<K extends keyof generated.components['schemas']> = generated.components['schemas'][K];
}

export = types;
export as namespace types;
