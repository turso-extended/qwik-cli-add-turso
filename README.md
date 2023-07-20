# Qwik CLI Turso integration

This is the Turso integration for the Qwik framework.

## How to add Turso to a Qwik project

You need to run the following command to add Turso to your Qwik app.

```sh
npm run qwik add turso
```

Then, you'll need to assign your Turso database credentials to the following
environment variables within `.env.local` when developing locally.

```
TURSO_DB_URL=
TURSO_DB_AUTH_TOKEN=
```

For production, add these variables to your deployment service configuration.

## How to use the integration

You can then import `tursoClient` and initiate a database client instance within
Qwik's server-side APIs that expose the `RequestEvent` object, such as
`routeLoader$()`, `routeAction$()`, `server$()` and endpoint handlers such as
`onGet`, `onPost`, `onRequest` etc.

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