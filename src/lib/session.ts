import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export type SessionUser = {
  userId: string;
  name: string;
  email: string;
  storeId: string;
  storeName: string;
  storeSlug: string;
};

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "bizboost-secret-key-change-in-production-32chars"
);

export async function createSession(user: SessionUser): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("bizboost_session")?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as SessionUser;
  } catch {
    return null;
  }
}

export function setSessionCookie(response: Response, token: string) {
  (response as any).cookies?.set("bizboost_session", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
