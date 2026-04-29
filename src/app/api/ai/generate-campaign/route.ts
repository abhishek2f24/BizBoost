import { NextRequest, NextResponse } from "next/server";
import { generateJSON } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productName, price, category } = body;

    if (!productName || !price) {
      return NextResponse.json({ error: "Missing product details" }, { status: 400 });
    }

    // AI Prompt Construction
    const prompt = `
      You are an expert e-commerce marketer for the Indian market.
      Generate a complete marketing campaign for the following product:
      - Name: ${productName}
      - Category: ${category || "General"}
      - Price: ₹${price}

      Return the result as a JSON object with these exact keys:
      {
        "title": "A highly clickable, SEO optimized product title (max 60 chars)",
        "description": "A compelling, rich product description highlighting benefits, quality, and a call to action.",
        "whatsappCaption": "A friendly, persuasive WhatsApp broadcast message with emojis and a clear CTA.",
        "instagramCaption": "An aesthetic Instagram post caption with engaging questions and emojis.",
        "reelScript": "A 15-second short-form video script (Hook, Body, CTA) formatted clearly.",
        "facebookAdText": "High-converting Facebook ad primary text addressing pain points and benefits.",
        "metaAdHeadline": "A punchy headline for a Meta ad (max 40 chars)",
        "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
        "festivalBannerPrompt": "A highly detailed DALL-E/Midjourney prompt to generate a beautiful festive banner for this product."
      }
    `;

    try {
      const result = await generateJSON(prompt);
      return NextResponse.json(result);
    } catch (aiError) {
      console.warn("Gemini Generation Failed/Skipped, using rich fallback:", aiError);
      
      // Smart fallback that injects the product details
      return NextResponse.json({
        title: `Premium ${productName} - Exclusive Collection`,
        description: `Elevate your lifestyle with our handcrafted ${productName}. Designed with meticulous attention to detail and premium materials, this is the perfect addition to your collection. Limited stock available at just ₹${price}. Order now and experience true quality.`,
        whatsappCaption: `✨ *Exclusive Drop!* ✨\n\nHey! We just launched our breathtaking new *${productName}*! 😍\n\nPerfect for your upcoming festive celebrations. Crafted to perfection and available for just *₹${price}*.\n\n👇 *Grab yours before it sells out!* 👇\n[Link]`,
        instagramCaption: `Ready to turn heads? ✨ Introducing our newest obsession: the ${productName}.\n\nWhether you're dressing up for a special occasion or elevating your everyday style, this is exactly what you need. 💫\n\nTap the link in bio to shop the exclusive drop! 🛍️✨`,
        reelScript: `[Hook - 0:00] Looking for the perfect upgrade? Stop scrolling!\n[Visual - 0:03] *Show close up of the ${productName} highlighting premium texture*\n[Body - 0:05] This is our best-selling ${productName}. Just look at that quality! And it's only ₹${price}.\n[CTA - 0:12] We only have 10 left in stock. Click the link in our bio to grab yours right now!`,
        facebookAdText: `Stop settling for average. 🛑\n\nOur new ${productName} is finally here, designed to give you that premium feel without the ridiculous price tag.\n\n✅ Premium Quality\n✅ Handcrafted Perfection\n✅ Unbeatable Price at ₹${price}\n\nClick "Shop Now" to secure yours before we sell out completely! 🛒👇`,
        metaAdHeadline: `Get the New ${productName} at ₹${price}!`,
        hashtags: ["#PremiumQuality", `#${productName.replace(/\s+/g, '')}`, "#FestiveVibes", "#ShopNow", "#ExclusiveDrop"],
        festivalBannerPrompt: `A highly aesthetic shot of ${productName} with festive Indian lighting, warm glow, 8k resolution.`
      });
    }

  } catch (error) {
    console.error("[ai/generate-campaign]", error);
    return NextResponse.json({ error: "Failed to generate campaign" }, { status: 500 });
  }
}
