import { Exhibition } from "@/lib/exhibitions";

interface GroupedExhibitions {
  current: Exhibition[];
  future: Exhibition[];
  past: Record<string, Exhibition[]>;
}

export const groupExhibitionsByDate = (exhibitions: Exhibition[]) => {
  const groupedExhibitions: GroupedExhibitions = {
    current: [],
    future: [],
    past: {},
  };
  exhibitions.map((exhibition) => {
    const currentDate = new Date();
    const startDate = new Date(exhibition.startDate);
    const endDate = new Date(exhibition.endDate);

    if (startDate > currentDate) {
      groupedExhibitions.future.push(exhibition);
      return;
    }
    if (startDate < currentDate && endDate > currentDate) {
      groupedExhibitions.current.push(exhibition);
      return;
    }

    const year = startDate.getUTCFullYear().toString();

    if (!groupedExhibitions.past[year]) {
      groupedExhibitions.past[year] = [];
    }
    groupedExhibitions.past[year].push(exhibition);
    return;
  });

  return groupedExhibitions;
};
