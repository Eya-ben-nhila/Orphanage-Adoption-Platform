
import { GoogleGenAI, Type } from "@google/genai";
import { ChildProfile, FamilyProfile } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeCompatibility = async (child: ChildProfile, family: FamilyProfile): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Compare this child profile and family preferences for adoption compatibility in the Hunter x Hunter world. Provide a 2-sentence summary of why they match or don't.
      
      Child: ${JSON.stringify(child)}
      Family Preferences: ${JSON.stringify(family.preferences)}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "Compatibility analysis unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The Association is currently evaluating this bond. Please check back later.";
  }
};

export const runThreatAssessment = async (profileData: any): Promise<{ safe: boolean, reasoning: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a Hunter Association Threat Level Assessment on this applicant: ${JSON.stringify(profileData)}. Check for signs of harmful intent or dangerous behavior (e.g., Hisoka-like traits, criminal history).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            safe: { type: Type.BOOLEAN },
            reasoning: { type: Type.STRING }
          },
          required: ["safe", "reasoning"]
        }
      }
    });
    return JSON.parse(response.text.trim());
  } catch (error) {
    return { safe: false, reasoning: "Security protocols triggered. Manual review required." };
  }
};
