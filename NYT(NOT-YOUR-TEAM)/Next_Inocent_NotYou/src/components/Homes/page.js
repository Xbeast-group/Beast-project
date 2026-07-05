"use client";
import { useRouter } from "next/navigation";
export default function Navbar() {
    const router = useRouter();
  return (
   <div className="w-full h-screen overflow-hidden flex justify-between  bg-black ">
    <div className=" w-200   h-screen">
      <div className="flex relative h-screen    items-center ">
          <h2 className="text-9xl top-40 absolute left-10 font-bold text-white ">Understand </h2>
          <h2 className="text-7xl top-70 absolute left-10 font-bold text-white">Terms <span className= " text-8xl text-orange-600">&</span> Conditions </h2>
          <h2 className="text-8xl top-100 absolute left-30 font-bold text-orange-600 ">In Secoonds. </h2>
        </div>
    </div>
    <div className=" w-150 relative  h-screen">
      <img src="/cat1.png"   className="w-120 rotate-10 top-30 right-20 absolute h-120 object-cover" alt="Landing Image" />
    </div>
    <p className="text-white text-lg bottom-5 opacity-60 absolute left-10">
      Paste any Terms & Conditions document and get an instant, easy-to-read summary in bullet points.
    </p>
   </div>
  );
}