"use client";
import { gsap, useGSAP } from "@/lib/gsap";
import { useFilter } from "@/components/providers/filter-provider";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
    const { setFilter } = useFilter();

    const { contextSafe } = useGSAP();

    const goHome = contextSafe(() => {
        setFilter("all");
        gsap.to(window, { duration: 0.8, ease: "power2.inOut", scrollTo: { y: 0 } });
    });

    const goContact = contextSafe(() => {
        gsap.to(window, {
            duration: 0.8,
            ease: "power2.inOut",
            scrollTo: { y: "#contact" },
        });
    });

    return (
        <header className="w-full flex justify-between items-center px-4 sm:px-5 py-4 sm:py-6 border-2 border-b-primary">
            <button
                type="button"
                onClick={goHome}
                aria-label="Go to home"
                className="text-sm sm:text-base font-black tracking-wide hover:opacity-70 transition-opacity"
            >
                hyungi.
            </button>
            <div className="flex items-center gap-4 sm:gap-6">
                <button
                    type="button"
                    onClick={goContact}
                    aria-label="Go to contact section"
                    className="text-xs sm:text-sm font-semibold uppercase tracking-wide hover:opacity-70 transition-opacity"
                >
                    Contact
                </button>
                <ModeToggle />
            </div>
        </header>
    );
}