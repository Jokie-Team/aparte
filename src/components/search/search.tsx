"use client";
import React from 'react';
import { SearchIcon } from '../icons/search';

interface SearchProps {
  searchValue: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ searchValue, handleSearchChange }) => {
  return (
    <div className="pb-1.5 pt-1.5 flex items-center border-b">
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={handleSearchChange}
        className="w-full focus:outline-none"
      />
      <SearchIcon />
    </div>
  );
};

export default Search;
