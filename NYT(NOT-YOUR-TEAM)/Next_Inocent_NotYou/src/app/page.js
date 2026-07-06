"use client";
import Navbar from "@/components/Navbar/page";
import Homes from "@/components/Homes/page";
import { useRouter } from "next/navigation";
import Homepage2 from "@/components/Homepage2/page";
import Features from "@/components/Features/page";
import Footer from "@/components/Footer";


export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen overflow-hidden bg-[#0a0a0a]">
      <Navbar/>
      <Homes/>
      <Homepage2/>
      <Features/>
      <Footer/>
    </main>
  );
}