"use client";
import { useMemo, useState } from "react";
import { SearchInput } from "../searchInput/searchInput";
import { Exhibition } from "@/lib/exhibitions";
import { groupExhibitionsByDate } from "@/src/utils/exhibitions";
import { usePathname, useRouter } from "next/navigation";
import { Arrow } from "../icons/arrow";
import React from "react";

interface ExhibitionsSidebarProps {
  exhibitions: Exhibition[];
  translations: {
    emptyState: string;
    current: string;
    future: string;
    past: string;
    search: string;
  };
  searchValue?: string;
}

const ExhibitionsSidebar: React.FC<ExhibitionsSidebarProps> = ({
  exhibitions,
  translations,
  searchValue,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(searchValue || "");
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
    const sortedPast: [string, Exhibition[]][] = Object.entries(
      groupedExhibitions.past
    )
      .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
      .map(([year, exhibitions]) => {
        const filteredAndSorted = exhibitions
          .filter((exhibition) =>
            exhibition.title.toLowerCase().includes(searchTerm)
          )
          .sort(
            (a, b) =>
              new Date(b.startDate || 0).getTime() -
              new Date(a.startDate || 0).getTime()
          );
        return [year, filteredAndSorted];
      });

    return {
      current: groupedExhibitions.current.filter((exhibition) =>
        exhibition.title.toLowerCase().includes(searchTerm)
      ),
      future: groupedExhibitions.future.filter((exhibition) =>
        exhibition.title.toLowerCase().includes(searchTerm)
      ),
      past: sortedPast,
    };
  }, [groupedExhibitions, searchTerm]);

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    const headerOffset = 128;
    const elementPosition = element?.getBoundingClientRect().top || 0;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <aside className="space-y-12">
      <SearchInput
        value={searchTerm}
        handleSearchChange={handleSearchChange}
        search={translations.search}
      />

      {filteredExhibitions.current.length === 0 &&
        filteredExhibitions.future.length === 0 &&
        Object.keys(filteredExhibitions.past).length === 0 && (
          <p className="text-gray-500">{translations.emptyState}</p>
        )}

      {filteredExhibitions.current.length > 0 && (
        <div>
          <div className="flex flex-row justify-between gap-10">
            <h4>{translations.current}</h4>
            <ul className="w-2/3">
              {filteredExhibitions.current.map((exhibition, index) => (
                <li
                  key={exhibition.id}
                  className={`w-full py-3 flex items-center justify-between border-b border-gray-200 text-gray-800 hover:text-black font-normal ${
                    index === 0 ? "border-t" : ""
                  } group transition-all duration-300 hover:py-6`}
                >
                  <button
                    key={exhibition.id}
                    onClick={() =>
                      scrollToElement(
                        `exhibition-${exhibition.title
                          .replaceAll(" ", "-")
                          .toLowerCase()}`
                      )
                    }
                    className="w-full text-left flex flex-row justify-between items-center"
                  >
                    <span className="truncate group-hover:overflow-visible group-hover:whitespace-normal">
                      {exhibition.title}
                    </span>
                    <span className="opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <Arrow
                        size={24}
                        direction="right"
                        className="fill-black"
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="my-12 border-b border-gray-200" />
        </div>
      )}

      {filteredExhibitions.future.length > 0 && (
        <div>
          <div className="flex flex-row justify-between gap-10">
            <h4>{translations.future}</h4>
            <ul className="w-2/3">
              {filteredExhibitions.future.map((exhibition, index) => (
                <li
                  key={exhibition.id}
                  className={`w-full py-3 flex items-center justify-between border-b border-gray-200 text-gray-800 hover:text-black font-normal ${
                    index === 0 ? "border-t" : ""
                  } group transition-all duration-300 hover:py-6`}
                >
                  <button
                    key={exhibition.id}
                    onClick={() =>
                      scrollToElement(
                        `exhibition-${exhibition.title
                          .replaceAll(" ", "-")
                          .toLowerCase()}`
                      )
                    }
                    className="w-full text-left flex flex-row justify-between items-center"
                  >
                    <span className="truncate group-hover:overflow-visible group-hover:whitespace-normal">
                      {exhibition.title}
                    </span>
                    <span className="opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <Arrow
                        size={24}
                        direction="right"
                        className="fill-black"
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="my-12 border-b border-gray-200" />
        </div>
      )}

      {filteredExhibitions.past.some(
        ([year, exhibitionsByYear]) => year && exhibitionsByYear.length > 0
      ) && (
        <div>
          <h4>{translations.past}</h4>
          <div className="border-b border-gray-200 mt-6 mb-12"></div>
          {filteredExhibitions.past.map(([year, exhibitionsByYear]) =>
            exhibitionsByYear.length > 0 ? (
              <React.Fragment key={year}>
                <div className="flex flex-row justify-between gap-10">
                  <h5>{year}</h5>
                  <ul className="w-2/3">
                    {exhibitionsByYear.map((exhibition, index) => (
                      <li
                        key={exhibition.id}
                        className={`w-full py-3 flex items-center justify-between border-b border-gray-200 text-gray-800 hover:text-black font-normal ${
                          index === 0 ? "border-t" : ""
                        } group transition-all duration-300 hover:py-6`}
                      >
                        <button
                          key={exhibition.id}
                          onClick={() => scrollToElement(exhibition.id)}
                          className="w-full text-left flex flex-row justify-between items-center"
                        >
                          <span className="truncate group-hover:overflow-visible group-hover:whitespace-normal">
                            {exhibition.title}
                          </span>
                          <span className="opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <Arrow
                              size={24}
                              direction="right"
                              className="fill-black"
                            />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="my-12 border-b border-gray-200" />
              </React.Fragment>
            ) : null
          )}
        </div>
      )}
    </aside>
  );
};

export default ExhibitionsSidebar;
