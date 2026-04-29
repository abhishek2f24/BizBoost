import OpenAI from "openai";

// Lazy instantiation — avoids build-time crash if OPENAI_API_KEY is missing
function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "sk-placeholder",
  });
}

export async function generateProductDescription({
  productName,
  price,
  category,
  imageUrl,
  language = "en",
}: {
  productName: string;
  price: number;
  category?: string;
  imageUrl?: string;
  language?: string;
}) {
  const openai = getOpenAI();
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `You are an expert Indian e-commerce copywriter. Write compelling product descriptions for small Indian sellers. 
      Always return valid JSON with exactly these fields:
      - title: catchy product title (max 60 chars)
      - description: detailed product description (150-200 words, persuasive)
      - whatsappCaption: short punchy caption for WhatsApp (max 280 chars, include emojis)
      - tags: array of 8-10 SEO tags
      - hashtags: array of 15 Instagram hashtags with # prefix
      - seoTitle: meta title (max 60 chars)
      - seoDescription: meta description (max 155 chars)`,
    },
    {
      role: "user",
      content: imageUrl
        ? [
            { type: "image_url" as const, image_url: { url: imageUrl } },
            {
              type: "text" as const,
              text: `Generate a complete product listing for:
              Product Name: ${productName}
              Price: ₹${price}
              Category: ${category || "General"}
              Language: ${language === "hi" ? "Hindi" : "English"}
              Make it compelling for Indian buyers.`,
            },
          ]
        : `Generate a complete product listing for:
           Product Name: ${productName}
           Price: ₹${price}
           Category: ${category || "General"}
           Make it compelling for Indian buyers.`,
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 1000,
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

export async function generateCreativeImage({
  productName,
  price,
  imageUrl,
  platform = "instagram",
  festival,
}: {
  productName: string;
  price: number;
  imageUrl?: string;
  platform?: string;
  festival?: string;
}) {
  const openai = getOpenAI();
  const prompt = festival
    ? `Professional ${platform} marketing post for Indian seller. Product: ${productName}. Price: ₹${price}. Festival: ${festival} theme. Vibrant colors, festive mood, modern Indian design aesthetic.`
    : `Clean professional ${platform} marketing post for Indian online seller. Product: ${productName}. Price: ₹${price}. Modern Indian design, clean background, eye-catching layout.`;

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    size: platform === "instagram" ? "1024x1024" : "1792x1024",
    quality: "standard",
    n: 1,
  });

  return response.data?.[0]?.url ?? null;
}
