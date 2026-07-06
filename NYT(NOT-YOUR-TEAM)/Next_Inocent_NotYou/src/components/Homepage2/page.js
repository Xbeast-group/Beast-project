"use client";
import { useRouter } from "next/navigation";
export default function Homepage2() {
    const router = useRouter();
  return (
    <div className="w-full sm:h-screen h-700 overflow-hidden relative  flex justify-between  bg-[#0a0a0a] ">
     <h1 className="absolute w-full sm:left-15 sm:text-[19rem] left-5  top-20 text-violet-900 font-bold text-[28rem] leading-none
  [writing-mode:vertical-rl] [text-orientation:upright] md:[writing-mode:horizontal-tb]">
  XBEAST
</h1>
    <div className=" w-full sm:flex   relative flex-col h-screen">

       <div className=" w-200 sm:flex   sm:h-screen">
        <img src="/leader.png" 
        className="sm:w-200 w-200 h-300  z-20 object-center sm:top-20 sm:right-35   absolute sm:h-220 object-cover" alt="Landing Image" />
            <h1 className="text-5xl font-extrabold text-white absolute top-140 sm:top-120  sm:left-190 left-40 z-99">THE</h1>
            <h1 className="sm:text-5xl font-extrabold text-6xl text-white absolute top-155 sm:top-135 sm:right-110 right-20 z-99">LEADER</h1>
        <div className=" w-120 h-80  t sm:w-65 sm:h-80 sm:top-100 z-30 top-103  bg-violet-900 mask-linear-from-orange-500 sm:right-102   absolute" >
        </div>
        </div>

       <div className=" w-200 sm:flex absolute sm:top-0 top-180 h-screen">
        <img src="/deepika.png" 
        className="w-110  top-15 left-0 object-center absolute h-170 object-cover" alt="Landing Image" />
            <h1 className="text-5xl font-extrabold text-white absolute sm:left-35 top-145 sm:top-122 left-40 z-99">THE</h1>
            <h1 className="text-5xl font-extrabold text-white absolute sm:left-14 top-160 sm:top-135 left-20 z-99">DESIGNER</h1>        
           <div className=" sm:w-72 w-120 left-0 h-80 top-105 sm:top-100   absolute  bg-violet-900 mask-linear-from-orange-500  sm:left-12" ></div>
        </div>

       <div className="  w-200  sm:flex sm absolute sm:top-0 top-540 sm:right-142 right-0    h-screen">
        <img src="/team 4.png" 
        className="sm:w-71 w-90 h-190  top-20 left-100 sm:left-92  object-bottom absolute sm:h-140 object-cover" alt="Landing Image" />
            <h1 className="text-5xl font-extrabold text-white absolute top-170 sm:top-120 sm:left-115 left-130 z-99">THE</h1>
            <h1 className="sm:text-4xl font-extrabold text-5xl text-white absolute top-185 sm:top-135 sm:left-95 left-105 z-99">PPT MACKER </h1>        
           <div className=" sm:w-70 sm:h-80 sm:top-100  sm:left-94 w-120 h-80 top-130  left-90   bg-violet-900 mask-linear-from-orange-500  absolute" ></div>
        </div>

       <div className=" w-200 sm:flex right-0  absolute sm:left-150 top-360 sm:top-0 h-screen">
        <img src="/issue.png" 
        className="w-110  top-20 right-10 sm:right-20 object-center absolute h-170 object-cover" alt="Landing Image" />
            <h1 className="text-5xl font-extrabold text-white absolute top-150 sm:top-120 right-50 z-99">THE</h1>
            <h1 className="text-5xl font-extrabold text-white absolute sm:right-20 top-165 sm:top-135 right-23 z-99">DEVELOPER</h1>
        <div className=" right-0 w-120 h-80 sm:w-80 sm:h-80 top-110 sm:top-100  bg-violet-900 mask-linear-from-orange-500 sm:right-20  absolute " ></div>
        </div>

    </div>
    </div>

  );
}