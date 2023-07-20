import type { RequestEventLoader } from "@builder.io/qwik-city";
import { createClient, type Client } from "@libsql/client";

export function tursoClient(requestEvent: RequestEventLoader): Client {
  const url = requestEvent.env.get("TURSO_DB_URL")?.trim();
  if(url === undefined){
    throw new Error("TURSO_DB_URL is not defined")
  }

  const authToken = requestEvent.env.get("TURSO_DB_AUTH_TOKEN")?.trim();
  if(authToken === undefined){
    throw new Error("TURSO_DB_AUTH_TOKEN is not defined")
  }
  
  return createClient({
    url,
    authToken
  });
}