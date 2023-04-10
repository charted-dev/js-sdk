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

    /**
     * Mapping of all the query parameters for each {@link Route}.
     */
    export type QueryParamMap = {
        [K in Route]: _QueryParamMap<K>;
    };

    /**
     * Mapping of all the path parameters for each {@link Route}.
     */
    export type PathParamMap = {
        [K in Route]: _PathParamMap<K>;
    };

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
    export type ApiResponse<T = never> =
        | { success: true; data: T }
        | {
              success: false;
              errors: ApiError[];
          };

    export type ApiKeys = generated.components['schemas']['ApiKeys'];

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
    export type ChartDependency = generated.components['schemas']['ChartDependency'];

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
    export type ChartIndexSpec = generated.components['schemas']['ChartIndexSpec'];

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
    export type ChartIndexYaml = Omit<generated.components['schemas']['ChartIndexYaml'], 'generated' | 'entries'> & {
        generated: string;
        entries: ChartIndexSpec[];
    };

    /**
     * Describes a Chart maintainer.
     *
     * - `name`: User name or organization name
     * - `email`: Optional email address to contact the named maintainer
     * - `url`: Optional URL to an address for the named maintainer
     */
    export type ChartMaintainer = generated.components['schemas']['ChartMaintainer'];

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
    export type ChartSpec = generated.components['schemas']['ChartSpec'];

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
    export type CreateUserPayload = generated.components['schemas']['CreateUserPayload'];

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
    export type Distribution = generated.components['schemas']['InfoResponse']['distribution'];

    /**
     * ImportValues holds the mapping of source values to parent key to be imported.
     * Each item can be a string or pair of child/parent sublist items.
     *
     * - `child`: The source key of the values to be imported
     * - `parent`: The destination path in the parent chart's values
     */
    export type ImportValue = generated.components['schemas']['ImportValue'];

    /**
     * Type discriminator to identify a user, repository, or organization their `Name`
     * or its snowflake ID. This is used if you wish to provide usernames or their
     * IDs when requesting to the API server.
     */
    export type NameOrSnowflake = string | bigint;

    /**
     * Represents an organization resource. Organizations are a central part
     * to control Helm repositories apart from the owner of the organization,
     * it is uniquely identified by the web UI.
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
    export type Organization = generated.components['schemas']['Organization'];
    export type Repository = generated.components['schemas']['Repository'];
    export type RepositoryRelease = generated.components['schemas']['RepositoryRelease'];
    export type RepoType = 'application' | 'library' | 'operator';
    export type Session = generated.components['schemas']['Session'];
    export type StringOrImportValue = generated.components['schemas']['StringOrImportValue'];
    export type User = generated.components['schemas']['User'];

    /**
     * Namespace for all the API responses
     */
    export namespace responses {
        /**
         * Response for the `GET /repositories` REST controller
         */
        export type MainRepositoryResponse = ApiResponse<Schema<'MainRepositoryResponse'>>;

        /**
         * Response for the `GET /organizations` REST controller
         */
        export type MainOrganizationResponse = ApiResponse<Schema<'MainOrganizationResponse'>>;

        /**
         * Response for the `GET /users/@me/avatars/{hash?}` or `/organizations/{idOrName}/avatars/{hash?}`
         */
        export type GetUserOrOrganizationAvatarHashResponse = Buffer | Exclude<ApiResponse, { success: true }>;
    }

    /**
     * Namespace for all the available request bodies for REST endpoints.
     */
    export namespace payloads {
        export type CreateApiKeyPayload = Schema<'CreateApiKeyPayload'>;
        export type CreateOrganizationPayload = Schema<'CreateOrganizationPayload'>;
        export type CreateRepositoryPayload = Schema<'CreateRepositoryPayload'>;
        export type CreateRepositoryReleasePayload = Schema<'CreateRepositoryReleasePayload'>;
        export type CreateUserPayload = Schema<'CreateUserPayload'>;
        export type UserLoginPayload = Schema<'UserLoginPayload'>;
    }

    type Schema<K extends keyof generated.components['schemas']> = generated.components['schemas'][K];
}

export = types;
export as namespace types;
