import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Fast and efficient for a "simple" app
      contents: prompt,
      config: {
        systemInstruction: "You are Zen, a minimalist and helpful AI assistant. Keep your answers concise, clear, and polite. Use plain text formatting mostly.",
      }
    });

    return response.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to communicate with the AI.");
  }
};