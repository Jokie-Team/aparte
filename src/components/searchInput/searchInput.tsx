"use client";
import React from "react";
import { SearchIcon } from "../icons/search";

interface SearchInputProps {
  value: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  handleSearchChange,
}) => {
  return (
    <div className="pb-1.5 pt-1.5 flex items-center border-b">
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={handleSearchChange}
        className="w-full focus:outline-none"
      />
      <SearchIcon />
    </div>
  );
};

export { SearchInput };
