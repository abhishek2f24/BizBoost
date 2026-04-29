import { NextRequest, NextResponse } from "next/server";
import { generateProductDescription } from "@/lib/openai";
import { z } from "zod";

const schema = z.object({
  productName: z.string().min(2).max(120),
  price: z.number().min(0),
  category: z.string().optional(),
  imageUrl: z.string().url().optional(),
  language: z.enum(["en", "hi"]).default("en"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await generateProductDescription(parsed.data);

    return NextResponse.json({ ok: true, data: result });
  } catch (error) {
    console.error("[ai/description]", error);
    return NextResponse.json(
      { error: "Failed to generate description. Check your OpenAI API key." },
      { status: 500 }
    );
  }
}
