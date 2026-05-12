import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function getFinancialAdvice(data: string) {
  const prompt = `
  You are a smart financial advisor.

  Analyze this spending data:
  
  ${data}

  Give short financial suggestions.
  `;

  const result = await model.generateContent(prompt);

  return result.response.text();
}