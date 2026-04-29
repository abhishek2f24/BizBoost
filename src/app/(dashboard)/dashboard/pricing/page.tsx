"use client";

import { CheckCircle2, Zap, Sparkles } from "lucide-react";
import { useState } from "react";
import Script from "next/script";
import { useToast } from "@/components/ui/use-toast";

export default function PricingPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async (planId: "starter" | "pro") => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const order = await res.json();

      if (order.error) {
        throw new Error(order.error);
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mock_key",
        amount: order.amount,
        currency: order.currency,
        name: "BizBoost.ai",
        description: `Upgrade to ${planId === "pro" ? "Pro" : "Starter"} Plan`,
        order_id: order.id,
        handler: function (response: any) {
          toast({
            title: "Payment Successful!",
            description: "Your account has been upgraded.",
          });
        },
        prefill: {
          name: "Indie Maker",
          email: "maker@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#FF5C00",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        toast({
          title: "Payment Failed",
          description: response.error.description,
          variant: "destructive"
        });
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Could not initiate checkout. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="animate-fade-in pb-24 max-w-5xl mx-auto">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold text-caption mb-6">
          <Zap size={16} className="fill-primary" />
          BizBoost Premium
        </div>
        <h1 className="text-display-lg mb-4">Scale your sales with AI</h1>
        <p className="text-lead text-ink-muted max-w-2xl mx-auto">
          Start your 7-day free trial. Upgrade to unlock unlimited AI creatives, automated campaigns, and your own storefront.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Starter */}
        <div className="glass-card flex flex-col relative overflow-hidden group">
          <div className="p-8">
            <h3 className="font-display font-bold text-[24px] mb-2">Starter</h3>
            <p className="text-caption text-ink-muted mb-6">Perfect for new sellers getting started.</p>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-[48px] font-display font-bold">₹1,999</span>
              <span className="text-ink-muted">/month</span>
            </div>
            
            <div className="space-y-4 mb-8">
              {[
                "Up to 10 Products",
                "Basic Storefront (BizBoost domain)",
                "WhatsApp Order Forms",
                "10 AI Creatives per month",
                "Standard Email Support"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-ink-muted" />
                  <span className="text-ink-muted">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleCheckout("starter")}
              disabled={isProcessing}
              className="btn-glass w-full !py-4 mt-auto hover:bg-surface-glass transition-colors disabled:opacity-50"
            >
              Start 7-Day Free Trial
            </button>
          </div>
        </div>

        {/* Pro */}
        <div className="glass-card flex flex-col relative overflow-hidden border-primary/50 shadow-[0_0_50px_rgba(255,92,0,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-bl-xl">
            Most Popular
          </div>
          
          <div className="p-8 relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-display font-bold text-[24px] text-white">Pro</h3>
              <Sparkles size={18} className="text-primary" />
            </div>
            <p className="text-caption text-ink-muted mb-6">For sellers ready to scale their business.</p>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-[48px] font-display font-bold text-white">₹9,999</span>
              <span className="text-ink-muted">/month</span>
            </div>
            
            <div className="space-y-4 mb-8">
              {[
                "Unlimited Products",
                "Custom Domain (yourstore.com)",
                "Razorpay & Credit Card Payments",
                "Unlimited AI Creatives & Scripts",
                "Automated Festival Campaigns",
                "Priority WhatsApp Support"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-primary" />
                  <span className="text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleCheckout("pro")}
              disabled={isProcessing}
              className="btn-glow w-full !py-4 mt-auto disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Start 7-Day Free Trial"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
