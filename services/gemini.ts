import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "你叫狗蛋。你是一个倾听者，一个秘密的日记守护者。你的回答应该像一个值得信赖的老朋友，有时候可以幽默一点，但总是很支持对方。保持回答简洁自然。不用太正式。",
      }
    });

    return response.text || "抱歉，我这里有点信号不好。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to communicate with the AI.");
  }
};