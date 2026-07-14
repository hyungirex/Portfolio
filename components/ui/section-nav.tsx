"use client";
import { useFilter } from "@/components/providers/filter-provider";

const sections = [
    { label: "Home", value: "all" },
    { label: "Websites", value: "website" },
    { label: "Design", value: "design" },
    { label: "Media", value: "media" },
    { label: "3D", value: "threed" },
] as const;

export default function SectionNav() {
    const { filter, setFilter } = useFilter();
    return (
        <nav
            aria-label="Project filters"
            className="hidden sm:flex justify-end gap-5 px-3 pb-4 pt-2"
        >
            {sections.map(({ label, value }) => {
                const isActive = filter === value;
                return (
                    <button
                        key={value}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setFilter(value)}
                        className={`text-sm transition-colors duration-200 ${
                            isActive
                                ? "font-bold underline underline-offset-4 text-primary"
                                : "text-muted-foreground hover:text-primary"
                        }`}
                    >
                        {label}
                    </button>
                );
            })}
        </nav>
    );
}