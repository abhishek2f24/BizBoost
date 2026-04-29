import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

async function getOwnedProduct(session: any, productId: string) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || product.storeId !== session.storeId) return null;
  return product;
}

// GET /api/products/[id]
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const product = await getOwnedProduct(session, id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

// PUT /api/products/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const owned = await getOwnedProduct(session, id);
  if (!owned) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const updated = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description,
      price: body.price !== undefined ? parseFloat(body.price) : undefined,
      comparePrice: body.comparePrice !== undefined ? parseFloat(body.comparePrice) : undefined,
      category: body.category,
      stock: body.stock !== undefined ? parseInt(body.stock) : undefined,
      isActive: body.isActive !== undefined ? body.isActive : undefined,
      imageUrl: body.imageUrl,
      whatsappCaption: body.whatsappCaption,
      instagramCaption: body.instagramCaption,
      reelScript: body.reelScript,
      facebookAdText: body.facebookAdText,
      metaAdHeadline: body.metaAdHeadline,
      hashtags: body.hashtags ? JSON.stringify(body.hashtags) : undefined,
    },
  });
  return NextResponse.json(updated);
}

// DELETE /api/products/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const owned = await getOwnedProduct(session, id);
  if (!owned) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
