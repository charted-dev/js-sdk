/*
 * 🐻‍❄️📦 @ncharts/sdk: TypeScript SDK library for Noelware's Charts Platform
 * Copyright 2023 Noelware, LLC. <team@noelware.org>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* eslint-ignore */
// prettier-ignore

// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
//            This file was generated from ./scripts/generate-types.ts
// Please do not make any changes. It will not be present in the next invocation.
// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=

/** WithRequired type helpers */
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export interface paths {
  "/_openapi": {
    /** @description Gets the document in JSON format or YAML format */
    get: {
      parameters: {
        query: {
          /** @description Format to use */
          format: string;
          /** @description Only applicable to `?format=json` -- if the document should be pretty or not */
          pretty: boolean;
        };
      };
      responses: {
      };
    };
  };
  "/_swagger": {
    get: {
      responses: {
        200: {
          content: {
            "text/html": unknown;
          };
        };
      };
    };
  };
  "/users": {
    /** @description Generic entrypoint for the Users API */
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkMainUserResponse"];
          };
        };
      };
    };
    /** @description Creates a user that can interact with this instance */
    put: {
      responses: {
        /** @description The created user */
        201: {
          content: {
            "application/json": components["schemas"]["OkUser"];
          };
        };
        /** @description If the server doesn't allow registrations */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the configured session manager is not the local one */
        501: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
    /** @description Deletes the current authentication user */
    delete: {
      responses: {
        202: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/users": {
    /** @description Generic entrypoint for the Users API */
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkMainUserResponse"];
          };
        };
      };
    };
    /** @description Creates a user that can interact with this instance */
    put: {
      responses: {
        /** @description The created user */
        201: {
          content: {
            "application/json": components["schemas"]["OkUser"];
          };
        };
        /** @description If the server doesn't allow registrations */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the configured session manager is not the local one */
        501: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
    /** @description Deletes the current authentication user */
    delete: {
      responses: {
        202: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/organizations": {
    /** @description Generic entrypoint for the Repositories API */
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["MainOrganizationResponse"];
          };
        };
      };
    };
    /** @description Creates an organization resource */
    put: {
      responses: {
        /** @description Created organization resource */
        202: {
          content: {
            "application/json": components["schemas"]["Organization"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/organizations": {
    /** @description Generic entrypoint for the Repositories API */
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["MainOrganizationResponse"];
          };
        };
      };
    };
    /** @description Creates an organization resource */
    put: {
      responses: {
        /** @description Created organization resource */
        202: {
          content: {
            "application/json": components["schemas"]["Organization"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/repositories/{id}/releases/{version}.tar.gz": {
    /** @description Gets a repository release's tarball, if the version exists */
    get: {
      parameters: {
        query: {
          /** @description If we are allowed to look-up for pre-releases if the version path parameter is "latest" */
          allow_prerelease: boolean;
        };
        path: {
          /** @description Repository ID to lookup */
          id: number;
          /** @description Valid SemVer version to lookup */
          version: string;
        };
      };
      responses: {
        /** @description Tar resource itself */
        200: {
          content: {
            "application/tar+gzip": unknown;
          };
        };
        /** @description If the version path parameter wasn't a valid SemVer version */
        400: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the tar resource wasn't found */
        404: {
          content: {
            "application/json": unknown;
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
    /** @description Uploads a tarball that is a valid Helm tarball that was generated from the `helm package` command. */
    post: {
      parameters: {
        path: {
          /** @description Repository ID to lookup */
          id: number;
          /** @description Valid SemVer version to use as the tarball name */
          version: string;
        };
      };
      responses: {
        /** @description Tarball was stored successfully */
        201: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description Invalid multipart/form-data object */
        400: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/repositories/{id}/releases/{version}.tar.gz": {
    /** @description Gets a repository release's tarball, if the version exists */
    get: {
      parameters: {
        query: {
          /** @description If we are allowed to look-up for pre-releases if the version path parameter is "latest" */
          allow_prerelease: boolean;
        };
        path: {
          /** @description Repository ID to lookup */
          id: number;
          /** @description Valid SemVer version to lookup */
          version: string;
        };
      };
      responses: {
        /** @description Tar resource itself */
        200: {
          content: {
            "application/tar+gzip": unknown;
          };
        };
        /** @description If the version path parameter wasn't a valid SemVer version */
        400: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the tar resource wasn't found */
        404: {
          content: {
            "application/json": unknown;
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
    /** @description Uploads a tarball that is a valid Helm tarball that was generated from the `helm package` command. */
    post: {
      parameters: {
        path: {
          /** @description Repository ID to lookup */
          id: number;
          /** @description Valid SemVer version to use as the tarball name */
          version: string;
        };
      };
      responses: {
        /** @description Tarball was stored successfully */
        201: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description Invalid multipart/form-data object */
        400: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/features": {
    /** @description Retrieve all the server instance's features */
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkFeaturesResponse"];
          };
        };
      };
    };
  };
  "/v1/features": {
    /** @description Retrieve all the server instance's features */
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkFeaturesResponse"];
          };
        };
      };
    };
  };
  "/users/{idOrName}/repositories/{repoIdOrName}": {
    /** @description Fetch a single repository from a user */
    get: {
      parameters: {
        path: {
          /** @description Name or Snowflake to query a user */
          idOrName: components["schemas"]["NameOrSnowflake"];
          /** @description Name or Snowflake to query a repository */
          repoIdOrName: components["schemas"]["NameOrSnowflake"];
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkListRepository"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description if a user or repository couldn't be found */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/users/{idOrName}/repositories/{repoIdOrName}": {
    /** @description Fetch a single repository from a user */
    get: {
      parameters: {
        path: {
          /** @description Name or Snowflake to query a user */
          idOrName: components["schemas"]["NameOrSnowflake"];
          /** @description Name or Snowflake to query a repository */
          repoIdOrName: components["schemas"]["NameOrSnowflake"];
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkListRepository"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description if a user or repository couldn't be found */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/repositories/{id}/readme": {
    /** @description Retrieve a repository's README */
    get: {
      parameters: {
        path: {
          /** @description Snowflake to query a repository */
          id: number;
        };
      };
      responses: {
        /** @description README content in Markdown */
        200: {
          content: {
            "text/plain": string;
          };
        };
        /** @description If a repository wasn't found or if there is no README */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
    /** @description Creates or updates a repository's README */
    post: {
      parameters: {
        path: {
          /** @description Snowflake to query a repository */
          id: number;
        };
      };
      responses: {
        /** @description README was updated successfully */
        202: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
      };
    };
    /** @description Creates or updates a repository's README */
    delete: {
      parameters: {
        path: {
          /** @description Snowflake to query a repository */
          id: number;
        };
      };
      responses: {
        /** @description README was updated successfully */
        202: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
      };
    };
  };
  "/v1/repositories/{id}/readme": {
    /** @description Retrieve a repository's README */
    get: {
      parameters: {
        path: {
          /** @description Snowflake to query a repository */
          id: number;
        };
      };
      responses: {
        /** @description README content in Markdown */
        200: {
          content: {
            "text/plain": string;
          };
        };
        /** @description If a repository wasn't found or if there is no README */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
    /** @description Creates or updates a repository's README */
    post: {
      parameters: {
        path: {
          /** @description Snowflake to query a repository */
          id: number;
        };
      };
      responses: {
        /** @description README was updated successfully */
        202: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
      };
    };
    /** @description Creates or updates a repository's README */
    delete: {
      parameters: {
        path: {
          /** @description Snowflake to query a repository */
          id: number;
        };
      };
      responses: {
        /** @description README was updated successfully */
        202: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
      };
    };
  };
  "/repositories/{id}/releases/{version}/values.yaml": {
    /** @description Returns the given Chart.yaml file of this release */
    get: {
      parameters: {
        query: {
          /** @description If we are allowed to look-up for pre-releases if the version path parameter is "latest" */
          allow_prerelease: boolean;
        };
        path: {
          /** @description Repository ID to lookup */
          id: number;
          /** @description Valid SemVer version to lookup */
          version: string;
        };
      };
      responses: {
        /** @description Chart.yaml file */
        200: {
          content: {
            "text/yaml": {
              [key: string]: Record<string, never> | undefined;
            };
          };
        };
        /** @description If the version path parameter wasn't a valid SemVer version */
        400: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the Chart.yaml file wasn't found for this release */
        404: {
          content: {
            "application/json": unknown;
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/repositories/{id}/releases/{version}/values.yaml": {
    /** @description Returns the given Chart.yaml file of this release */
    get: {
      parameters: {
        query: {
          /** @description If we are allowed to look-up for pre-releases if the version path parameter is "latest" */
          allow_prerelease: boolean;
        };
        path: {
          /** @description Repository ID to lookup */
          id: number;
          /** @description Valid SemVer version to lookup */
          version: string;
        };
      };
      responses: {
        /** @description Chart.yaml file */
        200: {
          content: {
            "text/yaml": {
              [key: string]: Record<string, never> | undefined;
            };
          };
        };
        /** @description If the version path parameter wasn't a valid SemVer version */
        400: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the Chart.yaml file wasn't found for this release */
        404: {
          content: {
            "application/json": unknown;
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/users/{idOrName}/repositories/{id}": {
    patch: {
      parameters: {
        path: {
          idOrName: components["schemas"]["NameOrSnowflake"];
          id: number;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/users/{idOrName}/repositories/{id}": {
    patch: {
      parameters: {
        path: {
          idOrName: components["schemas"]["NameOrSnowflake"];
          id: number;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/repositories/{id}/releases": {
    /** @description Creates a repository release */
    put: {
      responses: {
        /** @description Release resource was created successfully */
        201: {
          content: {
            "application/json": components["schemas"]["OkRepositoryRelease"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/repositories/{id}/releases": {
    /** @description Creates a repository release */
    put: {
      responses: {
        /** @description Release resource was created successfully */
        201: {
          content: {
            "application/json": components["schemas"]["OkRepositoryRelease"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/users/@me/logout": {
    /** @description Logs out of the current session */
    delete: {
      responses: {
        /** @description The session was deleted */
        202: {
          content: {
            "application/json": components["schemas"]["OkUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/users/@me/logout": {
    /** @description Logs out of the current session */
    delete: {
      responses: {
        /** @description The session was deleted */
        202: {
          content: {
            "application/json": components["schemas"]["OkUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/apikeys": {
    /** @description Returns all of the API key resources created by the current authenticated user */
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkListApiKeys"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
    /** @description Creates an API key under the current authenticated user */
    put: {
      responses: {
        201: {
          content: {
            "application/json": components["schemas"]["OkApiKeys"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/apikeys": {
    /** @description Returns all of the API key resources created by the current authenticated user */
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkListApiKeys"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
    /** @description Creates an API key under the current authenticated user */
    put: {
      responses: {
        201: {
          content: {
            "application/json": components["schemas"]["OkApiKeys"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/users/@me": {
    /** @description Gets the current authentication user's metadata */
    get: {
      responses: {
        /** @description Current authentication user's metadata */
        200: {
          content: {
            "application/json": components["schemas"]["OkUser"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/users/@me": {
    /** @description Gets the current authentication user's metadata */
    get: {
      responses: {
        /** @description Current authentication user's metadata */
        200: {
          content: {
            "application/json": components["schemas"]["OkUser"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/users/{idOrName}/repositories": {
    /** @description Returns all of an user's repositories */
    get: {
      parameters: {
        path: {
          idOrName: components["schemas"]["NameOrSnowflake"];
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkListRepository"];
          };
        };
        /** @description if an organization couldn't be found */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/users/{idOrName}/repositories": {
    /** @description Returns all of an user's repositories */
    get: {
      parameters: {
        path: {
          idOrName: components["schemas"]["NameOrSnowflake"];
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkListRepository"];
          };
        };
        /** @description if an organization couldn't be found */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/users/{idOrName}/avatars/{hash?}": {
    /** @description Returns the current authenticated user's avatar, if any. */
    get: {
      parameters: {
        path: {
          /** @description The snowflake or username to find */
          idOrName: components["schemas"]["NameOrSnowflake"];
          /** @description Avatar hash, if this was not provided, then it will find the latest one. */
          hash: string;
        };
      };
      responses: {
        /** @description The avatar itself in bytes */
        200: {
          content: {
            "image/jpeg": unknown;
            "image/svg+xml": unknown;
            "image/gif": unknown;
            "image/png": unknown;
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/users/{idOrName}/avatars/{hash?}": {
    /** @description Returns the current authenticated user's avatar, if any. */
    get: {
      parameters: {
        path: {
          /** @description The snowflake or username to find */
          idOrName: components["schemas"]["NameOrSnowflake"];
          /** @description Avatar hash, if this was not provided, then it will find the latest one. */
          hash: string;
        };
      };
      responses: {
        /** @description The avatar itself in bytes */
        200: {
          content: {
            "image/jpeg": unknown;
            "image/svg+xml": unknown;
            "image/gif": unknown;
            "image/png": unknown;
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/heartbeat": {
    get: {
      responses: {
        200: {
          content: {
            "text/plain": string;
          };
        };
      };
    };
  };
  "/v1/heartbeat": {
    get: {
      responses: {
        200: {
          content: {
            "text/plain": string;
          };
        };
      };
    };
  };
  "/users/@me/sessions": {
    /** @description Lists all the available sessions from the current authenticated user */
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkListSession"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/users/@me/sessions": {
    /** @description Lists all the available sessions from the current authenticated user */
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkListSession"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/apikeys/{nameOrId}": {
    /** @description Returns a single API key resource owned by the current authenticated user */
    get: {
      parameters: {
        path: {
          /** @description Name of the given API key to delete, or a Snowflake value to delete the API key by */
          name: components["schemas"]["NameOrSnowflake"];
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkApiKeys"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        404: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
    /** @description Deletes an API key resource off the current authenticated user's account */
    delete: {
      parameters: {
        path: {
          /** @description Name of the given API key to delete, or a Snowflake value to delete the API key by */
          name: components["schemas"]["NameOrSnowflake"];
        };
      };
      responses: {
        /** @description API key resource was deleted */
        202: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description API key resource with name or ID was not found */
        404: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/apikeys/{nameOrId}": {
    /** @description Returns a single API key resource owned by the current authenticated user */
    get: {
      parameters: {
        path: {
          /** @description Name of the given API key to delete, or a Snowflake value to delete the API key by */
          name: components["schemas"]["NameOrSnowflake"];
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkApiKeys"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        404: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
    /** @description Deletes an API key resource off the current authenticated user's account */
    delete: {
      parameters: {
        path: {
          /** @description Name of the given API key to delete, or a Snowflake value to delete the API key by */
          name: components["schemas"]["NameOrSnowflake"];
        };
      };
      responses: {
        /** @description API key resource was deleted */
        202: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description API key resource with name or ID was not found */
        404: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/users/login": {
    /** @description Login into charted-server with a username and password */
    post: {
      responses: {
        /** @description Newly created session that was created */
        201: {
          content: {
            "application/json": components["schemas"]["OkSession"];
          };
        };
        /** @description If the user wasn't found */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/users/login": {
    /** @description Login into charted-server with a username and password */
    post: {
      responses: {
        /** @description Newly created session that was created */
        201: {
          content: {
            "application/json": components["schemas"]["OkSession"];
          };
        };
        /** @description If the user wasn't found */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/users/@me/sessions/refresh_token": {
    /** @description Refreshes the current authenticated session's access token with the refresh token. */
    post: {
      responses: {
        202: {
          content: {
            "application/json": components["schemas"]["OkSession"];
          };
        };
        /** @description If the access token is still too new or if the passed in Authorization header didn't use the refresh token */
        400: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/users/@me/sessions/refresh_token": {
    /** @description Refreshes the current authenticated session's access token with the refresh token. */
    post: {
      responses: {
        202: {
          content: {
            "application/json": components["schemas"]["OkSession"];
          };
        };
        /** @description If the access token is still too new or if the passed in Authorization header didn't use the refresh token */
        400: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/repositories/{id}": {
    /** @description Returns a repository entity with the given ID. Use the /users/{idOrName}/repos/{repoIdOrName} to fetch a user repository with a ID or name, or /organizations/{idOrName}/repos/{repoIdOrName} to fetch a organization repository with a ID or name */
    get: {
      parameters: {
        path: {
          /** @description Snowflake of the repository to look up */
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkRepository"];
          };
        };
      };
    };
    /** @description Deletes a repository */
    delete: {
      responses: {
        /** @description The repository was deleted successfully */
        202: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the `id` path parameter couldn't be into a valid Snowflake */
        422: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
      };
    };
  };
  "/v1/repositories/{id}": {
    /** @description Returns a repository entity with the given ID. Use the /users/{idOrName}/repos/{repoIdOrName} to fetch a user repository with a ID or name, or /organizations/{idOrName}/repos/{repoIdOrName} to fetch a organization repository with a ID or name */
    get: {
      parameters: {
        path: {
          /** @description Snowflake of the repository to look up */
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkRepository"];
          };
        };
      };
    };
    /** @description Deletes a repository */
    delete: {
      responses: {
        /** @description The repository was deleted successfully */
        202: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the `id` path parameter couldn't be into a valid Snowflake */
        422: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
      };
    };
  };
  "/users/@me/avatars": {
    /** @description Updates the current authenticated user's avatar */
    post: {
      responses: {
        /** @description The avatar was successfully updated */
        202: {
          content: {
            "application/json": components["schemas"]["OkUnit"];
          };
        };
        /** @description If we couldn't find the file part to use, or if the selected part was not a file */
        400: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/users/@me/avatars": {
    /** @description Updates the current authenticated user's avatar */
    post: {
      responses: {
        /** @description The avatar was successfully updated */
        202: {
          content: {
            "application/json": components["schemas"]["OkUnit"];
          };
        };
        /** @description If we couldn't find the file part to use, or if the selected part was not a file */
        400: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/repositories/{id}/releases/{version}/templates": {
    /** @description List of all available templates of a given release */
    get: {
      parameters: {
        query: {
          /** @description If we are allowed to look-up for pre-releases if the version path parameter is "latest" */
          allow_prerelease: boolean;
        };
        path: {
          /** @description Repository ID to lookup */
          id: number;
          /** @description Valid SemVer version to lookup */
          version: string;
        };
      };
      responses: {
        /** @description All the templates available */
        200: {
          content: {
            "application/json": components["schemas"]["OkListString"];
          };
        };
        /** @description If the version path parameter wasn't a valid SemVer version */
        400: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the tar resource wasn't found */
        404: {
          content: {
            "application/json": unknown;
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/repositories/{id}/releases/{version}/templates": {
    /** @description List of all available templates of a given release */
    get: {
      parameters: {
        query: {
          /** @description If we are allowed to look-up for pre-releases if the version path parameter is "latest" */
          allow_prerelease: boolean;
        };
        path: {
          /** @description Repository ID to lookup */
          id: number;
          /** @description Valid SemVer version to lookup */
          version: string;
        };
      };
      responses: {
        /** @description All the templates available */
        200: {
          content: {
            "application/json": components["schemas"]["OkListString"];
          };
        };
        /** @description If the version path parameter wasn't a valid SemVer version */
        400: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the tar resource wasn't found */
        404: {
          content: {
            "application/json": unknown;
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/indexes/{idOrName}": {
    /** @description Returns a user or organization's chart index */
    get: {
      responses: {
        200: {
          content: {
            "text/yaml": components["schemas"]["ChartIndexYaml"];
          };
        };
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/indexes/{idOrName}": {
    /** @description Returns a user or organization's chart index */
    get: {
      responses: {
        200: {
          content: {
            "text/yaml": components["schemas"]["ChartIndexYaml"];
          };
        };
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/users/{idOrName}": {
    /** @description Retrieves a user from the database */
    get: {
      parameters: {
        path: {
          /** @description The snowflake or username to use */
          idOrName: components["schemas"]["NameOrSnowflake"];
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkUser"];
          };
        };
        /** @description If the provided idOrName parameter wasn't a snowflake or username */
        400: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a user by the idOrName parameter was not found */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/users/{idOrName}": {
    /** @description Retrieves a user from the database */
    get: {
      parameters: {
        path: {
          /** @description The snowflake or username to use */
          idOrName: components["schemas"]["NameOrSnowflake"];
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkUser"];
          };
        };
        /** @description If the provided idOrName parameter wasn't a snowflake or username */
        400: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a user by the idOrName parameter was not found */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/info": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["InfoResponse"];
          };
        };
      };
    };
  };
  "/v1/info": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["InfoResponse"];
          };
        };
      };
    };
  };
  "/users/@me/repositories": {
    /** @description Creates a repository that is owned by the current authenticated user */
    put: {
      responses: {
        201: {
          content: {
            "application/json": components["schemas"]["OkRepository"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/users/@me/repositories": {
    /** @description Creates a repository that is owned by the current authenticated user */
    put: {
      responses: {
        201: {
          content: {
            "application/json": components["schemas"]["OkRepository"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/users/@me/avatars/{hash?}": {
    /** @description Returns the current authenticated user's avatar, if any. */
    get: {
      parameters: {
        path: {
          /** @description Avatar hash, if this was not provided, then it will find the latest one. */
          hash: string;
        };
      };
      responses: {
        /** @description The avatar itself in bytes */
        200: {
          content: {
            "image/jpeg": unknown;
            "image/svg+xml": unknown;
            "image/gif": unknown;
            "image/png": unknown;
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/users/@me/avatars/{hash?}": {
    /** @description Returns the current authenticated user's avatar, if any. */
    get: {
      parameters: {
        path: {
          /** @description Avatar hash, if this was not provided, then it will find the latest one. */
          hash: string;
        };
      };
      responses: {
        /** @description The avatar itself in bytes */
        200: {
          content: {
            "image/jpeg": unknown;
            "image/svg+xml": unknown;
            "image/gif": unknown;
            "image/png": unknown;
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkMainResponse"];
          };
        };
      };
    };
  };
  "/v1": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkMainResponse"];
          };
        };
      };
    };
  };
  "/repositories/{id}/releases/{version}/Chart.yaml": {
    /** @description Returns the given Chart.yaml file of this release */
    get: {
      parameters: {
        query: {
          /** @description If we are allowed to look-up for pre-releases if the version path parameter is "latest" */
          allow_prerelease: boolean;
        };
        path: {
          /** @description Repository ID to lookup */
          id: number;
          /** @description Valid SemVer version to lookup */
          version: string;
        };
      };
      responses: {
        /** @description Chart.yaml file */
        200: {
          content: {
            "text/yaml": components["schemas"]["ChartSpec"];
          };
        };
        /** @description If the version path parameter wasn't a valid SemVer version */
        400: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the Chart.yaml file wasn't found for this release */
        404: {
          content: {
            "application/json": unknown;
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/repositories/{id}/releases/{version}/Chart.yaml": {
    /** @description Returns the given Chart.yaml file of this release */
    get: {
      parameters: {
        query: {
          /** @description If we are allowed to look-up for pre-releases if the version path parameter is "latest" */
          allow_prerelease: boolean;
        };
        path: {
          /** @description Repository ID to lookup */
          id: number;
          /** @description Valid SemVer version to lookup */
          version: string;
        };
      };
      responses: {
        /** @description Chart.yaml file */
        200: {
          content: {
            "text/yaml": components["schemas"]["ChartSpec"];
          };
        };
        /** @description If the version path parameter wasn't a valid SemVer version */
        400: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the Chart.yaml file wasn't found for this release */
        404: {
          content: {
            "application/json": unknown;
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/repositories": {
    /** @description Generic entrypoint for the Repositories API */
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkMainRepositoryResponse"];
          };
        };
      };
    };
  };
  "/v1/repositories": {
    /** @description Generic entrypoint for the Repositories API */
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["OkMainRepositoryResponse"];
          };
        };
      };
    };
  };
  "/repositories/{id}/releases/{version}/template/{template}": {
    /** @description List of all available templates of a given release */
    get: {
      parameters: {
        query: {
          /** @description If we are allowed to look-up for pre-releases if the version path parameter is "latest" */
          allow_prerelease: boolean;
        };
        path: {
          /** @description Repository ID to lookup */
          id: number;
          /** @description Valid SemVer version to lookup */
          version: string;
        };
      };
      responses: {
        /** @description Valid Kubernetes API object as YAML */
        200: {
          content: {
            "text/yaml": {
              [key: string]: Record<string, never> | undefined;
            };
          };
        };
        /** @description If the version path parameter wasn't a valid SemVer version */
        400: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the template wasn't found */
        404: {
          content: {
            "application/json": unknown;
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/repositories/{id}/releases/{version}/template/{template}": {
    /** @description List of all available templates of a given release */
    get: {
      parameters: {
        query: {
          /** @description If we are allowed to look-up for pre-releases if the version path parameter is "latest" */
          allow_prerelease: boolean;
        };
        path: {
          /** @description Repository ID to lookup */
          id: number;
          /** @description Valid SemVer version to lookup */
          version: string;
        };
      };
      responses: {
        /** @description Valid Kubernetes API object as YAML */
        200: {
          content: {
            "text/yaml": {
              [key: string]: Record<string, never> | undefined;
            };
          };
        };
        /** @description If the version path parameter wasn't a valid SemVer version */
        400: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If the template wasn't found */
        404: {
          content: {
            "application/json": unknown;
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/organizations/{id}": {
    /** @description Deletes an organization resource */
    delete: {
      parameters: {
        path: {
          /** @description Snowflake ID of the organization resource to delete */
          id: number;
        };
      };
      responses: {
        /** @description Organization was successfully deleted */
        202: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
  "/v1/organizations/{id}": {
    /** @description Deletes an organization resource */
    delete: {
      parameters: {
        path: {
          /** @description Snowflake ID of the organization resource to delete */
          id: number;
        };
      };
      responses: {
        /** @description Organization was successfully deleted */
        202: {
          content: {
            "application/json": components["schemas"]["ApiResponseUnit"];
          };
        };
        /** @description If the authentication handler couldn't authorize successfully */
        401: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not present or a REST controller requires the authentication type to be from a Session Token */
        403: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description If a session couldn't be found based off the authentication details given, or if a user wasn't found (can happen if a user was deleted) */
        404: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
        /** @description Whether if the `Authorization` header is not in an acceptable format */
        406: {
          content: {
            "application/json": components["schemas"]["Err"];
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    ApiError: {
      code: string;
      message: string;
      detail?: Record<string, never>;
    };
    ApiKeys: {
      description?: string;
      /** Format: date-time */
      expires_in?: string;
      /** Format: int64 */
      bits: number;
      token?: string;
      owner: components["schemas"]["User"];
      name: string;
      /** Format: int64 */
      id: number;
    };
    ApiResponseUnit: {
      success: boolean;
    };
    ChartDependency: {
      name: string;
      version?: string;
      repository?: string;
      condition?: string;
      tags: (string)[];
      "import-values": (components["schemas"]["StringOrImportValue"])[];
      alias?: string;
    };
    ChartIndexSpec: {
      /** @enum {string} */
      apiVersion: "v1" | "v2";
      name: string;
      version: string;
      kubeVersion?: string;
      description?: string;
      /** @enum {string} */
      type?: "application" | "library" | "operator";
      keywords: (string)[];
      home?: string;
      sources: (string)[];
      dependencies: (components["schemas"]["ChartDependency"])[];
      maintainers: (components["schemas"]["ChartMaintainer"])[];
      icon?: string;
      appVersion?: string;
      deprecated: boolean;
      annotations: {
        [key: string]: string | undefined;
      };
      urls: (string)[];
      /** Format: date */
      created?: string;
      removed: boolean;
      digest?: string;
    };
    ChartIndexYaml: {
      apiVersion: string;
      entries: {
        [key: string]: (components["schemas"]["ChartIndexSpec"])[] | undefined;
      };
      /** Format: date */
      generated: string;
    };
    ChartMaintainer: {
      name: string;
      email?: string;
      url?: string;
    };
    ChartSpec: {
      /** @enum {string} */
      apiVersion: "v1" | "v2";
      name: string;
      version: string;
      kubeVersion?: string;
      description?: string;
      /** @enum {string} */
      type?: "application" | "library" | "operator";
      keywords: (string)[];
      home?: string;
      sources: (string)[];
      dependencies: (components["schemas"]["ChartDependency"])[];
      maintainers: (components["schemas"]["ChartMaintainer"])[];
      icon?: string;
      appVersion?: string;
      deprecated: boolean;
      annotations: {
        [key: string]: string | undefined;
      };
    };
    /** @description Represents a resource for creating API keys */
    CreateApiKeyPayload: {
      description?: string;
      /** Format: int64 */
      expires_in?: number;
      scopes: (string)[];
      name: string;
    };
    CreateOrganizationPayload: {
      display_name?: string;
      private: boolean;
      name: string;
    };
    CreateRepositoryPayload: {
      description?: string;
      private: boolean;
      readme?: string;
      name: string;
      /** @enum {string} */
      type: "application" | "library" | "operator";
    };
    CreateRepositoryReleasePayload: {
      update_text?: string;
      tag: string;
    };
    CreateUserPayload: {
      username: string;
      password: string;
      email: string;
    };
    /** @description Represents an unsuccessful response, with any errors that might've occurred during the invocation of the request */
    Err: WithRequired<components["schemas"]["ApiResponseUnit"] & {
      errors?: (components["schemas"]["ApiError"])[];
    }, "errors" | "success">;
    FeaturesResponse: {
      docker_registry: boolean;
      registrations: boolean;
      audit_logs: boolean;
      webhooks: boolean;
      is_invite_only: boolean;
      integrations: {
        [key: string]: boolean | undefined;
      };
      search: boolean;
    };
    ImportValue: {
      child: string;
      parent: string;
    };
    /** @description Represents the response for the `GET /info` REST handler. */
    InfoResponse: {
      /** @enum {string} */
      distribution: "kubernetes" | "unknown" | "docker" | "rpm" | "deb" | "git";
      commit_sha: string;
      build_date: string;
      product: string;
      version: string;
      vendor: string;
    };
    MainOrganizationResponse: {
      message: string;
      docs: string;
    };
    MainRepositoryResponse: {
      message: string;
      docsUrl: string;
    };
    MainResponse: {
      message: string;
      tagline: string;
      docs: string;
    };
    /** @description Generic entrypoint response for the Users API */
    MainUserResponse: {
      message: string;
      docs_url: string;
    };
    /** @description Represents a value that handles Name and Snowflake parameters */
    NameOrSnowflake: string | number;
    /** @description Represents a successful response, with any data attached if any */
    Ok: WithRequired<components["schemas"]["ApiResponseUnit"] & {
      data?: Record<string, never>;
    }, "success">;
    /** @description Represents a successful response, with any data attached if any */
    OkApiKeys: {
      data?: components["schemas"]["ApiKeys"];
      success: boolean;
    };
    /** @description Represents a successful response, with any data attached if any */
    OkFeaturesResponse: {
      data?: components["schemas"]["FeaturesResponse"];
      success: boolean;
    };
    /** @description Represents a successful response, with any data attached if any */
    OkListApiKeys: {
      data?: (components["schemas"]["ApiKeys"])[];
      success: boolean;
    };
    /** @description Represents a successful response, with any data attached if any */
    OkListRepository: {
      data?: (components["schemas"]["Repository"])[];
      success: boolean;
    };
    /** @description Represents a successful response, with any data attached if any */
    OkListSession: {
      data?: (components["schemas"]["Session"])[];
      success: boolean;
    };
    /** @description Represents a successful response, with any data attached if any */
    OkListString: {
      data?: (string)[];
      success: boolean;
    };
    /** @description Represents a successful response, with any data attached if any */
    OkMainRepositoryResponse: {
      data?: components["schemas"]["MainRepositoryResponse"];
      success: boolean;
    };
    /** @description Represents a successful response, with any data attached if any */
    OkMainResponse: {
      data?: components["schemas"]["MainResponse"];
      success: boolean;
    };
    /** @description Represents a successful response, with any data attached if any */
    OkMainUserResponse: {
      data?: components["schemas"]["MainUserResponse"];
      success: boolean;
    };
    /** @description Represents a successful response, with any data attached if any */
    OkRepository: {
      data?: components["schemas"]["Repository"];
      success: boolean;
    };
    /** @description Represents a successful response, with any data attached if any */
    OkRepositoryRelease: {
      data?: components["schemas"]["RepositoryRelease"];
      success: boolean;
    };
    /** @description Represents a successful response, with any data attached if any */
    OkSession: {
      data?: components["schemas"]["Session"];
      success: boolean;
    };
    /** @description Represents a successful response, with any data attached if any */
    OkUnit: {
      data?: components["schemas"]["Unit"];
      success: boolean;
    };
    /** @description Represents a successful response, with any data attached if any */
    OkUser: {
      data?: components["schemas"]["User"];
      success: boolean;
    };
    Organization: {
      /** @description Whether if this organization is a verified publisher on this instance */
      verified_publisher: boolean;
      twitter_handle?: string;
      gravatar_email?: string;
      display_name?: string;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
      icon_hash?: string;
      private: boolean;
      owner: components["schemas"]["User"];
      name: string;
      /** Format: int64 */
      id: number;
    };
    PatchUserPayload: {
      gravatar_email?: string;
      description?: string;
      username?: string;
      password?: string;
      email?: string;
      name?: string;
    };
    Repository: {
      description?: string;
      deprecated: boolean;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
      icon_hash?: string;
      private: boolean;
      /** Format: int64 */
      owner_id: number;
      name: string;
      /** @enum {string} */
      type: "application" | "library" | "operator";
      /** Format: int64 */
      id: number;
    };
    RepositoryRelease: {
      update_text?: string;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
      tag: string;
      /** Format: int64 */
      id: number;
    };
    /** @description Represents a session token object. This is how sessions are stored when authenticating to charted-server. */
    Session: {
      refresh_token: string;
      access_token: string;
      /** Format: uuid */
      session_id: string;
      /** Format: int64 */
      user_id: number;
    };
    StringOrImportValue: string | components["schemas"]["ImportValue"];
    Unit: Record<string, never>;
    User: {
      verified_publisher: boolean;
      gravatar_email?: string;
      description?: string;
      avatar_hash?: string;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
      username: string;
      admin: boolean;
      name?: string;
      /** Format: int64 */
      id: number;
    };
    UserLoginPayload: {
      username?: string;
      password: string;
      email?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export type operations = Record<string, never>;