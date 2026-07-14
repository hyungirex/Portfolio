"use client";
import { useRef } from "react";
import { Wallpaper, Paintbrush, Camera, Contact, Box } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useFilter } from "@/components/providers/filter-provider";

export default function BubbleHead() {
    const pillRef = useRef<HTMLDivElement>(null);
    const { filter, setFilter } = useFilter();

    const { contextSafe } = useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(pillRef.current, {
                    autoAlpha: 0,
                    y: 24,
                    duration: 0.6,
                    delay: 0.5,
                    ease: "power3.out",
                });
            });
            return () => mm.revert();
        },
        { scope: pillRef }
    );

    const scrollToTop = contextSafe(() => {
        gsap.to(window, { duration: 0.8, ease: "power2.inOut", scrollTo: { y: 0 } });
    });

    // Home removed: tapping the logo/header should call setFilter("all") + scrollToTop.
    // If your Header component doesn't do this yet, wire it there — that's the
    // standard place users expect "go home" to live, freeing up room down here.
    const showWebsite = () => { setFilter("website"); scrollToTop(); };
    const showDesign = () => { setFilter("design"); scrollToTop(); };
    const showMedia = () => { setFilter("media"); scrollToTop(); };
    const show3D = () => { setFilter("threed"); scrollToTop(); };
    const goContact = () => {
        gsap.to(window, { duration: 1, ease: "power2.inOut", scrollTo: { y: "#contact", offsetY: 24 } });
    };

    const active = "text-primary";
    const idle = "text-muted-foreground";

    const items = [
        { label: "Websites", icon: Wallpaper, onClick: showWebsite, isActive: filter === "website" },
        { label: "Design", icon: Paintbrush, onClick: showDesign, isActive: filter === "design" },
        { label: "Media", icon: Camera, onClick: showMedia, isActive: filter === "media" },
        { label: "3D", icon: Box, onClick: show3D, isActive: filter === "threed" },
    ];

    return (
        <div
            ref={pillRef}
            className="fixed bottom-0 left-0 w-full flex justify-center z-50 pb-[env(safe-area-inset-bottom)] pointer-events-none sm:hidden"
        >
            <div className="flex items-center w-full bg-card border-t-2 border-primary px-1 py-1.5 pointer-events-auto">
                {items.map(({ label, icon: Icon, onClick, isActive }) => (
                    <button
                        key={label}
                        type="button"
                        aria-pressed={isActive}
                        onClick={onClick}
                        className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-1 rounded-md transition-colors duration-200 ${isActive ? active : idle}`}
                    >
                        <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
                        <span className={`text-[10px] leading-none ${isActive ? "font-bold" : "font-medium"}`}>
                            {label}
                        </span>
                    </button>
                ))}

                <button
                    type="button"
                    aria-label="Contact"
                    onClick={goContact}
                    className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1 rounded-md text-muted-foreground"
                >
                    <Contact size={19} strokeWidth={1.8} />
                    <span className="text-[10px] leading-none font-medium">Contact</span>
                </button>
            </div>
        </div>
    );
}