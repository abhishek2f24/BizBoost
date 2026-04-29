import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  phone: z.string().optional(),
  upiId: z.string().optional(),
});

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const store = await prisma.store.findUnique({ where: { id: session.storeId } });
  return NextResponse.json(store);
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  const updated = await prisma.store.update({
    where: { id: session.storeId },
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      phone: parsed.data.phone,
      upiId: parsed.data.upiId,
      ...(body.logo && { logo: body.logo }),
    },
  });
  return NextResponse.json(updated);
}
