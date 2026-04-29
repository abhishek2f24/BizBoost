import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_KEY || "");

// Try these models in order
const MODEL_NAMES = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro"];

async function getModel(isJson = false) {
  for (const modelName of MODEL_NAMES) {
    try {
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: isJson ? { responseMimeType: "application/json" } : undefined
      });
      // We can't easily "test" the model here without making a request, 
      // so we'll just return it and handle the error in the generate functions.
      return { model, modelName };
    } catch (e) {
      console.warn(`Failed to initialize model ${modelName}:`, e);
    }
  }
  throw new Error("Could not initialize any Gemini model");
}

export async function generateContent(prompt: string) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_KEY) {
      throw new Error("Missing GOOGLE_GENERATIVE_AI_KEY");
    }
    
    // Try each model until one works
    for (const modelName of MODEL_NAMES) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
      } catch (error: any) {
        if (error.status === 404) {
          console.warn(`Model ${modelName} not found, trying next...`);
          continue;
        }
        throw error;
      }
    }
    throw new Error("All models failed");
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

    for (const modelName of MODEL_NAMES) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: { responseMimeType: "application/json" }
        });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return JSON.parse(response.text());
      } catch (error: any) {
        if (error.status === 404 || error.message?.includes("404")) {
          console.warn(`Model ${modelName} not found for JSON, trying next...`);
          continue;
        }
        throw error;
      }
    }
    throw new Error("All models failed for JSON");
  } catch (error) {
    console.error("[Gemini JSON Error]", error);
    throw error;
  }
}
