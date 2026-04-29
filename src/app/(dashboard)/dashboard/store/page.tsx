"use client";

import { useState, useEffect } from "react";
import { Store, Globe, Phone, CreditCard, Palette, CheckCircle, Copy, ExternalLink, Zap, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const THEMES = [
  { id: "saffron", label: "Neon Saffron", color: "#FF5C00" },
  { id: "emerald", label: "Emerald", color: "#10B981" },
  { id: "royal", label: "Royal Blue", color: "#3B82F6" },
  { id: "gold", label: "Gold", color: "#F59E0B" },
];

export default function StoreSettingsPage() {
  const [storeName, setStoreName] = useState("My BizBoost Store");
  const [storeSlug, setStoreSlug] = useState("my-store");
  const [phone, setPhone] = useState("");
  const [upiId, setUpiId] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("saffron");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [storeUrl, setStoreUrl] = useState("");
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(true);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setStoreUrl(`${window.location.origin}/store/${storeSlug}`);
    
    if (storeSlug.length < 3) {
      setSlugAvailable(null);
      return;
    }

    const checkSlug = async () => {
      setIsCheckingSlug(true);
      try {
        const res = await fetch(`/api/store/check-slug?slug=${storeSlug}`);
        const data = await res.json();
        setSlugAvailable(data.available);
      } catch {
        setSlugAvailable(null);
      } finally {
        setIsCheckingSlug(false);
      }
    };

    const timer = setTimeout(checkSlug, 500);
    return () => clearTimeout(timer);
  }, [storeSlug]);

  const handleSave = async () => {
    setSaved(true);
    toast({
      title: "Store Updated",
      description: "Your storefront settings have been saved successfully.",
    });
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in pb-24">
      <div className="mb-12">
        <h1 className="text-display-lg mb-2">Storefront</h1>
        <p className="text-lead text-ink-muted">Customize your public store page.</p>
      </div>

      {/* Store URL Banner */}
      <div className="glass-card !p-6 mb-8 border-primary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(255,92,0,0.4)]">
            <Globe size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-caption font-bold text-ink-muted mb-1">Your Store URL</p>
            <p className="font-bold text-[18px] text-white">{storeUrl}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleCopy} className="btn-glass !py-2 !px-4 text-caption">
              {copied ? <CheckCircle size={16} className="text-green-400" /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <a href={storeUrl} target="_blank" className="btn-glow !py-2 !px-4 text-caption">
              <ExternalLink size={16} /> Visit Store
            </a>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="glass-card !p-0 overflow-hidden">
          <div className="p-6 border-b border-border-glass bg-surface-glass flex items-center gap-3">
            <Store size={20} className="text-primary" />
            <h2 className="text-title font-bold">Store Details</h2>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-2">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="input-glass"
                placeholder="My Awesome Store"
              />
            </div>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-2">Store URL Slug</label>
              <div className={`flex items-center input-glass gap-2 !py-0 !px-0 overflow-hidden ${slugAvailable === false ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : ''}`}>
                <span className="bg-surface px-4 py-3 text-ink-muted text-caption font-mono border-r border-border-glass whitespace-nowrap">/store/</span>
                <input
                  type="text"
                  value={storeSlug}
                  onChange={(e) => setStoreSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                  className="bg-transparent outline-none flex-1 px-3 py-3"
                  placeholder="my-store"
                />
                {isCheckingSlug && <div className="w-4 h-4 mr-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>}
              </div>
              {slugAvailable === false && (
                <p className="text-[12px] text-red-500 mt-2 font-bold flex items-center gap-1">
                  <AlertCircle size={12} /> This URL is already taken.
                </p>
              )}
            </div>
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-2">WhatsApp Number</label>
              <div className="flex items-center input-glass gap-2 !py-0 !px-0 overflow-hidden">
                <span className="bg-surface px-4 py-3 text-ink-muted text-caption font-mono border-r border-border-glass">+91</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-transparent outline-none flex-1 px-3 py-3"
                  placeholder="9876543210"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="glass-card !p-0 overflow-hidden">
          <div className="p-6 border-b border-border-glass bg-surface-glass flex items-center gap-3">
            <CreditCard size={20} className="text-primary" />
            <h2 className="text-title font-bold">Payments</h2>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-caption font-bold text-ink-muted mb-2">UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="input-glass"
                placeholder="yourname@upi"
              />
              <p className="text-[12px] text-ink-muted mt-2">Customers can pay directly via UPI/PhonePe/GPay</p>
            </div>

            <div className="glass-card !p-4 !rounded-xl bg-[#25D366]/5 border-[#25D366]/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 flex items-center justify-center">
                  <Phone size={16} className="text-[#25D366]" />
                </div>
                <span className="font-bold text-[#25D366] text-caption">Cash on Delivery</span>
              </div>
              <p className="text-caption text-ink-muted">COD is enabled by default. Customers can order and pay on delivery.</p>
            </div>

            <div className="glass-card !p-4 !rounded-xl bg-surface-glass">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Zap size={16} className="text-primary" />
                </div>
                <span className="font-bold text-primary text-caption">Razorpay (Coming Soon)</span>
              </div>
              <p className="text-caption text-ink-muted">Enable card & net banking payments. Upgrade to Pro.</p>
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className="glass-card !p-0 overflow-hidden lg:col-span-2">
          <div className="p-6 border-b border-border-glass bg-surface-glass flex items-center gap-3">
            <Palette size={20} className="text-primary" />
            <h2 className="text-title font-bold">Store Theme</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${selectedTheme === theme.id ? "border-white/50 scale-105" : "border-border-glass hover:border-border-hover"}`}
                >
                  <div className="w-12 h-12 rounded-full shadow-lg" style={{ backgroundColor: theme.color, boxShadow: `0 0 20px ${theme.color}60` }} />
                  <span className="text-caption font-bold">{theme.label}</span>
                  {selectedTheme === theme.id && <CheckCircle size={16} className="text-white" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Bar */}
      <div className="fixed bottom-0 left-64 right-0 bg-background/80 backdrop-blur-xl border-t border-border-glass p-6 flex justify-end gap-4 z-40">
        <button 
          onClick={handleSave} 
          className="btn-glow !py-3 !px-12 text-[16px]"
          disabled={slugAvailable === false || storeSlug.length < 3}
        >
          {saved ? <><CheckCircle size={18} /> Saved!</> : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
