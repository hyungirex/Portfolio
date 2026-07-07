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
        gsap.to(window, {
            duration: 0.8,
            ease: "power2.inOut",
            scrollTo: { y: 0 },
        });
    });

    const goHome = () => {
        setFilter("all");
        scrollToTop();
    };
    const showWebsite = () => {
        setFilter("website");
        scrollToTop();
    };
    const showGallery = () => {
        setFilter("gallery");
        scrollToTop();
    };
    const showSketches = () => {
        setFilter("sketch");
        scrollToTop();
    };
    const showVideo = () => {
        setFilter("video");
        scrollToTop();
    };
    const showPhoto = () => {
        setFilter("photo");
        scrollToTop();
    };
    const show3D = () => {
        setFilter("threed");
        scrollToTop();
    };
    const goContact = () => {
        gsap.to(window, {
            duration: 1,
            ease: "power2.inOut",
            scrollTo: { y: "#contact", offsetY: 24 },
        });
    };

    const active = "bg-primary text-secondary";
    const idle = "text-muted-foreground";

    return (
        <div ref={pillRef} className="fixed bottom-6 left-0 w-full flex justify-center z-50">
            <div className="border-2 border-primary rounded-full flex items-center gap-1 bg-card p-1">
                <button
                    type="button"
                    aria-label="Home"
                    aria-pressed={filter === "all"}
                    onClick={goHome}
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${filter === "all" ? active : idle}`}
                >
                    <Home size={20} strokeWidth={1.8} />
                </button>
                <button
                    type="button"
                    aria-label="Website Work"
                    aria-pressed={filter === "website"}
                    onClick={showWebsite}
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${filter === "website" ? active : idle}`}
                >
                    <Wallpaper size={20} strokeWidth={1.8} />
                </button>
                <button
                    type="button"
                    aria-label="Design Gallery"
                    aria-pressed={filter === "gallery"}
                    onClick={showGallery}
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${filter === "gallery" ? active : idle}`}
                >
                    <Paintbrush size={20} strokeWidth={1.8} />
                </button>
                <button
                    type="button"
                    aria-label="Sketch Gallery"
                    aria-pressed={filter === "sketch"}
                    onClick={showSketches}
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${filter === "sketch" ? active : idle}`}
                >
                    <Pencil size={20} strokeWidth={1.8} />
                </button>
                <button
                    type="button"
                    aria-label="Video Work"
                    aria-pressed={filter === "video"}
                    onClick={showVideo}
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${filter === "video" ? active : idle}`}
                >
                    <Video size={20} strokeWidth={1.8} />
                </button>
                <button
                    type="button"
                    aria-label="Photo Work"
                    aria-pressed={filter === "photo"}
                    onClick={showPhoto}
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${filter === "photo" ? active : idle}`}
                >
                    <Camera size={20} strokeWidth={1.8} />
                </button>
                <button
                    type="button"
                    aria-label="3D Work"
                    aria-pressed={filter === "threed"}
                    onClick={show3D}
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${filter === "threed" ? active : idle}`}
                >
                    <Box size={20} strokeWidth={1.8} />
                </button>
                <button
                    type="button"
                    aria-label="Contact"
                    onClick={goContact}
                    className="p-2 rounded-full text-muted-foreground transition-transform duration-200 hover:scale-110"
                >
                    <Contact size={20} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
}