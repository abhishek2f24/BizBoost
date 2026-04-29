"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function CheckoutButton({ product, storeId }: { product: any, storeId: string }) {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          storeId,
          customerDetails: formData
        })
      });
      const data = await res.json();
      
      if (data.success) {
        alert("Order placed successfully! Order ID: " + data.orderId);
        setShowForm(false);
      } else {
        alert("Checkout failed: " + data.error);
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (showForm) {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-surface-glass border border-border-glass rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500"></div>
          <h2 className="text-display-md mb-2">Checkout</h2>
          <p className="text-body text-ink-muted mb-8">You are buying <b>{product.name}</b> for ₹{product.price}</p>
          
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="text-caption font-bold text-ink-muted mb-1 block">Full Name</label>
              <input required type="text" className="input-glass w-full" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="text-caption font-bold text-ink-muted mb-1 block">Phone Number (WhatsApp)</label>
              <input required type="tel" className="input-glass w-full" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div>
              <label className="text-caption font-bold text-ink-muted mb-1 block">Delivery Address</label>
              <textarea required className="input-glass w-full resize-none" rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
            
            <div className="pt-4 flex gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="btn-glass flex-1 !py-3">Cancel</button>
              <button type="submit" disabled={loading} className="btn-glow flex-1 !py-3">
                {loading ? <Loader2 className="animate-spin mx-auto" /> : "Place COD Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <button onClick={() => setShowForm(true)} className="btn-glow w-full !py-3 !text-[16px]">
      Buy Now
    </button>
  );
}
