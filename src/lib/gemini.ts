import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_KEY || "");

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateContent(prompt: string) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_KEY) {
      throw new Error("Missing GOOGLE_GENERATIVE_AI_KEY");
    }
    
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("[Gemini Error]", error);
    throw error;
  }
}

export async function generateJSON(prompt: string) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_KEY) {
      throw new Error("Missing GOOGLE_GENERATIVE_AI_KEY");
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("[Gemini JSON Error]", error);
    throw error;
  }
}
