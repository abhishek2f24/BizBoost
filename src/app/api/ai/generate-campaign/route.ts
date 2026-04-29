import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Instantiate OpenAI. If no API key is provided, it might throw or just fail later.
// We'll wrap the call in a try/catch and return a rich fallback if it fails.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy_key_to_prevent_crash_on_init",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productName, price, category } = body;

    // AI Prompt Construction
    const prompt = `
      You are an expert e-commerce marketer for the Indian market.
      Generate a complete marketing campaign for the following product:
      - Name: ${productName}
      - Category: ${category}
      - Price: ₹${price}

      Return the result as a raw JSON object (without markdown wrappers like \`\`\`json) with these exact keys:
      {
        "title": "A highly clickable, SEO optimized product title (max 60 chars)",
        "description": "A compelling, rich product description highlighting benefits, quality, and a call to action.",
        "whatsappCaption": "A friendly, persuasive WhatsApp broadcast message with emojis and a clear CTA.",
        "instagramCaption": "An aesthetic Instagram post caption with engaging questions and emojis.",
        "reelScript": "A 15-second short-form video script (Hook, Body, CTA) formatted clearly.",
        "facebookAdText": "High-converting Facebook ad primary text addressing pain points and benefits.",
        "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
        "festivalBannerPrompt": "A highly detailed Midjourney/DALL-E prompt to generate a beautiful festive banner for this product."
      }
    `;

    // Attempt OpenAI call
    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("Missing OPENAI_API_KEY");
      }

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      return NextResponse.json(result);
    } catch (aiError) {
      console.warn("AI Generation Failed/Skipped, using rich fallback:", aiError);
      
      // Rich fallback for MVP / Demo purposes when keys are missing or rate limited
      return NextResponse.json({
        title: `Premium ${productName} - Exclusive Collection`,
        description: `Elevate your lifestyle with our handcrafted ${productName}. Designed with meticulous attention to detail and premium materials, this is the perfect addition to your collection. Limited stock available at just ₹${price}. Order now and experience true quality.`,
        whatsappCaption: `✨ *Exclusive Drop!* ✨\n\nHey! We just launched our breathtaking new *${productName}*! 😍\n\nPerfect for your upcoming festive celebrations. Crafted to perfection and available for just *₹${price}*.\n\n👇 *Grab yours before it sells out!* 👇\n[Link]`,
        instagramCaption: `Ready to turn heads? ✨ Introducing our newest obsession: the ${productName}.\n\nWhether you're dressing up for a special occasion or elevating your everyday style, this is exactly what you need. 💫\n\nTap the link in bio to shop the exclusive drop! 🛍️✨`,
        reelScript: `[Hook - 0:00] Looking for the perfect ${category.toLowerCase()} upgrade? Stop scrolling!\n[Visual - 0:03] *Show close up of the ${productName} highlighting premium texture*\n[Body - 0:05] This is our best-selling ${productName}. Just look at that quality! And it's only ₹${price}.\n[CTA - 0:12] We only have 10 left in stock. Click the link in our bio to grab yours right now!`,
        facebookAdText: `Stop settling for average ${category.toLowerCase()}. 🛑\n\nOur new ${productName} is finally here, designed to give you that premium feel without the ridiculous price tag.\n\n✅ Premium Quality\n✅ Handcrafted Perfection\n✅ Unbeatable Price at ₹${price}\n\nClick "Shop Now" to secure yours before we sell out completely! 🛒👇`,
        hashtags: ["#PremiumQuality", `#${productName.replace(/\s+/g, '')}`, "#FestiveVibes", "#ShopNow", "#ExclusiveDrop"],
        festivalBannerPrompt: `A highly aesthetic, professional product photography shot of a ${productName}, resting on a smooth marble pedestal. Warm, golden-hour festive lighting, subtle bokeh in the background with glowing diyas and marigold petals, 8k resolution, photorealistic, cinematic lighting --ar 16:9`
      });
    }

  } catch (error) {
    console.error("[ai/generate-campaign]", error);
    return NextResponse.json({ error: "Failed to generate campaign" }, { status: 500 });
  }
}
