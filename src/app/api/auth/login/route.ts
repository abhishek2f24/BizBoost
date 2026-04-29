import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }
    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { store: true },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    if (!user.store) {
      return NextResponse.json({ error: "No store found for this account" }, { status: 404 });
    }

    const token = await createSession({
      userId: user.id,
      name: user.name ?? email,
      email: user.email,
      storeId: user.store.id,
      storeName: user.store.name,
      storeSlug: user.store.slug,
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
    console.error("[auth/login]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
