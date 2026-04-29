import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, step, completed = false } = await req.json();

    if (!sessionId || !step) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await prisma.funnelStep.create({
      data: { sessionId, step, completed },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
