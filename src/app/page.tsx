"use client";

import React, { useState } from "react";
import Image from "next/image";
import Restaurants from "@/components/Restaurants";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");

  return (
    <div className="justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-md mx-auto p-4">
        {/* 
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
        </div> */}

        {/* <!-- Search Bar --> */}
        <SearchBar setSearchName={setSearchName} />

        {/* <!-- Categories --> */}
        <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        <Restaurants category={selectedCategory} name={searchName} />

        {/* <!-- Bottom Navigation --> */}
        <div className="border-t-1 border-gray-100 fixed left-0 bottom-0 w-full bg-white shadow-lg flex justify-around p-4">
          <button className="flex flex-col items-center text-gray-500">
            <span>🏠</span>
            <span className="text-xs">홈</span>
          </button>
          <button className="flex flex-col items-center text-orange-500">
            <span>🔍</span>
            <span className="text-xs">검색</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <span>📜</span>
            <span className="text-xs">피드</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <span>📅</span>
            <span className="text-xs">내 예약</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <span>📋</span>
            <span className="text-xs">메뉴</span>
          </button>
        </div>
      </main>
    </div>
  );
}
