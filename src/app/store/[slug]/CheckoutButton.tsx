"use client";

import { useState } from "react";
import { ShoppingBag, X, User, Phone, MapPin, CreditCard, Truck } from "lucide-react";

declare global {
  interface Window { Razorpay: any; }
}

export default function CheckoutButton({ product, storeId }: { product: any; storeId: string }) {
  const [open, setOpen] = useState(false);
  const [paymentMode, setPaymentMode] = useState<"cod" | "online">("cod");
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [quantity, setQuantity] = useState(1);

  const loadRazorpay = () => new Promise<void>(resolve => {
    if (window.Razorpay) { resolve(); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve();
    document.head.appendChild(s);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (paymentMode === "online") {
        await loadRazorpay();
        const orderRes = await fetch("/api/payments/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: product.price * quantity, productName: product.name, storeId }),
        });
        const orderData = await orderRes.json();

        new window.Razorpay({
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          order_id: orderData.orderId,
          name: product.name,
          description: `Purchase from store`,
          prefill: { name: form.name, contact: form.phone, email: form.email },
          handler: async (response: any) => {
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                productId: product.id,
                storeId,
                quantity,
                customerName: form.name,
                customerPhone: form.phone,
                customerEmail: form.email,
                address: form.address,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setSuccess(verifyData.orderNumber);
            }
          },
          modal: { ondismiss: () => setLoading(false) },
        }).open();
      } else {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product.id,
            storeId,
            quantity,
            customerDetails: form,
          }),
        });
        const data = await res.json();
        if (data.success) setSuccess(data.orderId);
        else throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
        <p className="text-green-400 font-bold text-caption">✅ Order Placed!</p>
        <p className="text-micro-legal text-ink-muted mt-1">#{success}</p>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-primary hover:bg-primary-focus text-white font-bold text-caption py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingBag size={16} /> Buy Now
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && setOpen(false)}>
          <div className="bg-surface border border-border-glass rounded-3xl p-8 w-full max-w-md relative shadow-2xl">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-ink-muted hover:text-white">
              <X size={20} />
            </button>
            <h2 className="text-display-sm font-bold mb-2">{product.name}</h2>
            <p className="text-primary font-bold text-lead mb-6">₹{(product.price * quantity).toLocaleString()}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-caption text-ink-muted font-bold">Qty:</span>
                <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-lg bg-surface-glass border border-border-glass font-bold">-</button>
                <span className="font-bold">{quantity}</span>
                <button type="button" onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 rounded-lg bg-surface-glass border border-border-glass font-bold">+</button>
              </div>

              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input required className="input-glass !pl-10" placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input required className="input-glass !pl-10" placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div className="relative">
                <MapPin size={16} className="absolute left-4 top-3 text-ink-muted" />
                <textarea className="input-glass !pl-10 resize-none" placeholder="Delivery Address" rows={2} value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
              </div>

              {/* Payment mode */}
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setPaymentMode("cod")} className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-caption transition-all ${paymentMode === "cod" ? "border-primary bg-primary/10 text-primary" : "border-border-glass text-ink-muted"}`}>
                  <Truck size={16} /> Cash on Delivery
                </button>
                <button type="button" onClick={() => setPaymentMode("online")} className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-caption transition-all ${paymentMode === "online" ? "border-primary bg-primary/10 text-primary" : "border-border-glass text-ink-muted"}`}>
                  <CreditCard size={16} /> Pay Online
                </button>
              </div>

              <button type="submit" disabled={loading} className="btn-glow w-full !py-4">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" /> : paymentMode === "online" ? "Pay Now" : "Place Order (COD)"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
