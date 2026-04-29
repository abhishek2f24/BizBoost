"use client";

import { useState } from "react";
import { Upload, Sparkles, AlertCircle, Copy, Check, Camera, MessageCircle, Video, Target, Store } from "lucide-react";

type AIResult = {
  title: string;
  description: string;
  whatsappCaption: string;
  instagramCaption: string;
  reelScript: string;
  facebookAdText: string;
  whatsappStatus: string;
  hashtags: string[];
  festivalBannerPrompt: string;
  price?: number;
};

export default function NewProductPage() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"storefront" | "social" | "scripts" | "ads">("storefront");
  const [aiResult, setAiResult] = useState<AIResult | null>(null);

  // Form State
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Apparel");
  const [productName, setProductName] = useState("");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const generateWithAI = async () => {
    if (!photoPreview) return;
    setIsGenerating(true);
    
    try {
      const res = await fetch("/api/ai/generate-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: productName || "Premium Product",
          price: price,
          category: category
        })
      });
      
      const data = await res.json();
      setAiResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setCopiedStates(prev => ({ ...prev, [id]: false })), 2000);
  };

  return (
    <div className="animate-fade-in pb-24" data-track="new-product-page">
      <div className="mb-12">
        <h1 className="text-display-lg mb-2">Create Campaign</h1>
        <p className="text-lead text-ink-muted">Upload a photo. Let AI build your entire marketing engine.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Upload & Basic Info (Span 4) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-card !p-0 overflow-hidden">
            <div className="p-6 border-b border-border-glass bg-surface-glass">
              <h2 className="text-title font-bold">Product Photo</h2>
            </div>
            <div className="p-6">
              {!photoPreview ? (
                <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-border-glass hover:border-primary rounded-2xl cursor-pointer bg-background transition-all hover:bg-surface-glass group">
                  <div className="flex flex-col items-center justify-center p-6 text-ink-muted text-center">
                    <div className="w-16 h-16 rounded-full bg-surface-glass group-hover:bg-primary/20 flex items-center justify-center mb-6 transition-colors">
                      <Upload className="w-8 h-8 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="mb-2 text-body font-bold text-ink">Upload primary photo</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                </label>
              ) : (
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-border-glass shadow-2xl">
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setPhotoPreview(null)}
                    className="absolute top-4 right-4 bg-background/80 text-white font-bold px-4 py-2 rounded-full backdrop-blur-md hover:bg-background transition-colors border border-border-glass text-caption"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="glass-card !p-0 overflow-hidden">
             <div className="p-6 border-b border-border-glass bg-surface-glass">
                <h2 className="text-title font-bold">Basic Details</h2>
             </div>
             <div className="p-6 space-y-6">
                <div>
                  <label className="block text-caption font-bold text-ink-muted mb-2">Product Name</label>
                  <input type="text" value={productName} onChange={e => setProductName(e.target.value)} className="input-glass" placeholder="e.g. Silk Saree" />
                </div>
                <div>
                  <label className="block text-caption font-bold text-ink-muted mb-2">Price (₹)</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="input-glass" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-caption font-bold text-ink-muted mb-2">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="input-glass bg-background">
                    <option>Apparel</option>
                    <option>Jewelry</option>
                    <option>Electronics</option>
                    <option>Home Decor</option>
                    <option>Food</option>
                  </select>
                </div>
             </div>
          </div>
          
          <button 
            className="btn-glow w-full !py-4 text-[18px] group relative overflow-hidden"
            onClick={generateWithAI}
            disabled={!photoPreview || isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating Magic...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles size={20} /> Generate Everything
              </span>
            )}
          </button>
        </div>

        {/* Right Column: AI Generation Results (Span 8) */}
        <div className="lg:col-span-8 space-y-8">
          {!aiResult ? (
             <div className="h-full min-h-[400px] glass-card flex flex-col items-center justify-center text-center border-dashed">
                <div className="w-20 h-20 rounded-full bg-surface-glass flex items-center justify-center text-ink-muted mb-6">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-display-md mb-4 text-ink-muted">Awaiting Input</h3>
                <p className="text-lead text-ink-muted max-w-md">
                  Upload a photo and fill in the basic details. Our AI will automatically generate your entire marketing campaign in seconds.
                </p>
             </div>
          ) : (
            <div className="glass-card !p-0 overflow-hidden animate-fade-in border-primary/20 shadow-[0_0_30px_rgba(255,92,0,0.1)]">
              {/* Tabs */}
              <div className="flex border-b border-border-glass bg-surface-glass overflow-x-auto hide-scrollbar">
                <button 
                  onClick={() => setActiveTab("storefront")}
                  className={`flex items-center gap-2 px-8 py-5 font-bold transition-colors whitespace-nowrap ${activeTab === 'storefront' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-ink-muted hover:text-white'}`}
                >
                  <Store size={18} /> Storefront SEO
                </button>
                <button 
                  onClick={() => setActiveTab("social")}
                  className={`flex items-center gap-2 px-8 py-5 font-bold transition-colors whitespace-nowrap ${activeTab === 'social' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-ink-muted hover:text-white'}`}
                >
                  <Camera size={18} /> Social & WhatsApp
                </button>
                <button 
                  onClick={() => setActiveTab("scripts")}
                  className={`flex items-center gap-2 px-8 py-5 font-bold transition-colors whitespace-nowrap ${activeTab === 'scripts' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-ink-muted hover:text-white'}`}
                >
                  <Video size={18} /> Video Scripts
                </button>
                <button 
                  onClick={() => setActiveTab("ads")}
                  className={`flex items-center gap-2 px-8 py-5 font-bold transition-colors whitespace-nowrap ${activeTab === 'ads' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-ink-muted hover:text-white'}`}
                >
                  <Target size={18} /> Paid Ads
                </button>
              </div>

              {/* Content Area */}
              <div className="p-8 space-y-8 bg-background">
                {activeTab === "storefront" && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="block text-caption font-bold text-ink-muted mb-2">SEO Optimized Title</label>
                      <input type="text" defaultValue={aiResult.title} className="input-glass font-bold text-[18px] text-white" />
                    </div>
                    <div>
                      <label className="block text-caption font-bold text-ink-muted mb-2">Rich Description</label>
                      <textarea defaultValue={aiResult.description} rows={6} className="input-glass resize-none" />
                    </div>
                  </div>
                )}

                {activeTab === "social" && (
                  <div className="space-y-8 animate-fade-in">
                    {/* WhatsApp Broadcast */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="flex items-center gap-2 text-caption font-bold text-[#25D366]">
                          <MessageCircle size={16} /> WhatsApp Broadcast Message
                        </label>
                        <button onClick={() => handleCopy(aiResult.whatsappCaption, 'wa')} className="text-primary text-caption font-bold flex items-center gap-1 hover:text-white transition-colors">
                          {copiedStates['wa'] ? <Check size={16} /> : <Copy size={16} />} {copiedStates['wa'] ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <div className="bg-[#25D366]/5 p-6 rounded-xl border border-[#25D366]/20 text-body text-white whitespace-pre-wrap font-medium">
                        {aiResult.whatsappCaption}
                      </div>
                    </div>

                    {/* Instagram Caption */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="flex items-center gap-2 text-caption font-bold text-[#E1306C]">
                          <Camera size={16} /> Instagram Post Caption
                        </label>
                        <button onClick={() => handleCopy(aiResult.instagramCaption, 'ig')} className="text-primary text-caption font-bold flex items-center gap-1 hover:text-white transition-colors">
                          {copiedStates['ig'] ? <Check size={16} /> : <Copy size={16} />} {copiedStates['ig'] ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <div className="bg-[#E1306C]/5 p-6 rounded-xl border border-[#E1306C]/20 text-body text-white whitespace-pre-wrap font-medium">
                        {aiResult.instagramCaption}
                      </div>
                    </div>
                    
                    {/* Hashtags */}
                    <div>
                      <label className="block text-caption font-bold text-ink-muted mb-3">Suggested Hashtags</label>
                      <div className="flex flex-wrap gap-2">
                        {aiResult.hashtags.map(tag => (
                          <span key={tag} className="bg-surface-glass border border-border-glass text-ink-muted font-bold text-caption px-4 py-2 rounded-full hover:text-primary transition-colors cursor-pointer">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "scripts" && (
                  <div className="space-y-6 animate-fade-in">
                     <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-caption font-bold text-ink-muted">15-Second Reel Script</label>
                        <button onClick={() => handleCopy(aiResult.reelScript, 'reel')} className="text-primary text-caption font-bold flex items-center gap-1">
                          {copiedStates['reel'] ? <Check size={16} /> : <Copy size={16} />} Copy Script
                        </button>
                      </div>
                      <div className="bg-surface p-6 rounded-xl border border-border-glass text-body text-ink-muted whitespace-pre-wrap font-medium font-mono leading-relaxed">
                        {aiResult.reelScript}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "ads" && (
                  <div className="space-y-6 animate-fade-in">
                     <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-caption font-bold text-ink-muted">Facebook Ad Copy</label>
                        <button onClick={() => handleCopy(aiResult.facebookAdText, 'fb')} className="text-primary text-caption font-bold flex items-center gap-1">
                          {copiedStates['fb'] ? <Check size={16} /> : <Copy size={16} />} Copy Ad Text
                        </button>
                      </div>
                      <div className="bg-[#1877F2]/5 p-6 rounded-xl border border-[#1877F2]/20 text-body text-white whitespace-pre-wrap font-medium">
                        {aiResult.facebookAdText}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-caption font-bold text-ink-muted mb-3">AI Banner Generation Prompt (Midjourney / DALL-E)</label>
                      <div className="bg-surface p-6 rounded-xl border border-border-glass text-caption text-ink-muted whitespace-pre-wrap font-medium italic">
                        {aiResult.festivalBannerPrompt}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-64 right-0 bg-background/80 backdrop-blur-xl border-t border-border-glass p-6 flex justify-end gap-4 z-40">
        <button className="btn-glass !py-3 !px-8 text-ink-muted">Save as Draft</button>
        <button className="btn-glow !py-3 !px-12 text-[18px]">Publish to Store</button>
      </div>
    </div>
  );
}
