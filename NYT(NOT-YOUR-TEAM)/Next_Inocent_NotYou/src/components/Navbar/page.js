"use client";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto  flex items-center justify-between">
        <div className="flex items-center ">
          <span className="text-4xl font-bold text-blue-600">Next Inocent </span>
          <span className=" font-semibold text-gray-800"> Not You</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition font-medium">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition font-medium">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition font-medium">
            Contact
          </a>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </nav>
  );
}