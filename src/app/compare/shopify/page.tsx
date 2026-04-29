import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

export default function CompareShopify() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2D2D] font-body pt-32 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-block bg-[#FF5C00]/10 text-[#FF5C00] px-4 py-1.5 rounded-full font-bold text-[14px] mb-6">
          BizBoost vs Shopify
        </div>
        <h1 className="text-[48px] md:text-[64px] font-display font-bold tracking-tight mb-6">
          Why pay for complex tools you don't need?
        </h1>
        <p className="text-[18px] text-[#2D2D2D]/70 max-w-2xl mx-auto mb-10">
          Shopify is built for large, complex retail operations. It takes days to set up and requires expensive apps for basic marketing. BizBoost is built for independent Indian creators—it sets up in 30 seconds and has AI marketing built-in.
        </p>
        <Link href="/dashboard" className="inline-flex items-center gap-2 bg-[#FF5C00] text-white font-bold rounded-full px-8 py-4 hover:bg-[#FF5C00]/90 transition-colors shadow-lg shadow-[#FF5C00]/30">
          Start your BizBoost store <ArrowRight size={18} />
        </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-black/10 shadow-xl overflow-hidden mb-32">
        <div className="grid grid-cols-3 bg-gray-50 border-b border-black/10">
          <div className="p-6 font-bold text-gray-500">Features</div>
          <div className="p-6 font-display font-bold text-[20px] text-center border-x border-black/10 bg-white">BizBoost</div>
          <div className="p-6 font-display font-bold text-[20px] text-center text-gray-400">Shopify</div>
        </div>

        {[
          { feature: "Time to set up", us: "30 Seconds", them: "Days or Weeks" },
          { feature: "Base Price", us: "Free Tier Available", them: "₹1,499/mo minimum" },
          { feature: "AI Marketing Built-in", us: true, them: false },
          { feature: "Automated WhatsApp Blasts", us: true, them: false },
          { feature: "Mobile-first for Indian buyers", us: true, them: "Desktop-first" },
          { feature: "Requires paid 3rd party apps", us: false, them: true },
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-3 border-b border-black/5 last:border-0 hover:bg-gray-50 transition-colors">
            <div className="p-6 font-medium text-[#2D2D2D]">{row.feature}</div>
            <div className="p-6 flex items-center justify-center border-x border-black/5 bg-orange-50/30">
              {typeof row.us === "boolean" ? (
                row.us ? <CheckCircle2 className="text-[#FF5C00]" /> : <XCircle className="text-gray-300" />
              ) : (
                <span className="font-bold text-[#FF5C00]">{row.us}</span>
              )}
            </div>
            <div className="p-6 flex items-center justify-center">
              {typeof row.them === "boolean" ? (
                row.them ? <CheckCircle2 className="text-gray-400" /> : <XCircle className="text-gray-300" />
              ) : (
                <span className="font-bold text-gray-500">{row.them}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
