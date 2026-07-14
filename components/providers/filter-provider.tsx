"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type FilterKey = "all" | "website" | "design" | "media" | "threed";

type FilterContextValue = {
    filter: FilterKey;
    setFilter: (filter: FilterKey) => void;
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
    const [filter, setFilter] = useState<FilterKey>("all");
    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    const ctx = useContext(FilterContext);
    if (!ctx) throw new Error("useFilter must be used within a FilterProvider");
    return ctx;
}