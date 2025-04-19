import postgres from "postgres";

const isDev = process.env.NODE_ENV === "development";
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgres://postgres:postgres@localhost:5432/myhealthapp";

export const sql = postgres(databaseUrl, {
  ssl: isDev ? undefined : "verify-full",
});
