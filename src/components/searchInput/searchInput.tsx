"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { SearchIcon } from "../icons/search";
import { CrossIcon } from "../icons/cross";

interface SearchInputProps {
  value: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  handleClear: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  handleSearchChange,
  search,
  handleClear,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const clearSearch = () => {
    handleClear();
    router.push(pathname || "/");
  };

  return (
    <div className="pb-1.5 pt-1.5 flex items-center border-b">
      <input
        type="text"
        placeholder={search}
        value={value}
        onChange={handleSearchChange}
        className="w-full focus:outline-none placeholder:text-black"
      />
      {value ? (
        <button
          onClick={clearSearch}
          className="ml-2 focus:outline-none"
          aria-label="Clear search"
        >
          <CrossIcon />
        </button>
      ) : (
        <SearchIcon />
      )}
    </div>
  );
};

export { SearchInput };
