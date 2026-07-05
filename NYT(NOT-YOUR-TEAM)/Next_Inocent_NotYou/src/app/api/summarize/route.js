import { NextResponse } from "next/server";
import OpenAI from "openai";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import Summary from "@/models/Summary";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;
    const decoded = token ? await verifyToken(token) : null;

    if (!decoded) {
      return NextResponse.json({ error: "Please login first." }, { status: 401 });
    }

    const { text } = await req.json();

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: "Please provide valid terms and conditions text." },
        { status: 400 }
      );
    }

    const prompt = `You are given a Terms and Conditions document.
Summarize it into concise bullet points.

Return ONLY valid JSON (no markdown, no backticks) in this exact format:
[
  {
    "title": "Short bullet point title (max 8 words)",
    "detail": "2-3 line detailed explanation of this point"
  }
]

Here is the document to summarize:
"""${text}"""
`;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = response.choices[0].message.content.trim();
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const bullets = JSON.parse(cleaned);

    await connectToDatabase();
    await Summary.create({
      userId: decoded.userId,
      originalText: text,
      bullets: bullets,
    });

    return NextResponse.json({ bullets });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to summarize the text. Please try again." },
      { status: 500 }
    );
  }
}