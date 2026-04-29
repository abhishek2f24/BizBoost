import { NextResponse } from "next/server";

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("bizboost_session");
  return response;
}

// Keep POST for backwards compatibility
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("bizboost_session");
  return response;
}
