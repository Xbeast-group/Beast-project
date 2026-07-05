"use client";
import Navbar from "@/components/Navbar/page";
import Homes from "@/components/Homes/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen overflow-hidden bg-black ">
      <Navbar/>,
      <Homes/>
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to T&C Summarizer
        </h1>
        <p className="text-gray-600">
          Paste any Terms & Conditions document and get an instant, easy-to-read summary in bullet points.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => router.push("/login")}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}