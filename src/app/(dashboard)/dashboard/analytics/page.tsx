"use client";

import { useEffect, useState } from "react";
import { 
  BarChart3, MousePointerClick, Zap, Target, 
  Smartphone, Monitor, Tablet, Activity
} from "lucide-react";
import { 
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

type OverviewData = {
  overview: {
    totalSessions: number;
    totalClicks: number;
    totalRageClicks: number;
    totalPageViews: number;
    rageClickRate: number;
  };
  sessionsByDay: Array<{ day: string; count: number; avg_duration: number }>;
  topPages: Array<{ page: string; views: number }>;
  topElements: Array<{ element: string; text: string | null; clicks: number }>;
  stuckPages: Array<{ page: string; count: number }>;
  funnelSteps: Array<{ step: string; total: number; completed: number; dropoffRate: number }>;
  deviceBreakdown: Array<{ device: string; count: number }>;
};

export default function AnalyticsDashboard() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);

  useEffect(() => {
    fetch(`/api/analytics/overview?days=${days}`)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(console.error);
  }, [days]);

  if (loading || !data) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const overview = data.overview || {
    totalSessions: 0,
    totalClicks: 0,
    totalRageClicks: 0,
    totalPageViews: 0,
    rageClickRate: 0,
  };

  return (
    <div className="animate-fade-in pb-20">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h1 className="text-display-lg mb-2">Live Analytics.</h1>
          <p className="text-lead text-ink-muted">Track user behavior and conversion drop-offs.</p>
        </div>
        <div className="glass-card !p-1 !rounded-xl flex">
          {[7, 14, 30].map(d => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-6 py-2 rounded-lg text-caption font-bold transition-all ${
                days === d ? "bg-primary text-white shadow-[0_0_15px_rgba(255,92,0,0.4)]" : "text-ink-muted hover:text-white"
              }`}
            >
              {d}D
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-card">
          <div className="flex items-center gap-2 text-ink-muted mb-6">
            <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center">
              <Activity size={16} />
            </div>
            <span className="text-caption font-bold">Sessions</span>
          </div>
          <div className="text-[40px] font-display font-bold leading-none">{overview.totalSessions.toLocaleString()}</div>
        </div>
        <div className="glass-card">
          <div className="flex items-center gap-2 text-ink-muted mb-6">
            <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center">
              <MousePointerClick size={16} />
            </div>
            <span className="text-caption font-bold">Page Views</span>
          </div>
          <div className="text-[40px] font-display font-bold leading-none">{overview.totalPageViews.toLocaleString()}</div>
        </div>
        <div className="glass-card">
          <div className="flex items-center gap-2 text-ink-muted mb-6">
            <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center">
              <Target size={16} />
            </div>
            <span className="text-caption font-bold">Clicks</span>
          </div>
          <div className="text-[40px] font-display font-bold leading-none">{overview.totalClicks.toLocaleString()}</div>
        </div>
        <div className="glass-card border-red-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-red-500/5 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-red-400 mb-6">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-500">
                <Zap size={16} />
              </div>
              <span className="text-caption font-bold">Rage Clicks</span>
            </div>
            <div className="flex items-end gap-3">
              <div className="text-[40px] font-display font-bold leading-none text-red-500">{overview.totalRageClicks.toLocaleString()}</div>
              <div className="text-body font-bold text-red-400 mb-1">({overview.rageClickRate}%)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Chart */}
        <div className="md:col-span-2 glass-card">
          <h3 className="text-title font-bold mb-8">Traffic Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.sessionsByDay}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5C00" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FF5C00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tickFormatter={(v) => new Date(v).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})} stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121212', borderColor: '#333', borderRadius: '16px', color: '#fff' }}
                  labelStyle={{ color: '#a1a1aa', fontSize: '12px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#FF5C00', fontSize: '16px', fontWeight: 'bold' }}
                  labelFormatter={(v) => new Date(v).toLocaleDateString()}
                />
                <Area type="monotone" dataKey="count" stroke="#FF5C00" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Devices */}
        <div className="glass-card">
          <h3 className="text-title font-bold mb-8">Devices</h3>
          <div className="space-y-8">
            {data.deviceBreakdown.map(d => {
              const Icon = d.device === "mobile" ? Smartphone : d.device === "tablet" ? Tablet : Monitor;
              const percent = Math.round((d.count / overview.totalSessions) * 100) || 0;
              return (
                <div key={d.device} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-ink-muted border border-border-glass">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="text-body capitalize font-bold">{d.device}</span>
                      <span className="text-body font-bold text-primary">{percent}%</span>
                    </div>
                    <div className="w-full bg-surface rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full shadow-[0_0_10px_rgba(255,92,0,0.5)]" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Funnel */}
        <div className="glass-card">
          <h3 className="text-title font-bold mb-8">Conversion Funnel</h3>
          <div className="space-y-6">
            {data.funnelSteps.map((step, idx) => (
              <div key={step.step} className="relative">
                <div className="flex justify-between text-caption font-bold mb-2">
                  <span className="text-ink">{step.step.replace(/_/g, ' ').toUpperCase()}</span>
                  <span className={step.dropoffRate > 40 ? "text-red-500" : "text-ink-muted"}>
                    {step.dropoffRate}% drop
                  </span>
                </div>
                <div className="w-full bg-surface h-10 rounded-xl overflow-hidden flex relative border border-border-glass">
                   <div 
                    className="h-full bg-blue-500/20 border-r-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                    style={{ width: `${100 - step.dropoffRate}%` }}
                   ></div>
                   <div className="absolute inset-y-0 left-4 flex items-center text-body font-bold">
                     {step.completed} <span className="text-ink-muted ml-1">/ {step.total}</span>
                   </div>
                </div>
              </div>
            ))}
            {data.funnelSteps.length === 0 && <p className="text-caption font-medium text-ink-muted">No funnel data recorded yet.</p>}
          </div>
        </div>

        {/* Top Elements Heatmap text */}
        <div className="glass-card">
          <h3 className="text-title font-bold mb-8">Interaction Heatmap</h3>
          <div className="space-y-0 divide-y divide-border-glass">
            {data.topElements.map((elem, idx) => (
              <div key={idx} className="py-4 flex justify-between items-center group">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded bg-surface flex items-center justify-center text-caption font-bold text-ink-muted">{idx + 1}</div>
                  <div>
                    <div className="text-body font-bold">{elem.text || elem.element}</div>
                    <div className="text-caption text-ink-muted font-mono">{elem.element}</div>
                  </div>
                </div>
                <div className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-caption font-bold border border-primary/30 shadow-[0_0_10px_rgba(255,92,0,0.2)]">
                  {elem.clicks} clicks
                </div>
              </div>
            ))}
            {data.topElements.length === 0 && <p className="text-caption font-medium text-ink-muted py-2">No clicks recorded yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
