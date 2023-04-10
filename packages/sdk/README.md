# 🐻‍❄️📦 @ncharts/sdk

> _SDK bindings and typings for [charted-server](https://charts.noelware.org/docs/server/current)_

**@ncharts/sdk** is a fully-typed SDK for interacting with [charted-server](https://charts.noelware.org/docs/server/current). This is used by the [web interface](https://github.com/charted-dev/web) to send API calls to the API server.

> **Note**: Since we couldn't have `charted-dev` or `charted` as the NPM organization, we went with `@ncharts/`, which is meant to
> be **N**oelware **Charts** Platform.

## Usage

```shell
# NPM
$ npm i @ncharts/sdk

# Yarn
$ yarn add @ncharts/sdk

# pnpm
$ pnpm i @ncharts/sdk
```

```ts
import { createClient, AuthenticationStrategy } from '@ncharts/sdk';

const client = createClient({
    baseURL: 'https://charts.noelware.org/api',
    authentication: new AuthenticationStrategy.Basic('username', 'password'),
    defaultOptions: {
        // default http client options
    }
});

const noel = await client.users('noel').get();
// => User

const noelRepos = await noel.repositories.all();
// => Repository[]

const repo = await client.repositories.create({
    name: 'my-repo',
    description: 'Basic description for my repository',
    readme: `# Hello, world!
  This is the README for my repository that is available at https://charts.noelware.org/r/username/my-repo

  We can do *very* **wacky** ***things*** that is available for us to do.
`
});
// => Repository
```

## License

**@ncharts/sdk** is released under the **MIT License** with love by Noelware. <3
