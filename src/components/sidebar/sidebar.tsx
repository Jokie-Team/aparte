"use client";
import { useState } from 'react';
import Search from '../search/search';
import { Body, Heading4 } from '../headings/headings';

interface ExhibitionItem {
  title: string;
  description: string;
  artists: string;
  dates: string;
  imageUrl: string;
}

interface Exhibition {
  category: string;
  years?: {
    year: number;
    exhibitions: ExhibitionItem[];
  }[];
  exhibitions?: ExhibitionItem[];
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

  const getTitlesByYear = (exhibitions: Exhibition[]) => {
    const titlesByYear: Record<number, string[]> = {};

    exhibitions.forEach((expo) => {
      expo.years?.forEach((yearData) => {
        if (!titlesByYear[yearData.year]) {
          titlesByYear[yearData.year] = [];
        }
        const titles = yearData.exhibitions.map((exhibition) => exhibition.title);
        titlesByYear[yearData.year].push(...titles);
      });
    });

    return titlesByYear;
  };

  const getTitlesWithoutYear = (exhibitions: Exhibition[]) => {
    const titlesWithoutYear: Record<string, string[]> = {};

    exhibitions.forEach((expo) => {
      if (expo.exhibitions && !expo.years) {
        titlesWithoutYear[expo.category] = expo.exhibitions.map((exhibition) => exhibition.title);
      }
    });

    return titlesWithoutYear;
  };

  const renderExhibitions = () => {
    const titlesByYear = getTitlesByYear(exhibitions || []);
    const titlesWithoutYear = getTitlesWithoutYear(exhibitions || []);

    return (
      <div>
        {exhibitions?.map((expo) => (
          expo.years ? (
            <div key={expo.category}>
              <Heading4>{expo.category}</Heading4>
              <div className="mt-6 mb-12 border-b border-gray-200" />
              {expo.years.map((year) => (
                <div key={year.year}>
                  <div className="flex flex-row justify-between">
                    <Body>{year.year}</Body>
                    <ul>
                      {filterTitles(titlesByYear[year.year]).length > 0 &&
                        filterTitles(titlesByYear[year.year]).map((title, index) => (
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
                  {filterTitles(titlesWithoutYear[expo.category]).length > 0 && (
                    filterTitles(titlesWithoutYear[expo.category]).map((title, index) => (
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
    <aside className="space-y-12 w-2/5">
      <Search searchValue={search} handleSearchChange={handleSearchChange} />

      {type === 'exhibitions' ? renderExhibitions() : renderArtists()}
    </aside>
  );
};

export default Sidebar;
