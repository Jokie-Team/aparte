"use client";
import { useState } from 'react';
import Search from '../search/search';
import { Body, Heading4 } from '../headings/headings';

interface Exhibition {
  category: string;
  years?: {
    year: number;
    titles: string[];
  }[];
  titles?: string[];
}

interface Artist {
  letter: string;
  names: string[];
}

interface SidebarProps {
  type: 'exhibitions' | 'artists';
  exhibitions?: Exhibition[];
  artists?: Artist[];
}

const Sidebar: React.FC<SidebarProps> = ({ type, exhibitions, artists }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filterTitles = (titles: string[]) => {
    return titles.filter((title) => title.toLowerCase().includes(search));
  };

  const renderExhibitions = () => {
    return (
      <div>
        {exhibitions?.map((expo) => (
          expo.years ? (
            <div key={expo.category}>
              <Heading4>{expo.category}</Heading4>
              <div className="mb-12 border-b border-gray-200" />
              {expo.years.map((year) => (
                <div key={year.year}>
                  <div className="flex flex-row justify-between">
                    <Body>{year.year}</Body>
                    <ul>
                      {filterTitles(year.titles).length > 0 &&
                        filterTitles(year.titles).map((title, index) => (
                          <li
                            key={title}
                            className={`h-12 w-52 flex items-center justify-between border-b border-gray-200 text-gray-800 hover:text-black font-normal ${index === 0 ? 'border-t' : ''
                              }`}
                          >
                            {title}
                          </li>
                        ))}
                    </ul>
                  </div>
                  {expo.years && expo.years.indexOf(year) !== expo.years.length - 1 && (
                    <div className="my-12 border-b border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div key={expo.category} className="flex flex-row justify-between">
                <Heading4>{expo.category}</Heading4>
                <ul>
                  {filterTitles(expo.titles || []).length > 0 && (
                    filterTitles(expo.titles || []).map((title, index) => (
                      <li
                        key={title}
                        className={`h-12 w-52 flex items-center justify-between border-b border-gray-200 text-gray-800 hover:text-black font-normal ${index === 0 ? 'border-t' : ''
                          }`}
                      >
                        {title}
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div className="my-12 border-b border-gray-300" />
            </div>

          )
        ))}
      </div>
    );
  };


  const filterNames = (names: string[]) => {
    return names.filter((name) => name.toLowerCase().includes(search));
  };

  const renderArtists = () => {
    return (
      <div>
        {artists?.map((artist) => (
          <div>
            <div key={artist.letter} className="flex flex-row justify-between">
              <Heading4>{artist.letter}</Heading4>
              <ul>
                {filterNames(artist.names).length > 0 && (
                  filterNames(artist.names).map((name, index) => (
                    <li
                      key={name}
                      className={`h-12 w-52 flex items-center justify-between border-b border-gray-200 text-gray-800 hover:text-black font-normal ${index === 0 ? 'border-t' : ''
                        }`}
                    >
                      {name}
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="my-12 border-b border-gray-300" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <aside className="bg-gray-50 my-10 ml-12 mr-24 space-y-12 w-80">
      <Search searchValue={search} handleSearchChange={handleSearchChange} />

      {type === 'exhibitions' ? renderExhibitions() : renderArtists()}
    </aside>
  );
};

export default Sidebar;
