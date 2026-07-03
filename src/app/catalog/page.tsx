"use client";

import { FormEvent, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CamperCard from "@/components/CamperCard";
import { getCampers } from "@/services/campers";
import type { CampersQueryParams } from "@/types/camper";
import styles from "./CatalogPage.module.css";

const PER_PAGE = 4;

type FiltersState = {
  location: string;
  form: string;
  engine: string;
  transmission: string;
};

const emptyFilters: FiltersState = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

function removeEmptyFilters(filters: FiltersState): CampersQueryParams {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value.trim() !== "")
  ) as CampersQueryParams;
}

export default function CatalogPage() {
  const [draftFilters, setDraftFilters] = useState<FiltersState>(emptyFilters);
  const [activeFilters, setActiveFilters] = useState<CampersQueryParams>({});

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["campers", activeFilters],
    queryFn: ({ pageParam }) =>
      getCampers({
        page: pageParam,
        perPage: PER_PAGE,
        ...activeFilters,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  console.log(error);

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActiveFilters(removeEmptyFilters(draftFilters));
  };

  const handleClearFilters = () => {
    setDraftFilters(emptyFilters);
    setActiveFilters({});
  };

  if (isLoading) {
    return <main className={styles.center}>Loading tracks...</main>;
  }

  if (isError) {
    return <main className={styles.center}>Something went wrong.</main>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <form onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="location">
              Location
            </label>

            <input
              id="location"
              className={styles.input}
              placeholder="Kyiv"
              value={draftFilters.location}
              onChange={(event) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  location: event.target.value,
                }))
              }
            />

            <p className={styles.filterTitle}>Filters</p>

            <div className={styles.group}>
              <h2 className={styles.groupTitle}>Camper form</h2>

              <div className={styles.radioList}>
                {[
                  ["alcove", "Alcove"],
                  ["panelVan", "Panel Van"],
                  ["integrated", "Integrated"],
                  ["semiIntegrated", "Semi Integrated"],
                ].map(([value, label]) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="form"
                      value={value}
                      checked={draftFilters.form === value}
                      onChange={(event) =>
                        setDraftFilters((prev) => ({
                          ...prev,
                          form: event.target.value,
                        }))
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.group}>
              <h2 className={styles.groupTitle}>Engine</h2>

              <div className={styles.radioList}>
                {["diesel", "petrol", "hybrid", "electric"].map((engine) => (
                  <label key={engine}>
                    <input
                      type="radio"
                      name="engine"
                      value={engine}
                      checked={draftFilters.engine === engine}
                      onChange={(event) =>
                        setDraftFilters((prev) => ({
                          ...prev,
                          engine: event.target.value,
                        }))
                      }
                    />
                    {engine[0].toUpperCase() + engine.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.group}>
              <h2 className={styles.groupTitle}>Transmission</h2>

              <div className={styles.radioList}>
                {["automatic", "manual"].map((transmission) => (
                  <label key={transmission}>
                    <input
                      type="radio"
                      name="transmission"
                      value={transmission}
                      checked={draftFilters.transmission === transmission}
                      onChange={(event) =>
                        setDraftFilters((prev) => ({
                          ...prev,
                          transmission: event.target.value,
                        }))
                      }
                    />
                    {transmission[0].toUpperCase() + transmission.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <button className={styles.searchButton} type="submit">
              Search
            </button>

            <button
              className={styles.clearButton}
              type="button"
              onClick={handleClearFilters}
            >
              × Clear filters
            </button>
          </form>
        </aside>

        <section className={styles.listWrapper}>
          {campers.length > 0 ? (
            <>
              <ul className={styles.list}>
                {campers.map((camper) => (
                  <li key={camper.id}>
                    <CamperCard camper={camper} />
                  </li>
                ))}
              </ul>

              {hasNextPage && (
                <button
                  className={styles.loadMore}
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Loading..." : "Load more"}
                </button>
              )}
            </>
          ) : (
            <div className={styles.empty}>
              <h2>No campers found</h2>
              <p>
                We couldnt find any campers that match your filters.
                <br />
                Try adjusting your search or clearing some filters.
              </p>

              <div className={styles.emptyActions}>
                <button className={styles.clearSmall} onClick={handleClearFilters}>
                  × Clear filters
                </button>

                <button className={styles.viewAll} onClick={handleClearFilters}>
                  View all campers
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}