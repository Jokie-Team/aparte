"use client";
import { useMemo, useState } from "react";
import { SearchInput } from "../searchInput/searchInput";
import { Exhibition } from "@/lib/exhibitions";
import { groupExhibitionsByDate } from "@/src/utils/exhbitions";
import { usePathname, useRouter } from "next/navigation";

interface ExhibitionsSidebarProps {
  exhibitions: Exhibition[];
  translations: {
    emptyState: string;
    current: string;
    future: string;
    past: string;
  };
}

const ExhibitionsSidebar: React.FC<ExhibitionsSidebarProps> = ({
  exhibitions,
  translations,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const groupedExhibitions = useMemo(
    () => groupExhibitionsByDate(exhibitions),
    [exhibitions]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    try {
      const params = new URLSearchParams();
      if (value) {
        params.set("search", value);
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const filteredExhibitions = useMemo(() => {
    return {
      current: groupedExhibitions.current.filter((exhibition) =>
        exhibition.title.toLowerCase().includes(searchTerm)
      ),
      future: groupedExhibitions.future.filter((exhibition) =>
        exhibition.title.toLowerCase().includes(searchTerm)
      ),
      past: Object.fromEntries(
        Object.entries(groupedExhibitions.past).map(([year, exhibitions]) => [
          year,
          exhibitions.filter((exhibition) =>
            exhibition.title.toLowerCase().includes(searchTerm)
          ),
        ])
      ),
    };
  }, [groupedExhibitions, searchTerm]);

  return (
    <aside className="space-y-12">
      <SearchInput value={searchTerm} handleSearchChange={handleSearchChange} />
      {filteredExhibitions.current.length === 0 &&
        filteredExhibitions.future.length === 0 &&
        Object.keys(filteredExhibitions.current).length === 0 && (
          <p className="text-gray-500">{translations.emptyState}</p>
        )}
      {filteredExhibitions.current.length > 0 && (
        <>
          <div className="flex flex-row items-center gap-10">
            <h4>{translations.current}</h4>
            <ul className="w-full">
              {filteredExhibitions.current.map((exhibition, index) => {
                return (
                  <li
                    key={exhibition.title}
                    className={`w-full py-3 flex items-center justify-between border-b border-gray-200 text-gray-800 hover:text-black ${
                      index === 0 ? "border-t" : ""
                    }`}
                  >
                    {exhibition.title}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-6 mb-12 border-b border-gray-200" />
        </>
      )}

      {filteredExhibitions.future.length > 0 && (
        <>
          <div className="flex flex-row items-center gap-10">
            <h4>{translations.future}</h4>
            <ul className="w-full">
              {filteredExhibitions.future.map((exhibition, index) => {
                return (
                  <li
                    key={exhibition.title}
                    className={`w-full py-3 flex items-center justify-between border-b border-gray-200 text-gray-800 hover:text-black ${
                      index === 0 ? "border-t" : ""
                    }`}
                  >
                    {exhibition.title}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-6 mb-12 border-b border-gray-200" />
        </>
      )}
      {Object.keys(filteredExhibitions.past).length > 0 &&
        Object.entries(filteredExhibitions.past).map(
          ([year, exhibitionsByYear]) => {
            if (exhibitionsByYear.length > 0) {
              return (
                <div key={year} className="flex flex-row items-center gap-10">
                  <h4>{year}</h4>
                  <ul className="w-full">
                    {exhibitionsByYear.map(
                      (exhibitionByYear: Exhibition, indexItem: number) => {
                        return (
                          <li
                            key={exhibitionByYear.title}
                            className={`w-full py-3 flex items-center justify-between border-b border-gray-200 text-gray-800 hover:text-black ${
                              indexItem === 0 ? "border-t" : ""
                            }`}
                          >
                            {exhibitionByYear.title}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              );
            }
          }
        )}
    </aside>
  );
};

export default ExhibitionsSidebar;
