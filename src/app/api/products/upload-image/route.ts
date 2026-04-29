import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const ext = file.name.split(".").pop();
    const fileName = `${session.storeId}/${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, buffer, { contentType: file.type, upsert: true });

    if (error) throw error;

    const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
    return NextResponse.json({ url: data.publicUrl });
  } catch (error) {
    console.error("[upload-image]", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
