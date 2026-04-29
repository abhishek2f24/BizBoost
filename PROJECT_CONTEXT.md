# BizBoost AI - Project Context & Master Plan

## 🎯 Our Mission & Motto
**Motto**: *"From Product to Profit in 60 Seconds."*  
**Goal**: To build the world's fastest, most beautiful, and most automated AI-powered storefront engine for small businesses, artisans, and individual sellers.

---

## 🛠️ Current Tech Stack
- **Framework**: Next.js 16.2.4 (App Router) + Turbopack.
- **Styling**: Tailwind CSS v4 (Premium glassmorphism & gradients).
- **Database**: **Supabase (PostgreSQL)**.
- **ORM**: Prisma 7 (with Cloud PostgreSQL adapters).
- **AI Engine**: OpenAI GPT-4o.
- **Payments**: Razorpay.

---

## ✨ Features Currently Built
- [x] **Dynamic AI Storefront**: Beautiful, responsive public stores generated from a slug.
- [x] **AI Marketing Engine**: One-click generation of titles, descriptions, and social media captions.
- [x] **Real-time Analytics**: Tracking sessions, scroll depth, and sales funnels.
- [x] **CRM & Lead Management**: Capturing customer interest and leads.
- [x] **Pricing & Subscriptions**: 999/month (10 Products) and 4999/month (Unlimited).
- [x] **Slug Validation**: Server-side check for unique store URLs.

---

## 🚀 Future Roadmap (Must Build)
- [ ] **Magic Content**: Full automation for Instagram, FB, and WhatsApp status updates.
- [ ] **Magic Ads**: One-click Meta & Google Ads generation and deployment.
- [ ] **AI Image Studio**: Automatically replace product backgrounds with professional lifestyle scenes.
- [ ] **WhatsApp Integration**: Automated order notifications and customer chat.
- [ ] **Global Sync**: Import/Export products from Etsy, Shopify, and Amazon.
- [ ] **Custom Domains**: Allow users to link their own domains (e.g., `www.mystore.com`).

---

## ⚠️ Development Rules (IMPORTANT)
1. **Never Remove Features**: Any new modification must **preserve** existing functionality. Do not delete logic for Analytics, Payments, or AI generation unless explicitly asked.
2. **Aesthetics are First-Class**: Every UI change must feel premium. No boring white backgrounds—use glassmorphism, harmonious HSL colors, and smooth transitions.
3. **Database Integrity**: All changes must be synced with the **Supabase schema**. Always run `npx prisma db push` and `npx prisma generate` after schema changes.
4. **Environment Safety**: Keep `.env` variables secure. Never hardcode keys.

---

## 🏗️ Work Log Summary
- **Migration**: Moved from local SQLite to Supabase Cloud.
- **Build Fixes**: Resolved all TypeScript/Vercel build errors (Missing imports, Type mismatches).
- **Bug Sweep**: Fixed Analytics crashes, broken placeholders, and invalid 404 routes.

---
*This file is the single source of truth for the project vision. Read this first before every session.*
