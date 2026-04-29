import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Store, ShoppingBag, PieChart, Sparkles, Calendar, Settings, Zap, Users, LogOut, BarChart3 } from "lucide-react";
import SignOutButton from "./SignOutButton";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/signin");
  }

  const storeId = session.storeId ?? "demo-store-001";

  // Safety check: ensure the store exists in the database
  try {
    await prisma.store.upsert({
      where: { id: storeId },
      update: {},
      create: {
        id: storeId,
        name: session.storeName ?? "My Store",
        slug: "store-" + storeId.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      }
    });
  } catch (e) {
    console.error("Failed to ensure store exists:", e);
  }

  let productCount = 0;
  try {
    productCount = await prisma.product.count({ where: { storeId } });
  } catch (e) {
    // DB issue or no products
  }
  const maxProducts = 50;
  const progressPercent = Math.min((productCount / maxProducts) * 100, 100);

  const navItems = [
    { href: "/dashboard", label: "Overview", icon: PieChart },
    { href: "/dashboard/products", label: "Products", icon: ShoppingBag },
    { href: "/dashboard/store", label: "Storefront", icon: Store },
    { href: "/dashboard/creatives", label: "AI Creatives", icon: Sparkles },
    { href: "/dashboard/campaigns", label: "Campaigns", icon: Calendar },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/crm", label: "CRM", icon: Users },
    { href: "/dashboard/pricing", label: "Pricing", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-body text-ink selection:bg-primary selection:text-white">
      {/* Background glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px] pointer-events-none z-0" />

      {/* Global Nav */}
      <nav className="h-16 border-b border-border-glass bg-surface/80 backdrop-blur-md px-6 flex items-center z-20 relative sticky top-0">
        <Link href="/" className="font-display font-bold text-[20px] tracking-tight flex items-center gap-2 mr-8">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,92,0,0.5)]">
            <Zap size={14} className="fill-white" />
          </div>
          BizBoost<span className="text-primary">.ai</span>
        </Link>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="text-caption text-ink-muted font-medium hidden md:block">{session.storeName}</span>
          <Link href="/dashboard/settings" className="text-ink-muted hover:text-white transition-colors">
            <Settings size={20} />
          </Link>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-primary-focus flex items-center justify-center border border-white/20 shadow-[0_0_10px_rgba(255,92,0,0.3)] text-white font-bold text-caption">
            {session.name?.charAt(0)?.toUpperCase() ?? "U"}
          </div>
          <SignOutButton />
        </div>
      </nav>

      <div className="flex flex-1 max-w-[1600px] mx-auto w-full z-10 relative overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border-glass bg-surface-glass backdrop-blur-md flex flex-col sticky top-0 h-[calc(100vh-4rem)] overflow-y-auto hidden lg:flex">
          <div className="p-6 flex-1">
            <h2 className="text-micro-legal text-ink-muted font-bold uppercase tracking-widest mb-6">Menu</h2>
            <nav className="space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-glass-hover text-[15px] font-semibold transition-colors group text-ink-muted hover:text-white"
                >
                  <Icon size={20} className="group-hover:text-primary transition-colors shrink-0" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-6 border-t border-border-glass">
            <div className="bg-surface-glass border border-border-glass rounded-xl p-4 text-center">
              <h3 className="font-bold mb-1 text-[15px]">Growth Plan</h3>
              <p className="text-caption text-ink-muted mb-3">{productCount}/{maxProducts} products used</p>
              <div className="w-full bg-background rounded-full h-1.5 mb-4 border border-border-glass">
                <div className="bg-primary h-1.5 rounded-full shadow-[0_0_10px_rgba(255,92,0,0.5)]" style={{ width: `${progressPercent}%` }} />
              </div>
              <Link href="/dashboard/pricing" className="text-primary font-bold text-caption hover:underline">
                Upgrade Plan →
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-4rem)] p-8 lg:p-12 scroll-smooth">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
