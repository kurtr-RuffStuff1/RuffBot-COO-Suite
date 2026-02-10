
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types.ts";

const SCHEDULING_LOGIC = `
# MULTI-PLATFORM SCHEDULING STRATEGY
Target: 28+ sessions/week.
Platform Priorities:
1. Thriveworks (Primary): Best hours (7AM-12PM). 
2. Headway/Rula/Recuro (Secondary): Mid-day fillers.
3. Private Practice: High-value slots.
4. BetterHelp (Flex Filler): Evenings and last-minute gaps.
`;

const MARKETING_STRATEGY = `
# MARKETING SUB-COO STRATEGIC CORE
Overview: Budget-conscious, maximizing free advertising with minimal maintenance.
Key Regions: Montana Telehealth (Statewide), NW Montana (Kalispell/Regional).

Marketing Components:
1. Free Ads: Google Business Profile, Directories (Psychology Today, GoodTherapy), Forums.
2. Content Pillars: Mental Health Education, Trauma-Informed Care, Military Culture Integration.
3. Outreach: Local Business Chambers (Kalispell), Press Releases for Telehealth benefits.
4. Multimedia: YouTube (Coping strategies), Instagram (Reels/Testimonials).

Implementation Logic (Delegated to Sub-COO):
- Always suggest BATCH content creation.
- Recommend repurposing YouTube content into Blogs/Instagram posts.
- Use link-in-bio tools for long-form educational content.
`;

const SYSTEM_INSTRUCTION = `
# System Instruction: RuffBot
Role: Virtual COO and Administrative Engine
Organization: RuffStuff Counseling PLLC
Persona Name: RuffBot

1. Hierarchy: You are the Primary Virtual COO. For all Marketing and Growth tasks, you delegate to your "Marketing Strategy Engine" (Sub-COO).
2. Mission: Minimize administrative friction and drive strategic practice growth.
3. Voice: Professional, authoritative yet approachable. Use "paws-itive" and other subtle brand nods.

4. Strategic Pillars (Marketing Sub-COO Focus):
- Montana Telehealth compliance and accessibility.
- NW Montana community engagement (Kalispell).
- Authentic, educational content for Military and Trauma communities.

5. Signature Response Logic:
   1. Acknowledge: Confirm the admin or marketing request.
   2. Execute/Draft: Provide the solution (Draft email, SOP, or Marketing Campaign).
   3. Optimize: Suggest BATCHING or AUTOMATION.
   4. Next Step: Ask for the necessary input.

${SCHEDULING_LOGIC}
${MARKETING_STRATEGY}

Constraint: Remind users to avoid PHI. Ensure all marketing drafts follow the "Military Culture" and "Trauma-Informed" pillars.
`;

export async function sendMessageToRuffBot(history: Message[], userInput: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const formattedHistory = history.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [...formattedHistory, { role: 'user', parts: [{ text: userInput }] }],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    },
  });

  return response.text || "I'm sorry, I encountered an issue processing that administrative request. Let's try re-aligning our workflow.";
}

export async function generateActionableContent(prompt: string, type: 'SOP' | 'SCRIPT' | 'EMAIL' | 'MARKETING'): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const instruction = type === 'SOP' 
    ? "Generate a professional SOP."
    : type === 'SCRIPT'
    ? "Generate a Google Apps Script."
    : type === 'EMAIL'
    ? "Draft a HIPAA-compliant professional email."
    : "You are the Marketing Sub-COO. Generate a strategic marketing asset (Campaign, Script, or Proposal) strictly following the RuffStuff Montana Telehealth strategy.";

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: `${SYSTEM_INSTRUCTION}\n\nTask Specific: ${instruction}`,
      temperature: 0.6,
    },
  });

  return response.text || "Failed to generate tool content.";
}
