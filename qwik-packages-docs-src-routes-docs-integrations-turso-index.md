---
title: Turso | Integrations
keywords: "database, edge"
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

## Using file databases

For local development and CI integration it is ideal to use local database files.

First check if SQLite is installed in your machine by running `sqlite3 --version`. If you get anything other than a version number (e.g `0-14 20:58:05 554764a6e721fab307c63a4f98cd958c8428a5d9d8edfde951858d6fd02daapl`), visit [this link for installation instructions].

Proceed to creating a SQLite file database by running the following command, run some SQLite commands (e.g `.tables`), and quit the shell `.quit`.

```sh
sqlite3 foo.db
```

Then, assign the database file path to the `TURSO_DB_URL` environment variable inside `.env.local`.

```
TURSO_DB_URL=file:foo.db
```

Use the SQLite shell to create the schema for your file database.

> **_Note_**: A database token is not needed when working with file databases.

## Using a Turso database

When you want to deploy your work to production, you can then [install the Turso
CLI] to your machine and [create a Turso database].

Using the Turso CLI, the following instructions will help you obtain your Turso
database credentials and assign them to the environment variables inside your
deployment environment.

Starting with the database url, run the following command.

```sh
turso db show <database-name> --url
```

Copy the resulting url and assign it to the `TURSO_DB_URL` environment variable.

And, for the database authentication token, run the command.

```sh
turso db tokens create <database-name>
```

Copy the resulting token and assign it to the `TURSO_DB_AUTH_TOKEN` environment
variable.

With the Turso CLI installed, use the `db shell` command to interactively work on your Turso database's schema.

```sh
turso db shell <database-name>
```

## How to use Turso inside Qwik

Import `tursoClient` inside your routes and initiate a database client instance
within Qwik's server-side APIs that expose the `RequestEvent` object, such as
`routeLoader$()`, `routeAction$()`, `server$()` and endpoint handlers such as
`onGet`, `onPost`, `onRequest`.

```ts
import { tursoClient } from "~/lib/turso";

export const useRouteLoader = routeLoader$(
  async (requestEvent: RequestEventBase) => {
    const client = tursoClient(requestEvent);

    const items = await client.execute("select * from table");

    return {
      items: items.rows,
    };
  }
);
```

[Turso]: https://turso.tech
[libSQL]: https://libsql.org
[this link for installation instructions]: https://sqlite.org/download.html
[install the Turso CLI]: https://docs.turso.tech/reference/turso-cli#installation
[create a Turso database]: https://docs.turso.tech/reference/turso-cli#create-a-logical-database
