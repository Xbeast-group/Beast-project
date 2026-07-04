import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: "Please provide valid terms and conditions text." },
        { status: 400 }
      );
    }

    // Mock response - testing ke liye (real API call comment out kar diya)
    const bullets = [
      {
        title: "Data Collection Policy",
        detail: "Company user ka personal data collect karti hai jaise email, name, aur usage patterns. Ye data service improve karne ke liye use hota hai.",
      },
      {
        title: "Third-Party Sharing",
        detail: "User ka data kabhi bhi third-party advertisers ke sath share nahi kiya jayega bina explicit consent ke.",
      },
      {
        title: "Account Termination",
        detail: "Company kisi bhi user ka account bina notice ke terminate kar sakti hai agar terms violate hote hain.",
      },
    ];

    return NextResponse.json({ bullets });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to summarize. Try again." },
      { status: 500 }
    );
  }
}