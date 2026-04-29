import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // Check if store with this slug exists AND is not owned by the current user
    const existingStore = await prisma.store.findUnique({
      where: { slug },
    });

    if (existingStore && existingStore.id !== session.storeId) {
      return NextResponse.json({ available: false });
    }

    return NextResponse.json({ available: true });
  } catch (error) {
    console.error("Check slug error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
