import { cookies } from "next/headers";

export type SessionUser = {
  userId: string;
  name: string;
  email: string;
  storeId: string;
  storeName: string;
};

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get("bizboost_session")?.value;
    if (!raw) return null;
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}
