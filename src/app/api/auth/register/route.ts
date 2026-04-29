import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  storeName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }
    const { name, storeName, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Generate a unique slug
    let slug = toSlug(storeName);
    const slugExists = await prisma.store.findUnique({ where: { slug } });
    if (slugExists) slug = slug + "-" + Date.now();

    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        store: {
          create: {
            name: storeName,
            slug,
          },
        },
      },
      include: { store: true },
    });

    const token = await createSession({
      userId: user.id,
      name: user.name!,
      email: user.email,
      storeId: user.store!.id,
      storeName: user.store!.name,
      storeSlug: user.store!.slug,
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set("bizboost_session", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (error) {
    console.error("[auth/register]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
