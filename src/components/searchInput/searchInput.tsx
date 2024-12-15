"use client";
import React from "react";
import { SearchIcon } from "../icons/search";

interface SearchInputProps {
  value: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

const SearchInput: React.FC<SearchInputProps> = async ({
  value,
  handleSearchChange,
  search,
}) => {
  return (
    <div className="pb-1.5 pt-1.5 flex items-center border-b">
      <input
        type="text"
        placeholder={search}
        value={value}
        onChange={handleSearchChange}
        className="w-full focus:outline-none placeholder:text-black"
      />
      <SearchIcon />
    </div>
  );
};

export { SearchInput };
