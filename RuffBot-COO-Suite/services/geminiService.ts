
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types.ts";

export async function sendTaskToBackend(task: string): Promise<any> {
  const endpoint = "https://script.google.com/macros/s/AKfycbzyQusyln7Eu0EQ75xUrCw5iItO_YVPm7Q14C7Ue6du8X3D6qVtVahoQXED1YWlN_mh/execERE";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "ORCHESTRATE",
        payload: { task }
      })
    });
    return await response.json();
  } catch (e) {
    console.error("Backend sync failed:", e);
    return { message: null };
  }
}

const SCHEDULING_LOGIC = `
# MULTI-PLATFORM SCHEDULING STRATEGY (V3.1 - CANONICAL)
TARGET: 28+ sessions/week, long-term sustainability.

## TIER 1 — THRIVEWORKS CORE (FIXED BACKBONE)
- Mon: 7 AM–3 PM, 8–10 PM
- Tue: 8–10 PM
- Wed: 7 AM–2:30 PM, 7:30–10 PM
- Thu: 7 AM–3:30 PM, 8–10 PM
- Fri: 7 AM–3:30 PM, 8–10 PM
- Sat: 8–10 PM

## TIER 2 — FAMILY-PROTECTED TIME (HARD BOUNDARY - NON-NEGOTIABLE)
- Mon: 3–8 PM
- Tue: 5–8 PM
- Wed: 3–7 PM
- Thu: 4–8 PM
- Fri: 4–8 PM
- Sat: Up to 8 PM
- Sun: ALL DAY
- CONSTRAINT: No BetterHelp, Headway, Recuro, Rula, or overflow work. This protects family, marriage, and sustainability.

## TIER 3 — OPTIMIZED PLATFORM SLIVERS (ALLOCATION OF REMAINING TIME)
PLATFORM HIERARCHY: 1. Headway, 2. Recuro, 3. BetterHelp, 4. Rula

### HEADWAY (High ROI Mid-Day Slivers)
- Tue: 2–4 PM
- Wed: 2:30–3 PM
- Thu: 3:30–4 PM
- Fri: 3:30–4 PM

### BETTERHELP (Late-Night & Flex Fillers)
- Mon: 10–11:55 PM
- Tue: 1:30–2:15 PM
- Tue: 10–11 PM (Optional)
- Thu: 10–11 PM (Optional)
- Fri: 10–11 PM (Optional)
- Sat: 10–11 PM (Optional)
`;

const MARKETING_STRATEGY = `
# MARKETING SUB-COO STRATEGIC CORE
Overview: Budget-conscious, maximizing free advertising with minimal maintenance.
Key Regions: Montana Telehealth (Statewide), NW Montana (Kalispell/Regional).
`;

const SYSTEM_INSTRUCTION = `
# System Instruction: RuffBot
Role: Virtual COO and Administrative Engine
Organization: RuffStuff Counseling PLLC

You are the Primary Virtual COO. You must strictly adhere to the Three-Tier Scheduling Strategy. 
1. Never suggest sessions during Tier 2 (Family-Protected Time).
2. Prioritize Thriveworks for all Core blocks.
3. Use Headway for mid-day gaps and BetterHelp only for late-night backfills.
`;

export async function sendMessageToRuffBot(history: Message[], userInput: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const formattedHistory = history.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...formattedHistory, { role: 'user', parts: [{ text: userInput }] }],
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION}\n\n${SCHEDULING_LOGIC}\n\n${MARKETING_STRATEGY}`,
        temperature: 0.7,
      },
    });

    return response.text || "Communication error. Re-aligning with Tier 1 protocol.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I encountered a communication error with our administrative core. Please try again.";
  }
}

export async function generateActionableContent(prompt: string, type: 'SOP' | 'SCRIPT' | 'EMAIL' | 'MARKETING'): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const instruction = type === 'SOP' 
    ? "Generate a professional SOP."
    : type === 'SCRIPT'
    ? "Generate a Google Apps Script."
    : type === 'EMAIL'
    ? "Draft a HIPAA-compliant professional email."
    : "Generate a strategic marketing asset.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION}\n\n${SCHEDULING_LOGIC}\n\nTask Specific: ${instruction}`,
        temperature: 0.6,
      },
    });

    return response.text || "Failed to generate tool content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Generation failed due to a system error.";
  }
}
