"use client";

import { useRef } from "react";
import { Home, Wallpaper, Paintbrush, Pencil, Video, Camera, Contact, Box } from "lucide-react";
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

    const goHome = () => { setFilter("all"); scrollToTop(); };
    const showWebsite = () => { setFilter("website"); scrollToTop(); };
    const showGallery = () => { setFilter("gallery"); scrollToTop(); };
    const showSketches = () => { setFilter("sketch"); scrollToTop(); };
    const showVideo = () => { setFilter("video"); scrollToTop(); };
    const showPhoto = () => { setFilter("photo"); scrollToTop(); };
    const show3D = () => { setFilter("threed"); scrollToTop(); };
    const goContact = () => {
        gsap.to(window, { duration: 1, ease: "power2.inOut", scrollTo: { y: "#contact", offsetY: 24 } });
    };

    const active = "bg-primary text-secondary";
    const idle = "text-muted-foreground";

    const items = [
        { label: "Home", icon: Home, onClick: goHome, isActive: filter === "all" },
        { label: "Website Work", icon: Wallpaper, onClick: showWebsite, isActive: filter === "website" },
        { label: "Design Gallery", icon: Paintbrush, onClick: showGallery, isActive: filter === "gallery" },
        { label: "Sketch Gallery", icon: Pencil, onClick: showSketches, isActive: filter === "sketch" },
        { label: "Video Work", icon: Video, onClick: showVideo, isActive: filter === "video" },
        { label: "Photo Work", icon: Camera, onClick: showPhoto, isActive: filter === "photo" },
        { label: "3D Work", icon: Box, onClick: show3D, isActive: filter === "threed" },
    ];

    return (
        <div
            ref={pillRef}
            className="fixed bottom-0 sm:bottom-6 left-0 w-full flex justify-center z-50 pb-[env(safe-area-inset-bottom)] sm:pb-0"
        >
            {/*
              Mobile (< sm): full-width tab bar, flush with the screen edge, square corners, top border only.
              Tablet/desktop (sm+): floating rounded pill, centered, border all around.
            */}
            <div
                className="flex items-center justify-around sm:justify-center w-full sm:w-auto
                           gap-0 sm:gap-1 bg-card border-t-2 sm:border-2 border-primary
                           rounded-none sm:rounded-full px-1 py-2 sm:p-1"
            >
                {items.map(({ label, icon: Icon, onClick, isActive }) => (
                    <button
                        key={label}
                        type="button"
                        aria-label={label}
                        aria-pressed={isActive}
                        onClick={onClick}
                        className={`flex-1 sm:flex-none flex items-center justify-center p-2 rounded-full transition-all duration-200 hover:scale-110 ${isActive ? active : idle}`}
                    >
                        <Icon size={20} strokeWidth={1.8} />
                    </button>
                ))}
                <button
                    type="button"
                    aria-label="Contact"
                    onClick={goContact}
                    className="flex-1 sm:flex-none flex items-center justify-center p-2 rounded-full text-muted-foreground transition-transform duration-200 hover:scale-110"
                >
                    <Contact size={20} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
}