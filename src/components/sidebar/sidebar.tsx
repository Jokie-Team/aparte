// "use client";
// import { useMemo, useState } from "react";
// import { SearchInput } from "../searchInput/searchInput";
// import { Body, Heading4 } from "../headings/headings";
// import { ArtistsGroupedByLetter } from "@/src/app/[locale]/(aparte)/artists/page";
// import { Artist } from "@/lib/artists";

// interface ExhibitionItem {
//   title: string;
//   description: string;
//   artists: string;
//   dates: string;
//   imageUrl: string;
// }

// interface Exhibition {
//   category: string;
//   years?: {
//     year: number;
//     exhibitions: ExhibitionItem[];
//   }[];
//   exhibitions?: ExhibitionItem[];
// }

// export type ArtistsGroupedByLetter = Record<string, Artist[]>;

// interface SidebarProps {
//   type: "exhibitions" | "artists";
//   exhibitions?: Exhibition[];
//   artists?: Artist[];
// }

// const Sidebar: React.FC<SidebarProps> = ({ type, exhibitions, artists }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value.toLowerCase());
//   };

//   // const filterTitles = (titles: string[]) => {
//   //   return titles.filter((title) => title.toLowerCase().includes(searchTerm));
//   // };

//   // const getTitlesByYear = (exhibitions: Exhibition[]) => {
//   //   const titlesByYear: Record<number, string[]> = {};

//   //   exhibitions.forEach((expo) => {
//   //     expo.years?.forEach((yearData) => {
//   //       if (!titlesByYear[yearData.year]) {
//   //         titlesByYear[yearData.year] = [];
//   //       }
//   //       const titles = yearData.exhibitions.map(
//   //         (exhibition) => exhibition.title
//   //       );
//   //       titlesByYear[yearData.year].push(...titles);
//   //     });
//   //   });

//   //   return titlesByYear;
//   // };

//   // const getTitlesWithoutYear = (exhibitions: Exhibition[]) => {
//   //   const titlesWithoutYear: Record<string, string[]> = {};

//   //   exhibitions.forEach((expo) => {
//   //     if (expo.exhibitions && !expo.years) {
//   //       titlesWithoutYear[expo.category] = expo.exhibitions.map(
//   //         (exhibition) => exhibition.title
//   //       );
//   //     }
//   //   });

//   //   return titlesWithoutYear;
//   // };

//   // const renderExhibitions = () => {
//   //   const titlesByYear = getTitlesByYear(exhibitions || []);
//   //   const titlesWithoutYear = getTitlesWithoutYear(exhibitions || []);

//   //   return (
//   //     <div>
//   //       {exhibitions?.map((expo) =>
//   //         expo.years ? (
//   //           <div key={expo.category}>
//   //             <Heading4>{expo.category}</Heading4>
//   //             <div className="mt-6 mb-12 border-b border-gray-200" />
//   //             {expo.years.map((year) => (
//   //               <div key={year.year}>
//   //                 <div className="flex flex-row justify-between">
//   //                   <Body>{year.year}</Body>
//   //                   <ul>
//   //                     {filterTitles(titlesByYear[year.year]).length > 0 &&
//   //                       filterTitles(titlesByYear[year.year]).map(
//   //                         (title, index) => (
//   //                           <li
//   //                             key={title}
//   //                             className={`h-12 w-52 flex items-center justify-between border-b border-gray-200 text-gray-800 hover:text-black font-normal ${
//   //                               index === 0 ? "border-t" : ""
//   //                             }`}
//   //                           >
//   //                             {title}
//   //                           </li>
//   //                         )
//   //                       )}
//   //                   </ul>
//   //                 </div>
//   //                 {expo.years &&
//   //                   expo.years.indexOf(year) !== expo.years.length - 1 && (
//   //                     <div className="my-12 border-b border-gray-200" />
//   //                   )}
//   //               </div>
//   //             ))}
//   //           </div>
//   //         ) : (
//   //           <div>
//   //             <div
//   //               key={expo.category}
//   //               className="flex flex-row justify-between"
//   //             >
//   //               <Heading4>{expo.category}</Heading4>
//   //               <ul>
//   //                 {filterTitles(titlesWithoutYear[expo.category]).length > 0 &&
//   //                   filterTitles(titlesWithoutYear[expo.category]).map(
//   //                     (title, index) => (
//   //                       <li
//   //                         key={title}
//   //                         className={`h-12 w-52 flex items-center justify-between border-b border-gray-200 text-gray-800 hover:text-black font-normal ${
//   //                           index === 0 ? "border-t" : ""
//   //                         }`}
//   //                       >
//   //                         {title}
//   //                       </li>
//   //                     )
//   //                   )}
//   //               </ul>
//   //             </div>
//   //             <div className="my-12 border-b border-gray-300" />
//   //           </div>
//   //         )
//   //       )}
//   //     </div>
//   //   );
//   // };

//   // const filterNames = (names: string[]) => {
//   //   return names.filter((name) => name.toLowerCase().includes(searchTerm));
//   // };

//   const groupedArtists = useMemo(() => {
//     if (!artists) return [];
//     return artists.reduce<ArtistsGroupedByLetter>((acc, artist) => {
//       const firstLetter = artist.name[0].toUpperCase();
//       if (!acc[firstLetter]) acc[firstLetter] = [];
//       acc[firstLetter].push(artist);
//       return acc;
//     });
//   }, [artists]);

//   const filteredArtists = useMemo(() => {
//     if (!artists) return [];
//     if (!searchTerm) return artists;

//     const filtered: ArtistsGroupedByLetter = {};
//     for (const [letter, group] of Object.entries(artists)) {
//       const matchingArtists = group.filter((artist) =>
//         artist.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       if (matchingArtists.length) filtered[letter] = matchingArtists;
//     }
//     return filtered;
//   }, [artists, searchTerm]);

//   const renderArtists = () => {
//     return (
//       <div>
//         {Object.entries(filteredArtists)?.map(([letter, artists]) => (
//           <div key={letter}>
//             <div className="flex flex-row justify-between">
//               <Heading4>{letter}</Heading4>
//               <ul>
//                 {artists.map((artist: Artist, index: number) => (
//                   <li
//                     key={artist.name}
//                     className={`h-12 w-52 flex items-center justify-between border-b border-gray-200 text-gray-800 hover:text-black font-normal ${
//                       index === 0 ? "border-t" : ""
//                     }`}
//                   >
//                     {artist.name}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="my-12 border-b border-gray-300" />
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <aside className="space-y-12 w-2/5">
//       <SearchInput value={searchTerm} handleSearchChange={handleSearchChange} />
//       {/* {type === "exhibitions" ? renderExhibitions() : renderArtists()} */}
//       {renderArtists()}
//     </aside>
//   );
// };

// export default Sidebar;
