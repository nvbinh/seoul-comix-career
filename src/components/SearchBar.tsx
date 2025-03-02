import React, { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  setSearchName: (name: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchName }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      setSearchName(inputValue);
    }, 1000);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [inputValue, setSearchName]);

  return (
    <div className="py-4">
      <div className="flex items-center bg-gray-100 rounded-full p-3">
        <svg
          className="w-5 h-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-10.6-10.6 7.5 7.5 0 0 0 10.6 10.6z"
          />
        </svg>
        <input
          type="text"
          placeholder="맛집 이름을 검색해보세요"
          className="ml-3 bg-transparent outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;