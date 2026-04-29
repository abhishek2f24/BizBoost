import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "postgresql://postgres.ngivaozrabxyyyxqfdbx:EwxZpz%3FM-PL6Kpy@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
  },
});
