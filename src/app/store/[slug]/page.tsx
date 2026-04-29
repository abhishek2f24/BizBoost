import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CheckoutButton from "./CheckoutButton";

export default async function StorefrontPage({ params }: { params: { slug: string } }) {
  
  // Try to find the real store in DB
  let store = null;
  try {
    store = await prisma.store.findUnique({
      where: { slug: params.slug },
      include: { 
        products: {
          where: { isActive: true }
        } 
      }
    });
  } catch (err) {
    console.error("Storefront DB Error:", err);
  }

  // If no store found in DB during demo, mock a premium store
  if (!store) {
    store = {
      id: "demo-store",
      name: "Handcrafted by Anjali",
      description: "Discover our hand-picked selection of ethnic wear and jewelry. Handcrafted with love by master artisans.",
      slug: params.slug,
      language: "en",
      theme: "saffron",
      banner: null,
      logo: null,
      phone: null,
      upiId: null,
      userId: "demo",
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      products: [
        { 
          id: "1", storeId: "demo", name: "Saffron Silk Saree", price: 4999, comparePrice: null, 
          description: "Premium silk saree handcrafted by artisans.", imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=800",
          images: "[]", category: "Apparel", stock: 10, isActive: true, tags: "[]", hashtags: "[]", 
          whatsappCaption: null, instagramCaption: null, reelScript: null, facebookAdText: null, 
          whatsappStatus: null, festivalBannerPrompt: null, aiGenerated: false, descriptionHi: null,
          createdAt: new Date(), updatedAt: new Date()
        },
        { 
          id: "2", storeId: "demo", name: "Kundan Necklace Set", price: 2499, comparePrice: null, 
          description: "Authentic Kundan set.", imageUrl: "https://images.unsplash.com/photo-1599643478524-fb66f4568eb8?auto=format&fit=crop&q=80&w=800",
          images: "[]", category: "Jewelry", stock: 10, isActive: true, tags: "[]", hashtags: "[]", 
          whatsappCaption: null, instagramCaption: null, reelScript: null, facebookAdText: null, 
          whatsappStatus: null, festivalBannerPrompt: null, aiGenerated: false, descriptionHi: null,
          createdAt: new Date(), updatedAt: new Date()
        }
      ]
    };
  }

  return (
    <div className="min-h-screen bg-background font-body text-ink pb-24 selection:bg-primary selection:text-white">
      {/* Background elements */}
      <div className="fixed top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none z-0"></div>

      {/* Global Store Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border-glass h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <Link href="#" className="font-display font-bold text-[24px] tracking-tight">{store.name}</Link>
          <div className="flex items-center gap-6 text-ink-muted">
            <Search size={24} className="cursor-pointer hover:text-primary transition-colors" />
            <div className="relative">
              <ShoppingBag size={24} className="cursor-pointer hover:text-primary transition-colors" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Store Hero */}
      <section className="relative z-10 pt-48 pb-24 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-border-glass bg-surface-glass text-ink-muted font-bold text-caption mb-8">
            Festive Collection 2026
          </div>
          <h1 className="text-display-lg md:text-hero mb-6">
            Handcrafted luxury. <br />
            <span className="text-gradient-primary">Delivered to you.</span>
          </h1>
          <p className="text-lead text-ink-muted max-w-2xl mx-auto mb-12">
            {store.description}
          </p>
        </div>
      </section>

      {/* Sub Nav / Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
        <div className="glass-card !py-4 !px-6 flex flex-wrap gap-4 justify-center md:justify-start">
          <button className="btn-glow !py-2 !px-6 !text-caption">All Items</button>
          <button className="btn-glass !py-2 !px-6 !text-caption">Sarees</button>
          <button className="btn-glass !py-2 !px-6 !text-caption">Jewelry</button>
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {store.products.map(product => (
            <div key={product.id} className="group flex flex-col h-full bg-surface-glass border border-border-glass rounded-3xl overflow-hidden p-3 relative hover:border-primary/50 transition-colors">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-surface">
                {product.imageUrl && (
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-80" 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <CheckoutButton product={product} storeId={store.id} />
                </div>
              </div>
              <div className="flex flex-col flex-1 px-3 pb-3">
                <h3 className="text-title font-bold mb-1">{product.name}</h3>
                <p className="text-caption text-ink-muted mb-4 line-clamp-2">{product.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <p className="text-lead font-bold text-primary">₹{product.price.toLocaleString()}</p>
                  <div className="w-8 h-8 rounded-full bg-surface border border-border-glass flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {store.products.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <p className="text-lead text-ink-muted">No products available right now.</p>
            </div>
          )}
        </div>
      </main>

      {/* Store Footer */}
      <footer className="mt-32 border-t border-border-glass pt-16 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-caption font-medium text-ink-muted">
          <p>Powered by <Link href="/" className="text-white hover:text-primary transition-colors font-bold">BizBoost.ai</Link></p>
          <div className="flex gap-6 mt-6 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Store Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact via WhatsApp</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
