import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};
import { Plus, Store, IndianRupee, Eye, ExternalLink, Zap } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export default async function DashboardHome() {
  const session = await getSession();
  const storeId = session?.storeId ?? "demo-store-001";

  // Fetch real dynamic data
  let totalSales = 0;
  let totalOrders = 0;
  let totalViews = 0;
  let storePublished = false;

  try {
    const ordersAgg = await prisma.order.aggregate({
      _sum: { total: true },
      _count: { id: true },
      where: { storeId }
    });
    totalSales = ordersAgg._sum.total || 0;
    totalOrders = ordersAgg._count.id || 0;

    totalViews = await prisma.analyticsSession.count({
      where: { storeId }
    });

    const store = await prisma.store.findUnique({
      where: { id: storeId },
      select: { isPublished: true }
    });
    storePublished = store?.isPublished || false;
  } catch (e) {
    // defaults
  }

  return (
    <div className="animate-fade-in" data-track="dashboard-home">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h1 className="text-display-lg mb-2">Welcome Back.</h1>
          <p className="text-lead text-ink-muted">Here’s what’s happening with your store today.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard/products/new" className="btn-glow !py-3 !px-6" data-track="quick-action-add-product">
            <Plus size={18} strokeWidth={3} /> Add Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="glass-card flex flex-col justify-between">
          <div className="flex items-center gap-3 text-ink-muted mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <IndianRupee size={20} />
            </div>
            <h3 className="font-bold">Total Sales</h3>
          </div>
          <div>
            <p className="text-[48px] font-display font-bold leading-none mb-2">₹{totalSales.toLocaleString()}</p>
            <p className="text-caption text-ink-muted font-medium">{totalOrders} orders this month</p>
          </div>
        </div>
        
        <div className="glass-card flex flex-col justify-between">
          <div className="flex items-center gap-3 text-ink-muted mb-6">
             <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Eye size={20} />
            </div>
            <h3 className="font-bold">Store Views</h3>
          </div>
          <div>
            <p className="text-[48px] font-display font-bold leading-none mb-2">{totalViews.toLocaleString()}</p>
            <p className="text-caption text-ink-muted font-medium">Lifetime views</p>
          </div>
        </div>

        <div className="glass-card relative overflow-hidden group border-primary/30 shadow-[0_0_30px_rgba(255,92,0,0.1)]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-0 group-hover:from-primary/20 transition-colors"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center gap-3 text-ink mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,92,0,0.5)]">
                <Store size={20} />
              </div>
              <h3 className="font-bold">Your Storefront</h3>
            </div>
            <div>
              <p className="text-title font-bold mb-4">{storePublished ? "Live & Active" : "Not published yet"}</p>
              <Link href="/dashboard/store" className="btn-glass !py-2 !px-4 w-fit border-primary/50 text-ink hover:bg-primary hover:border-primary hover:text-white">
                {storePublished ? "Manage store" : "Set up store"} <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Guide */}
      <h2 className="text-display-md mb-8">Setup Guide</h2>
      <div className="glass-card !p-0 overflow-hidden">
        <div className="divide-y divide-border-glass">
          <div className="p-8 flex items-start gap-6 bg-surface-glass-hover relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary shadow-[0_0_10px_#FF5C00]"></div>
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold shadow-[0_0_15px_rgba(255,92,0,0.5)]">1</div>
            <div>
              <h4 className="text-title font-bold mb-2">Add your first product</h4>
              <p className="text-body text-ink-muted mb-6">Upload a photo and let our AI write the description and Instagram captions.</p>
              <Link href="/dashboard/products/new" className="btn-glow !text-caption !py-2 !px-6">Add Product</Link>
            </div>
          </div>
          
          <div className="p-8 flex items-start gap-6 bg-surface-glass relative overflow-hidden group hover:bg-surface-glass-hover transition-colors">
            <div className="w-10 h-10 rounded-full border border-border-hover text-ink-muted flex items-center justify-center flex-shrink-0 font-bold bg-background group-hover:text-primary group-hover:border-primary transition-colors">2</div>
            <div>
              <h4 className="text-title font-bold mb-2 text-ink">Customize your store</h4>
              <p className="text-body text-ink-muted mb-4">Add your logo, name, and UPI details.</p>
              <Link href="/dashboard/store" className="btn-glass !text-caption !py-2 !px-6 hover:bg-primary hover:text-white hover:border-primary">Customize Store</Link>
            </div>
          </div>
          
          <div className="p-8 flex items-start gap-6 bg-surface-glass relative overflow-hidden group hover:bg-surface-glass-hover transition-colors">
            <div className="w-10 h-10 rounded-full border border-border-hover text-ink-muted flex items-center justify-center flex-shrink-0 font-bold bg-background group-hover:text-primary group-hover:border-primary transition-colors">3</div>
            <div>
              <h4 className="text-title font-bold mb-2 text-ink">Share on WhatsApp</h4>
              <p className="text-body text-ink-muted mb-4">Generate your first WhatsApp blast and start getting orders.</p>
              <Link href="/dashboard/campaigns" className="btn-glass !text-caption !py-2 !px-6 hover:bg-primary hover:text-white hover:border-primary">View Campaigns</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
