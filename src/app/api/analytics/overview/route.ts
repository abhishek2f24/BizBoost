import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const storeId = session.storeId;

    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get("days") || "7");
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);


    const [
      totalSessions,
      totalClicks,
      totalRageClicks,
      totalPageViews,
      topPages,
      topElements,
      stuckPages,
      funnelData,
      deviceBreakdown,
      sessionsByDay,
    ] = await Promise.all([
      // Total sessions
      prisma.analyticsSession.count({ where: { storeId, startedAt: { gte: since } } }),

      // Total clicks
      prisma.analyticsEvent.count({
        where: { storeId, event: "click", createdAt: { gte: since } },
      }),

      // Rage clicks
      prisma.analyticsEvent.count({
        where: { storeId, event: "rage_click", createdAt: { gte: since } },
      }),

      // Page views
      prisma.analyticsEvent.count({
        where: { storeId, event: "pageview", createdAt: { gte: since } },
      }),

      // Top pages by views
      prisma.analyticsEvent.groupBy({
        by: ["page"],
        where: { storeId, event: "pageview", createdAt: { gte: since } },
        _count: { page: true },
        orderBy: { _count: { page: "desc" } },
        take: 10,
      }),

      // Most clicked elements
      prisma.analyticsEvent.groupBy({
        by: ["element", "elementText"],
        where: { storeId, event: "click", createdAt: { gte: since }, element: { not: null } },
        _count: { element: true },
        orderBy: { _count: { element: "desc" } },
        take: 15,
      }),

      // Pages where users get stuck
      prisma.analyticsEvent.groupBy({
        by: ["page"],
        where: { storeId, event: "user_stuck", createdAt: { gte: since } },
        _count: { page: true },
        orderBy: { _count: { page: "desc" } },
        take: 5,
      }),

      // Funnel completion rates
      prisma.funnelStep.groupBy({
        by: ["step", "completed"],
        where: { createdAt: { gte: since } },
        _count: { step: true },
      }),

      // Device breakdown
      prisma.analyticsSession.groupBy({
        by: ["device"],
        where: { storeId, startedAt: { gte: since } },
        _count: { device: true },
      }),

      // Sessions by day
      prisma.analyticsSession.findMany({
        where: { storeId, startedAt: { gte: since } },
        select: { startedAt: true, duration: true }
      })
    ]);

    // Aggregate sessionsByDay in memory (database agnostic)
    const sessionsByDayMap: Record<string, { count: number; totalDuration: number }> = {};
    for (const session of sessionsByDay) {
      const day = session.startedAt.toISOString().split('T')[0];
      if (!sessionsByDayMap[day]) sessionsByDayMap[day] = { count: 0, totalDuration: 0 };
      sessionsByDayMap[day].count += 1;
      sessionsByDayMap[day].totalDuration += session.duration || 0;
    }
    const processedSessionsByDay = Object.entries(sessionsByDayMap).map(([day, data]) => ({
      day,
      count: data.count,
      avg_duration: Math.round(data.totalDuration / data.count)
    })).sort((a, b) => a.day.localeCompare(b.day));

    // Process funnel data
    const funnelMap: Record<string, { total: number; completed: number }> = {};
    funnelData.forEach((item: { step: string; completed: boolean; _count: { step: number } }) => {
      const step = item.step;
      if (!funnelMap[step]) funnelMap[step] = { total: 0, completed: 0 };
      funnelMap[step].total += item._count.step;
      if (item.completed) funnelMap[step].completed += item._count.step;
    });

    const funnelSteps = Object.entries(funnelMap).map(([step, data]) => ({
      step,
      total: data.total,
      completed: data.completed,
      dropoffRate: data.total > 0 ? Math.round(((data.total - data.completed) / data.total) * 100) : 0,
    }));

    type PageGroup = { page: string; _count: { page: number } };
    type ElemGroup = { element: string | null; elementText: string | null; _count: { element: number } };
    type DevGroup = { device: string | null; _count: { device: number } };

    return NextResponse.json({
      overview: {
        totalSessions,
        totalClicks,
        totalRageClicks,
        totalPageViews,
        rageClickRate: totalClicks > 0 ? Math.round((totalRageClicks / totalClicks) * 100) : 0,
      },
      topPages: (topPages as PageGroup[]).map((p) => ({ page: p.page, views: p._count.page })),
      topElements: (topElements as ElemGroup[]).map((e) => ({
        element: e.element,
        text: e.elementText,
        clicks: e._count.element,
      })),
      stuckPages: (stuckPages as PageGroup[]).map((p) => ({ page: p.page, count: p._count.page })),
      funnelSteps,
      deviceBreakdown: (deviceBreakdown as DevGroup[]).map((d) => ({
        device: d.device || "unknown",
        count: d._count.device,
      })),
      sessionsByDay: processedSessionsByDay,
    });
  } catch (error) {
    console.error("[analytics/overview]", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
