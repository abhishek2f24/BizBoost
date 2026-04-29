"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Save, Upload, ExternalLink, Store } from "lucide-react";

export default function StorefrontSettingsPage() {
  const { toast } = useToast();
  const [store, setStore] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/store").then(r => r.json()).then(d => { setStore(d); setLoading(false); });
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/products/upload-image", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) setStore((s: any) => ({ ...s, logo: data.url }));
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/store", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(store),
    });
    setSaving(false);
    if (res.ok) {
      toast({ title: "Saved!", description: "Store settings updated." });
    } else {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    }
  };

  if (loading) return <div className="animate-pulse text-ink-muted">Loading store settings...</div>;
  if (!store) return <div className="text-red-400">Store not found.</div>;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-display-lg mb-1">Storefront Settings</h1>
          <p className="text-ink-muted">Customize your public-facing store</p>
        </div>
        <a
          href={`/store/${store.slug}`}
          target="_blank"
          className="btn-glass flex items-center gap-2 text-primary"
        >
          <ExternalLink size={16} /> Preview Store
        </a>
      </div>

      <form onSubmit={handleSave} className="grid lg:grid-cols-3 gap-8">
        {/* Logo & Branding */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card">
            <h2 className="text-title font-bold mb-4">Store Logo</h2>
            {store.logo ? (
              <img src={store.logo} alt="Logo" className="w-32 h-32 rounded-2xl object-cover border border-border-glass mb-4 mx-auto" />
            ) : (
              <div className="w-32 h-32 rounded-2xl bg-surface border border-border-glass flex items-center justify-center mx-auto mb-4">
                <Store size={32} className="text-ink-muted" />
              </div>
            )}
            <label className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-border-glass rounded-xl cursor-pointer hover:border-primary transition-colors text-ink-muted hover:text-primary text-caption font-bold">
              {uploading ? "Uploading..." : <><Upload size={16} /> Upload Logo</>}
              <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} disabled={uploading} />
            </label>
          </div>

          <div className="glass-card">
            <h2 className="text-title font-bold mb-4">Store URL</h2>
            <div className="bg-surface rounded-xl p-4 border border-border-glass font-mono text-caption text-ink-muted break-all">
              /store/<span className="text-primary font-bold">{store.slug}</span>
            </div>
            <p className="text-micro-legal text-ink-muted mt-2">Slug is fixed. Share this link with customers.</p>
          </div>
        </div>

        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card space-y-5">
            <h2 className="text-title font-bold">Store Details</h2>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-1">Store Name</label>
              <input className="input-glass" value={store.name} onChange={e => setStore((s: any) => ({ ...s, name: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-1">Description</label>
              <textarea className="input-glass resize-none" rows={4} value={store.description || ""} onChange={e => setStore((s: any) => ({ ...s, description: e.target.value }))} placeholder="Tell customers about your store..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-caption font-bold text-ink-muted mb-1">WhatsApp / Phone</label>
                <input className="input-glass" value={store.phone || ""} onChange={e => setStore((s: any) => ({ ...s, phone: e.target.value }))} placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-caption font-bold text-ink-muted mb-1">UPI ID (for payments)</label>
                <input className="input-glass" value={store.upiId || ""} onChange={e => setStore((s: any) => ({ ...s, upiId: e.target.value }))} placeholder="yourname@upi" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={saving} className="btn-glow w-full !py-4 flex items-center justify-center gap-2">
            <Save size={18} /> {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
