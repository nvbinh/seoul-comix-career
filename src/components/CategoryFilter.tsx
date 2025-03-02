import React from "react";

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { value: "", label: "전체" },
    { value: "SUSHI", label: "스시·해산물" },
    { value: "RAMEN", label: "라멘" },
    { value: "TEMPURA", label: "덴푸라" },
  ];

  return (
    <div className="flex justify-between overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category.value}
          className={`px-4 py-2 rounded-full ${selectedCategory === category.value ? "bg-black text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedCategory(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;