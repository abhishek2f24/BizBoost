"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Save, ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/products/${resolvedParams.id}`)
      .then(r => r.json())
      .then(d => { setProduct(d); setLoading(false); })
      .catch(() => { toast({ title: "Error", description: "Product not found", variant: "destructive" }); router.push("/dashboard/products"); });
  }, [resolvedParams.id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/products/upload-image", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) setProduct((p: any) => ({ ...p, imageUrl: data.url }));
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/products/${resolvedParams.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    setSaving(false);
    if (res.ok) {
      toast({ title: "Saved!", description: "Product updated successfully." });
      router.push("/dashboard/products");
    } else {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    }
  };

  if (loading) return <div className="animate-pulse text-ink-muted">Loading...</div>;
  if (!product) return null;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/dashboard/products" className="text-ink-muted hover:text-white transition-colors"><ArrowLeft size={20} /></Link>
        <div>
          <h1 className="text-display-lg">Edit Product</h1>
          <p className="text-ink-muted">{product.name}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card">
            <h2 className="text-title font-bold mb-4">Product Image</h2>
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="w-full aspect-square object-cover rounded-xl mb-4 border border-border-glass" />
            )}
            <label className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-border-glass rounded-xl cursor-pointer hover:border-primary transition-colors text-ink-muted hover:text-primary">
              {uploading ? "Uploading..." : <><Upload size={16} /> Upload Image</>}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
            </label>
          </div>
          <div className="glass-card space-y-4">
            <h2 className="text-title font-bold">Pricing & Stock</h2>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-1">Price (₹)</label>
              <input type="number" className="input-glass" value={product.price} onChange={e => setProduct((p: any) => ({ ...p, price: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-1">Compare Price (₹)</label>
              <input type="number" className="input-glass" value={product.comparePrice || ""} onChange={e => setProduct((p: any) => ({ ...p, comparePrice: e.target.value }))} />
            </div>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-1">Stock Quantity</label>
              <input type="number" className="input-glass" value={product.stock} onChange={e => setProduct((p: any) => ({ ...p, stock: parseInt(e.target.value) }))} />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card space-y-4">
            <h2 className="text-title font-bold">Basic Details</h2>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-1">Product Name</label>
              <input type="text" className="input-glass" value={product.name} onChange={e => setProduct((p: any) => ({ ...p, name: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-1">Category</label>
              <select className="input-glass bg-background" value={product.category || ""} onChange={e => setProduct((p: any) => ({ ...p, category: e.target.value }))}>
                <option value="">Select Category</option>
                <option>Apparel</option><option>Jewelry</option><option>Electronics</option>
                <option>Home Decor</option><option>Food</option><option>Beauty</option>
                <option>Sports</option><option>Books</option><option>Toys</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-1">Description</label>
              <textarea className="input-glass resize-none" rows={5} value={product.description || ""} onChange={e => setProduct((p: any) => ({ ...p, description: e.target.value }))} />
            </div>
          </div>

          <div className="glass-card space-y-4">
            <h2 className="text-title font-bold">AI Marketing Content</h2>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-1">WhatsApp Caption</label>
              <textarea className="input-glass resize-none" rows={3} value={product.whatsappCaption || ""} onChange={e => setProduct((p: any) => ({ ...p, whatsappCaption: e.target.value }))} />
            </div>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-1">Instagram Caption</label>
              <textarea className="input-glass resize-none" rows={3} value={product.instagramCaption || ""} onChange={e => setProduct((p: any) => ({ ...p, instagramCaption: e.target.value }))} />
            </div>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-1">Meta Ad Headline</label>
              <input type="text" className="input-glass" value={product.metaAdHeadline || ""} onChange={e => setProduct((p: any) => ({ ...p, metaAdHeadline: e.target.value }))} />
            </div>
          </div>

          <button type="submit" disabled={saving} className="btn-glow w-full !py-4 flex items-center justify-center gap-2">
            <Save size={18} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
