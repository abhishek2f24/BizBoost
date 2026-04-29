import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Campaigns",
};
import { getSession } from "@/lib/session";
import { Calendar, Plus, Rocket, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { CampaignButton, NewCampaignButton } from "./CampaignClientComponents";

const FESTIVALS = [
  { name: "Diwali", date: "Oct 20", daysLeft: 174, color: "#F59E0B" },
  { name: "Holi", date: "Mar 14", daysLeft: 319, color: "#EC4899" },
  { name: "Navratri", date: "Oct 2", daysLeft: 156, color: "#8B5CF6" },
  { name: "Eid", date: "Mar 31", daysLeft: 336, color: "#10B981" },
  { name: "Christmas", date: "Dec 25", daysLeft: 240, color: "#EF4444" },
  { name: "New Year", date: "Jan 1", daysLeft: 247, color: "#3B82F6" },
];

export default async function CampaignsPage() {
  const session = await getSession();
  const storeId = session?.storeId ?? "demo-store-001";

  let campaigns: any[] = [];
  try {
    campaigns = await prisma.campaign.findMany({
      where: { storeId },
      orderBy: { scheduledAt: "asc" },
    });
  } catch {
    // empty
  }

  return (
    <div className="animate-fade-in pb-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h1 className="text-display-lg mb-2">Campaigns</h1>
          <p className="text-lead text-ink-muted">Festival marketing calendar & automated campaigns.</p>
        </div>
        <NewCampaignButton />
      </div>

      {/* Festival Calendar */}
      <h2 className="text-display-md mb-6">Upcoming Festivals</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
        {FESTIVALS.map((f) => (
          <div key={f.name} className="glass-card !p-5 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition-opacity" style={{ backgroundColor: f.color }} />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[20px] font-display font-bold">{f.name}</p>
                  <p className="text-caption text-ink-muted">{f.date}</p>
                </div>
                <span className="text-caption font-bold px-3 py-1 rounded-full border" style={{ color: f.color, borderColor: `${f.color}40`, backgroundColor: `${f.color}15` }}>
                  {f.daysLeft}d
                </span>
              </div>
              <CampaignButton festival={f.name} />
            </div>
          </div>
        ))}
      </div>

      {/* Active Campaigns */}
      <h2 className="text-display-md mb-6">Your Campaigns</h2>
      {campaigns.length === 0 ? (
        <div className="glass-card min-h-[200px] flex flex-col items-center justify-center text-center border-dashed">
          <Calendar size={40} className="text-ink-muted mb-4" />
          <p className="text-lead text-ink-muted">No campaigns yet. Click a festival above to generate one!</p>
        </div>
      ) : (
        <div className="glass-card !p-0 overflow-hidden">
          <div className="divide-y divide-border-glass">
            {campaigns.map((c) => (
              <div key={c.id} className="p-6 flex items-center justify-between hover:bg-surface-glass transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[16px] mb-1">{c.name}</h4>
                    <p className="text-caption text-ink-muted">{c.festival} • {new Date(c.scheduledAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${c.status === "SENT" ? "bg-green-500/20 border-green-500/30 text-green-400" : "bg-primary/20 border-primary/30 text-primary"}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
