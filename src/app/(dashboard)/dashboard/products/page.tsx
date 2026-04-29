import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Plus, Edit, Trash2, Eye, EyeOff, Package } from "lucide-react";
import ProductActions from "./ProductActions";

export default async function ProductsPage() {
  const session = await getSession();
  if (!session) redirect("/auth/signin");

  const products = await prisma.product.findMany({
    where: { storeId: session.storeId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-display-lg mb-1">Products</h1>
          <p className="text-ink-muted">{products.length} products in your store</p>
        </div>
        <Link href="/dashboard/products/new" className="btn-glow flex items-center gap-2">
          <Plus size={18} /> Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center py-24 text-center border-dashed">
          <Package size={48} className="text-ink-muted mb-6" />
          <h2 className="text-display-md mb-3 text-ink-muted">No products yet</h2>
          <p className="text-ink-muted mb-8">Add your first product and let AI generate the marketing campaign.</p>
          <Link href="/dashboard/products/new" className="btn-glow">Add First Product</Link>
        </div>
      ) : (
        <div className="glass-card !p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-glass bg-surface-glass">
                <th className="text-left px-6 py-4 text-caption font-bold text-ink-muted">Product</th>
                <th className="text-left px-6 py-4 text-caption font-bold text-ink-muted">Category</th>
                <th className="text-left px-6 py-4 text-caption font-bold text-ink-muted">Price</th>
                <th className="text-left px-6 py-4 text-caption font-bold text-ink-muted">Stock</th>
                <th className="text-left px-6 py-4 text-caption font-bold text-ink-muted">Status</th>
                <th className="text-right px-6 py-4 text-caption font-bold text-ink-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-glass">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-glass/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-lg object-cover border border-border-glass" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center border border-border-glass">
                          <Package size={16} className="text-ink-muted" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-[15px]">{product.name}</p>
                        <p className="text-caption text-ink-muted line-clamp-1">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-caption text-ink-muted">{product.category || "—"}</td>
                  <td className="px-6 py-4 font-bold text-primary">₹{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-caption">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-micro-legal font-bold ${product.isActive ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                      {product.isActive ? <><Eye size={12} /> Active</> : <><EyeOff size={12} /> Hidden</>}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <ProductActions productId={product.id} isActive={product.isActive} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
