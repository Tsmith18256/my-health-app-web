import shift from "postgres-shift";
import postgres from "postgres";
import { fileURLToPath } from "url";

const sql = postgres(
  process.env.DATABASE_URL ??
    "postgres://postgres:postgres@localhost:5432/myhealthapp",
);

try {
  await shift({
    sql,
    path: fileURLToPath(new URL(".", import.meta.url)),
    before: ({ migration_id, name }) => {
      console.log("Migrating", migration_id, name);
    },
  });

  console.log("All good");
} catch (err) {
  console.error("Failed", err);

  await sql.end();
  process.exit(1);
}

await sql.end();
