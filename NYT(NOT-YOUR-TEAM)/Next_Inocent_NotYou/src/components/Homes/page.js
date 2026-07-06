"use client";
import { useRouter } from "next/navigation";
export default function Navbar() {
    const router = useRouter();
  return (
   <div className="w-full h-screen overflow-hidden flex justify-between  bg-black ">

    <div className=" w-200   h-screen">
      <div className="flex relative h-screen     items-center ">
          <h2 className="sm:text-9xl text-6xl left-10 top-50 sm:top-40 absolute sm:left-10 font-bold text-white ">Understand </h2>
          <h2 className="sm:text-7xl text-6xl left-10 top-70 sm:top-70 absolute sm:left-10 font-bold text-white">Terms <span className= "  sm:text-8xl text:text-7xl text-violet-900">&</span> Conditions </h2>
          <h2 className="sm:text-8xl text-4xl sm:w-full w-80 left-40 top-100 sm:top-100 absolute sm:left-30 font-bold text-violet-900 ">In Secoonds. </h2>
        </div>
    </div>
    <div className=" sm:w-150 w-250 h-250  relative  sm:h-screen">
      <img src="/cat3.png"   className="w-100 h-65 sm:w-120 sm:h-100 rotate-10 bottom-60 sm:top-30 right-20 absolute  object-cover" alt="Landing Image" />
    </div>
    <p className="text-white text-lg  bottom-10 sm:bottom-5 opacity-60 absolute left-2 w-100 sm:w-full  sm:left-10">
      Paste any Terms & Conditions document and get an instant, easy-to-read summary in bullet points.
    </p>
   </div>
  );
}