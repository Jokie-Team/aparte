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

export const normalizeName = (name: string) => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
};

export const filterArtistsBySearchTerms = (
  artists: Artist[],
  searchTerm: string
): Artist[] => {
  const terms = searchTerm
    .split(",")
    .map((term) => normalizeName(term.trim()))
    .filter((term) => term);

  if (!terms.length) return artists;

  return artists.filter((artist) =>
    terms.some((term) => normalizeName(artist.name).includes(term))
  );
};
