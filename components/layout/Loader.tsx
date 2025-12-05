"use client";

import Logo from "@/assets/logo.svg";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <Image
          src={Logo}
          alt="App Logo"
          width={90}
          height={90}
          className="animate-pulse-slow"
          priority
        />

        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-0"></span>
          <span className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    </div>
  );
}
