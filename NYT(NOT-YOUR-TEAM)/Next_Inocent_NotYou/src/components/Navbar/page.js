"use client";
import { useRouter } from "next/navigation";
export default function Navbar() {
    const router = useRouter();
  return (
    <nav  className="w-full   backdrop-blur-md h-15 items-center flex justify-between px-4   border-b  border-gray-200 fixed top-0 z-50">
        <div className="flex items-center ">
          <button
        onClick={() => router.push("/")}
        className=""
      >
          <span className="text-2xl sm:text-4xl font-bold text-violet-900">NEXT INOCENT  </span>
          <span className=" font-bold top-5 sm:left-60 left-50 text-white   sm:text-2xl absolute"> Not You</span>
      </button>
        </div>

        {/* <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition font-medium">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition font-medium">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition font-medium">
            Contact
          </a>
        </div> */}

          <button
            onClick={() => router.push("/dashboard")}
            className="bg-violet-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-violet-800"
          >
            Dashboard
          </button>
    </nav>
  );
}