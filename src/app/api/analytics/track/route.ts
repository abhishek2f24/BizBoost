import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, events, userAgent, storeId } = body;

    if (!sessionId || !events?.length) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const headersList = await headers();
    const page = events[0]?.page || "/";

    // Upsert session
    await prisma.analyticsSession.upsert({
      where: { sessionId },
      update: {
        clickCount: {
          increment: events.filter((e: { event: string }) => e.event === "click").length,
        },
        rageClicks: {
          increment: events.filter((e: { event: string }) => e.event === "rage_click").length,
        },
        pageViews: {
          increment: events.filter((e: { event: string }) => e.event === "pageview").length,
        },
      },
      create: {
        sessionId,
        startPage: page,
        storeId: storeId || null,
        browser: parseBrowser(userAgent),
        device: parseDevice(userAgent),
      },
    });

    // Batch insert events
    await prisma.analyticsEvent.createMany({
      data: events.map((e: {
        event: string;
        page: string;
        element?: string;
        elementText?: string;
        x?: number;
        y?: number;
        scrollDepth?: number;
        duration?: number;
        metadata?: Record<string, unknown>;
      }) => ({
        sessionId,
        storeId: storeId || null,
        event: e.event,
        page: e.page,
        element: e.element,
        elementText: e.elementText,
        x: e.x,
        y: e.y,
        scrollDepth: e.scrollDepth,
        duration: e.duration,
        metadata: e.metadata ? JSON.stringify(e.metadata) : null,
        userAgent,
      })),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[analytics/track]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

function parseBrowser(ua: string = ""): string {
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Edge")) return "Edge";
  return "Other";
}

function parseDevice(ua: string = ""): string {
  if (/Mobile|Android|iPhone/.test(ua)) return "mobile";
  if (/iPad|Tablet/.test(ua)) return "tablet";
  return "desktop";
}
