require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const Database = require('better-sqlite3');
const path = require('path');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const db = new Database(path.join(process.cwd(), 'dev.db'));

async function migrate() {
  console.log('Starting migration from SQLite to Supabase...');

  try {
    // 1. Users
    const users = db.prepare('SELECT * FROM User').all();
    console.log(`Migrating ${users.length} users...`);
    for (const user of users) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: {
          ...user,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
          emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
        }
      });
    }

    // 2. Accounts
    const accounts = db.prepare('SELECT * FROM Account').all();
    console.log(`Migrating ${accounts.length} accounts...`);
    for (const acc of accounts) {
      await prisma.account.upsert({
        where: { id: acc.id },
        update: {},
        create: acc
      });
    }

    // 3. Stores
    const stores = db.prepare('SELECT * FROM Store').all();
    console.log(`Migrating ${stores.length} stores...`);
    for (const store of stores) {
      await prisma.store.upsert({
        where: { id: store.id },
        update: {},
        create: {
          ...store,
          isPublished: Boolean(store.isPublished),
          createdAt: new Date(store.createdAt),
          updatedAt: new Date(store.updatedAt),
        }
      });
    }

    // 4. Products
    const products = db.prepare('SELECT * FROM Product').all();
    console.log(`Migrating ${products.length} products...`);
    for (const p of products) {
      await prisma.product.upsert({
        where: { id: p.id },
        update: {},
        create: {
          ...p,
          price: Number(p.price),
          comparePrice: p.comparePrice ? Number(p.comparePrice) : null,
          stock: Number(p.stock),
          isActive: Boolean(p.isActive),
          aiGenerated: Boolean(p.aiGenerated),
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        }
      });
    }

    // 5. Leads
    const leads = db.prepare('SELECT * FROM Lead').all();
    console.log(`Migrating ${leads.length} leads...`);
    for (const l of leads) {
      await prisma.lead.upsert({
        where: { id: l.id },
        update: {},
        create: {
          ...l,
          createdAt: new Date(l.createdAt),
        }
      });
    }

    // 6. AICreatives
    const creatives = db.prepare('SELECT * FROM AICreative').all();
    console.log(`Migrating ${creatives.length} creatives...`);
    for (const c of creatives) {
      await prisma.aICreative.upsert({
        where: { id: c.id },
        update: {},
        create: {
          ...c,
          createdAt: new Date(c.createdAt),
        }
      });
    }

    // 7. Campaigns
    const campaigns = db.prepare('SELECT * FROM Campaign').all();
    console.log(`Migrating ${campaigns.length} campaigns...`);
    for (const camp of campaigns) {
      await prisma.campaign.upsert({
        where: { id: camp.id },
        update: {},
        create: {
          ...camp,
          scheduledAt: new Date(camp.scheduledAt),
          createdAt: new Date(camp.createdAt),
          updatedAt: new Date(camp.updatedAt),
        }
      });
    }

    // 8. Orders
    const orders = db.prepare('SELECT * FROM "Order"').all();
    console.log(`Migrating ${orders.length} orders...`);
    for (const o of orders) {
      await prisma.order.upsert({
        where: { id: o.id },
        update: {},
        create: {
          ...o,
          total: Number(o.total),
          createdAt: new Date(o.createdAt),
          updatedAt: new Date(o.updatedAt),
        }
      });
    }

    // 9. OrderItems
    const orderItems = db.prepare('SELECT * FROM OrderItem').all();
    console.log(`Migrating ${orderItems.length} order items...`);
    for (const item of orderItems) {
      await prisma.orderItem.upsert({
        where: { id: item.id },
        update: {},
        create: {
          ...item,
          price: Number(item.price),
          quantity: Number(item.quantity),
        }
      });
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
    db.close();
  }
}

migrate();
