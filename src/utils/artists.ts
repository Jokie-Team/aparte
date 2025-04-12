import { Artist } from "@/lib/artists";
import { normalizeText } from "./common";

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
  searchTerm: string
): Artist[] => {
  const terms = searchTerm
    .split(",")
    .map((term) => normalizeText(term.trim()))
    .filter((term) => term);

  if (!terms.length) return artists;

  return artists.filter((artist) =>
    terms.some((term) => normalizeText(artist.name).includes(term))
  );
};
export { normalizeText };

