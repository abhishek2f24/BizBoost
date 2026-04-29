const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql://postgres.ngivaozrabxyyyxqfdbx:EwxZpz%3FM-PL6Kpy@aws-1-ap-south-1.pooler.supabase.com:5432/postgres",
  ssl: { rejectUnauthorized: false },
});

async function migrate() {
  await client.connect();
  console.log("Connected to database");

  const migrations = [
    // Phase 1: Add passwordHash to User
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "passwordHash" TEXT`,
    
    // Phase 3: Add metaAdHeadline to Product
    `ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "metaAdHeadline" TEXT`,
    
    // Phase 4: Add customerEmail, paymentId, paymentMethod to Order
    `ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "customerEmail" TEXT`,
    `ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paymentId" TEXT`,
    `ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "paymentMethod" TEXT`,
    
    // Phase 2: Add phone, upiId, logo to Store
    `ALTER TABLE "Store" ADD COLUMN IF NOT EXISTS "phone" TEXT`,
    `ALTER TABLE "Store" ADD COLUMN IF NOT EXISTS "upiId" TEXT`,
    `ALTER TABLE "Store" ADD COLUMN IF NOT EXISTS "logo" TEXT`,
  ];

  for (const sql of migrations) {
    try {
      await client.query(sql);
      console.log("✅", sql.substring(0, 60) + "...");
    } catch (e) {
      console.error("⚠️ Skipped (already exists?):", e.message);
    }
  }

  await client.end();
  console.log("Migration complete!");
}

migrate().catch(console.error);
