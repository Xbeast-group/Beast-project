"use client";
import { Sparkles, Code2, AtSign, Link2 } from "lucide-react";



export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] sm:mt-20   text-white border-t border-zinc-800 px-6 pt-16 pb-6">
      <div className=" ml-20 ">
        <div className="grid grid-cols-1    md:grid-cols-3 gap-10  md:gap-6">
          <div className="md:col-span-1 sm:relative sm:right-20 ">
            <div className="flex items-center  gap-2 mb-4">
              {/* <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div> */}
              <span className="font-bold text-violet-500 text-lg">Next Inocent NotYou</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">Understand any Terms and Conditions, Privacy Policy, or legal document in seconds.</p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-violet-500/40 transition-colors"><Code2 className="w-4 h-4 text-zinc-400" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-violet-500/40 transition-colors"><AtSign className="w-4 h-4 text-zinc-400" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-violet-500/40 transition-colors"><Link2 className="w-4 h-4 text-zinc-400" /></a>
            </div>
          </div>



          <div className="sm:relative  sm:bottom-13 sm:w-200  sm:left-20">
            <ul className="sm:flex  sm:justify-center sm:gap-30 ">
              {/* <li><a href="#" className="text-sm text-violet-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-violet-400 hover:text-white transition-colors">Privacy Policy</a></li> */}
              <li><a href="https://www.linkedin.com/in/ankit-kumar-a0b75b377?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="text-sm text-violet-400 hover:text-white transition-colors">Linkedin</a></li>
              <li><a href="https://github.com/Xbeast-group/Beast-project.git" className="text-sm text-violet-400 hover:text-white transition-colors">GitHub</a></li>
            </ul>
            <img src="/teamlog.png" className="w-100 h-65 sm:w-100 sm:h-40   sm:top-10 right-40 absolute  object-cover" alt="Landing Image" />
          </div>
        </div>

      </div>
    </footer>
  );
}