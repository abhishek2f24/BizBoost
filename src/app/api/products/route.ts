import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

// GET /api/products — user-scoped
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const products = await prisma.product.findMany({
    where: { storeId: session.storeId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}
