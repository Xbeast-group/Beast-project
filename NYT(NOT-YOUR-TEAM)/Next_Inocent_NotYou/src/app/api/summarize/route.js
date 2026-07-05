import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import Summary from "@/models/Summary";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;
    const decoded = token ? await verifyToken(token) : null;

    if (!decoded) {
      return NextResponse.json({ error: "Please login first." }, { status: 401 });
    }

    const { text } = await req.json()

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: "Please provide valid terms and conditions text." },
        { status: 400 }
      )
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

Here is the document to summmarize;
"""${text}"""
`

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const response = await model.generateContent(prompt);

    const raw = response.response.text();
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
    console.error(err)
    return NextResponse.json(
      { error: "Failed to summarize the text. please try again." },
      { status: 500 }
    )

  }

}