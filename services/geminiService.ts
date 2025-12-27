import { GoogleGenAI, Type } from "@google/genai";
import { Mood, Activity, Track } from "../types";

// Always use named parameter for apiKey and direct process.env.API_KEY access
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePlaylistWithAI = async (
  mood: Mood, 
  activity: Activity, 
  preferences: string = ""
): Promise<Track[]> => {
  const prompt = `Generate a playlist of 10 songs for someone who is feeling "${mood}" while they are "${activity}". 
  Take into account these additional preferences: ${preferences}.
  Each song should have a Title, Artist, Genre, and specific Mood Tags that match the request.
  Ensure the recommendations are varied and include both popular and slightly obscure tracks that fit a Gen Z aesthetic.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              artist: { type: Type.STRING },
              genre: { type: Type.STRING },
              moodTags: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["title", "artist", "genre", "moodTags"]
          }
        }
      }
    });

    // Access .text property directly as per guidelines
    const result = JSON.parse(response.text);
    return result as Track[];
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};