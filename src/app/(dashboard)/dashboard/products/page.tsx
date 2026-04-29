import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
};
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { Plus, ShoppingBag, Eye, Edit, Sparkles } from "lucide-react";

export default async function ProductsPage() {
  const session = await getSession();
  const storeId = session?.storeId ?? "demo-store-001";

  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where: { storeId },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB not seeded yet — show empty state
  }

  return (
    <div className="animate-fade-in pb-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h1 className="text-display-lg mb-2">Products</h1>
          <p className="text-lead text-ink-muted">
            {products.length} product{products.length !== 1 ? "s" : ""} in your store
          </p>
        </div>
        <Link href="/dashboard/products/new" className="btn-glow !py-3 !px-6">
          <Plus size={18} strokeWidth={3} /> Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="glass-card min-h-[400px] flex flex-col items-center justify-center text-center border-dashed">
          <div className="w-20 h-20 rounded-full bg-surface-glass flex items-center justify-center text-ink-muted mb-6">
            <ShoppingBag size={36} />
          </div>
          <h3 className="text-display-md text-ink-muted mb-4">No products yet</h3>
          <p className="text-lead text-ink-muted max-w-md mb-8">
            Add your first product and let AI generate the entire marketing campaign for you.
          </p>
          <Link href="/dashboard/products/new" className="btn-glow !py-3 !px-8">
            <Sparkles size={18} /> Add First Product
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="glass-card !p-0 overflow-hidden group">
              <div className="aspect-square bg-surface-glass relative overflow-hidden">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink-muted">
                    <ShoppingBag size={48} />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${p.isActive ? "bg-green-500/20 border-green-500/30 text-green-400" : "bg-surface-glass border-border-glass text-ink-muted"}`}>
                    {p.isActive ? "Active" : "Draft"}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[16px] mb-1 truncate">{p.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[22px] font-display font-bold text-primary">₹{p.price.toLocaleString()}</span>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/products/${p.id}/edit`} className="btn-glass !py-2 !px-4 text-caption">
                      <Edit size={14} /> Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
