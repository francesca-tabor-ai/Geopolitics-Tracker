import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getAnalystSummary(countryName: string, metrics: any) {
  const model = "gemini-3-flash-preview";
  const prompt = `As a senior geopolitical analyst for STRATOSPHERE, provide a concise, institutional-grade executive summary for ${countryName}. 
  Current Metrics: ${JSON.stringify(metrics)}.
  Focus on:
  1. Strategic Outlook (6-12 months)
  2. Primary Risk Vectors
  3. Alliance Dynamics
  Keep it professional, data-driven, and under 150 words. Use markdown.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Analyst summary unavailable at this time.";
  }
}

export async function simulateScenario(scenarioDescription: string, currentData: any) {
  const model = "gemini-3-flash-preview";
  const prompt = `Geopolitical Scenario Simulation Lab.
  Scenario: ${scenarioDescription}
  Current Global State: ${JSON.stringify(currentData)}
  
  Predict the impact of this scenario on global power dynamics. 
  Provide a JSON response with the following structure:
  {
    "narrative": "Detailed explanation of consequences",
    "impacts": [
      { "countryId": "id", "metric": "npi|stability|resilience", "change": number (-10 to 10) }
    ],
    "probability": number (0-1)
  }
  Be realistic and consider second-order effects.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Simulation Error:", error);
    return null;
  }
}
