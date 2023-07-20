---
title: Turso | Integrations
keywords: 'database, edge'
contributors:
  - xinnks
---

# Turso

[Turso] is the edge database based on [libSQL] - the open-source
open-contribution fork of SQLite.

It enables you to place your data close to your users in over 35 locations
around the world.

## Usage

You can easily add Turso by using the following Qwik starter script:

```shell
npm run qwik add turso
```

This command will add the necessary dependencies to use Turso.

It also adds new files inside your project folder:

- `src/lib/turso.ts`

and adds or modifies a `.env.local` file to include

```txt title=".env.local"
TURSO_DB_URL=
TURSO_DB_AUTH_TOKEN=
```
***Note***
> Make sure that you have [installed the Turso CLI] to your machine and have
> also [created a Turso database].

Get your [Turso database credentials and assign the obtained values to the
environment variables] above.

***Note***: In production, add these variables where appropriate within your
deployment service's configuration.

## How to use Turso in your pages

You can then import `tursoClient` and initiate a database client instance within
Qwik's server-side APIs that expose the `RequestEvent` object, such as
`routeLoader$()`, `routeAction$()`, `server$()` and endpoint handlers such as
`onGet`, `onPost`, `onRequest` within your pages.

```ts
import { tursoClient } from "~/lib/turso";

export const useRouteLoader = routeLoader$(async (requestEvent: RequestEventBase) => {
  const client = tursoClient(requestEvent);

  const items = await client.execute("select * from table");

  return {
    items: items.rows
  }
})
```

[Turso]: https://turso.tech
[libSQL]: https://libsql.org
[installed the Turso CLI]:
    https://docs.turso.tech/reference/turso-cli#installation
[created a Turso database]:
    https://docs.turso.tech/reference/turso-cli#create-a-logical-database
[Turso database credentials and assign the obtained values to the environment
    variables]:
    https://github.com/turso-extended/app-turqw-store/tree/master#set-up-turso-on-the-project