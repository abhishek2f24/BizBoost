import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, duration } = await req.json();

    if (!sessionId) return NextResponse.json({ ok: false }, { status: 400 });

    await prisma.analyticsSession.updateMany({
      where: { sessionId },
      data: {
        endedAt: new Date(),
        duration,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
