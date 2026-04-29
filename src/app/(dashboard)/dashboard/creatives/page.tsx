import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "AI Creatives",
};
import { getSession } from "@/lib/session";
import { Sparkles, Copy, Camera, MessageCircle, Globe, Download } from "lucide-react";
import Link from "next/link";

const PLATFORM_CONFIG: Record<string, { color: string; Icon: any; label: string }> = {
  instagram: { color: "#E1306C", Icon: Camera, label: "Instagram" },
  whatsapp: { color: "#25D366", Icon: MessageCircle, label: "WhatsApp" },
  facebook: { color: "#1877F2", Icon: Globe, label: "Facebook" },
};

export default async function CreativesPage() {
  const session = await getSession();
  const storeId = session?.storeId ?? "demo-store-001";

  let creatives: any[] = [];
  try {
    creatives = await prisma.aICreative.findMany({
      where: { storeId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  } catch {
    // empty
  }

  return (
    <div className="animate-fade-in pb-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h1 className="text-display-lg mb-2">AI Creatives</h1>
          <p className="text-lead text-ink-muted">
            {creatives.length} creative{creatives.length !== 1 ? "s" : ""} generated
          </p>
        </div>
        <Link href="/dashboard/products/new" className="btn-glow !py-3 !px-6">
          <Sparkles size={18} /> Generate from Product
        </Link>
      </div>

      {creatives.length === 0 ? (
        <div className="glass-card min-h-[400px] flex flex-col items-center justify-center text-center border-dashed">
          <div className="w-20 h-20 rounded-full bg-surface-glass flex items-center justify-center text-ink-muted mb-6">
            <Sparkles size={36} />
          </div>
          <h3 className="text-display-md text-ink-muted mb-4">No creatives yet</h3>
          <p className="text-lead text-ink-muted max-w-md mb-8">
            Add a product and let AI generate Instagram captions, WhatsApp messages, and Facebook ads.
          </p>
          <Link href="/dashboard/products/new" className="btn-glow !py-3 !px-8">
            <Sparkles size={18} /> Add Product to Generate
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creatives.map((c) => {
            const platform = PLATFORM_CONFIG[c.platform?.toLowerCase()] ?? PLATFORM_CONFIG.instagram;
            return (
              <div key={c.id} className="glass-card !p-0 overflow-hidden group">
                {c.imageUrl && (
                  <div className="aspect-square relative overflow-hidden bg-surface-glass">
                    <img src={c.imageUrl} alt="Creative" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <platform.Icon size={18} style={{ color: platform.color }} />
                      <span className="text-caption font-bold" style={{ color: platform.color }}>{platform.label}</span>
                    </div>
                    <span className="text-[11px] text-ink-muted">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  {c.caption && (
                    <p className="text-caption text-ink-muted line-clamp-3 mb-4">{c.caption}</p>
                  )}
                  <div className="flex gap-2">
                    <button className="btn-glass !py-2 !px-3 text-[12px] flex-1">
                      <Copy size={13} /> Copy
                    </button>
                    {c.imageUrl && (
                      <a href={c.imageUrl} download className="btn-glass !py-2 !px-3 text-[12px]">
                        <Download size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
