import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, festival, scheduledAt, message, imageUrl } = body;

    if (!name || !festival) {
      return NextResponse.json({ error: "Missing campaign details" }, { status: 400 });
    }

    const campaign = await prisma.campaign.create({
      data: {
        storeId: session.storeId,
        name,
        festival,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : new Date(),
        message,
        imageUrl,
        status: "DRAFT"
      },
    });

    return NextResponse.json({ success: true, campaignId: campaign.id });
  } catch (error) {
    console.error("[campaigns/save]", error);
    return NextResponse.json({ error: "Failed to save campaign" }, { status: 500 });
  }
}
