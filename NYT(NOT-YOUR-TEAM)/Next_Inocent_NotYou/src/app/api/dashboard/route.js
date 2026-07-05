import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import User from "@/models/User";
import Summary from "@/models/Summary";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    const decoded = token ? await verifyToken(token) : null;

    if (!decoded) {
      return NextResponse.json({ error: "Please login first." }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const summaries = await Summary.find({ userId: decoded.userId })
      .sort({ createdAt: -1 })
      .select("originalText bullets createdAt");

    return NextResponse.json({
      user: { name: user.name, email: user.email },
      summaries,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}