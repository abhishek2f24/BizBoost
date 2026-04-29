import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "postgresql://postgres.ngivaozrabxyyyxqfdbx:%40BHI2f24@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
  },
});
