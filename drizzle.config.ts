import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const databaseConnectionString = process.env.DATABASE_URL;
if (!databaseConnectionString) {
  throw new Error(`DATABASE_URL must be set for this operation!`);
}

export default defineConfig({
  out: "./.drizzle",
  dialect: "postgresql",
  schema: ["./src/db/schema.ts"],
  migrations: {
    prefix: "unix",
    table: "__drizzle_migrations__",
  },
  dbCredentials: {
    url: databaseConnectionString,
  },
});
