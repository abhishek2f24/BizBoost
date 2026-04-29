import { NextRequest, NextResponse } from "next/server";

const DEMO_USER = {
  id: "demo-user-001",
  name: "Demo Seller",
  email: "demo@bizboost.ai",
  password: "demo123",
  storeId: "demo-store-001",
  storeName: "My BizBoost Store",
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Accept demo credentials OR any email/password for easy onboarding
    const isValid =
      (email === DEMO_USER.email && password === DEMO_USER.password) ||
      (email && password && password.length >= 6);

    if (!isValid) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 401 }
      );
    }

    const session = {
      userId: DEMO_USER.id,
      name: DEMO_USER.name,
      email: email || DEMO_USER.email,
      storeId: DEMO_USER.storeId,
      storeName: DEMO_USER.storeName,
    };

    const response = NextResponse.json({ ok: true, user: session });

    // Set a simple session cookie (7 days)
    response.cookies.set("bizboost_session", JSON.stringify(session), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("bizboost_session");
  return response;
}
