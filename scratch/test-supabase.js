require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const user = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: 'Test User'
      }
    });
    console.log('Created user in Supabase:', user);
    
    const count = await prisma.user.count();
    console.log('Total users in Supabase:', count);
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
