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
    await prisma.user.deleteMany({
      where: { email: { contains: '@example.com' } }
    });
    console.log('Cleaned up test users.');
  } catch (err) {
    console.error('Cleanup failed:', err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
