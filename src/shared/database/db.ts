import postgres from "postgres";

const isDev = process.env.NODE_ENV === "development";
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgres://postgres:postgres@localhost:5432/myhealthapp";

declare const globalThis: {
  postgresGlobal?: ReturnType<typeof postgres>;
} & typeof global;

export const sql =
  globalThis.postgresGlobal ??
  postgres(databaseUrl);

if (isDev) {
  // Storing the SQL connection as singleton persists it across hot reloads.
  // This avoids making tons of connections to the database.
  globalThis.postgresGlobal = sql;
}
