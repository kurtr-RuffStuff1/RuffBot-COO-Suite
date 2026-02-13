// api/ai/chat.ts

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Missing messages" });
    }

    // 🔐 Gemini API key (SERVER ONLY)
    const API_KEY = process.env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: messages.map((m: any) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
        }),
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";

    return res.status(200).json({ text });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "AI request failed" });
  }
}
