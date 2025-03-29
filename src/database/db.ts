import postgres from "postgres";

const isDev = process.env.NODE_ENV === "development";
const databaseUrl = isDev
  ? "postgres://postgres:postgres@localhost:5432/myhealthapp"
  : process.env.DATABASE_URL ?? "";

export const sql = postgres(databaseUrl, {
  ssl: isDev ? undefined : "verify-full",
  transform: {
    undefined: null
  }
});
