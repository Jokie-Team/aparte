import { Artist } from "@/lib/artists";

export type ArtistsGroupedByLetter = Record<string, Artist[]>;

export function groupByFirstLetter(artists: Artist[]): ArtistsGroupedByLetter {
  return artists.reduce<ArtistsGroupedByLetter>((acc, artist) => {
    const firstLetter = artist.name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(artist);
    return acc;
  }, {});
}

export const filterArtistsBySearchTerms = (
  artists: Artist[],
  searchInputTerm: string
) =>
  artists.filter((artist) => {
    const tokens = searchInputTerm.split(" ");
    return tokens.some((token) => artist.name.toLowerCase().includes(token));
  });
