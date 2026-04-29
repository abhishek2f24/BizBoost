import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { status } = await req.json();
  const validStatuses = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
  if (!validStatuses.includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order || order.storeId !== session.storeId) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.order.update({ where: { id }, data: { status } });
  return NextResponse.json(updated);
}
