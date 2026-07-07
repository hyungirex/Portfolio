"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function HeroIntro() {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(".intro-item", {
                    autoAlpha: 0,
                    y: 20,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: "power3.out",
                });
            });
            return () => mm.revert();
        },
        { scope: rootRef }
    );

    return (
        <div ref={rootRef} id="home" className="w-full max-w-2xl px-5 pr-20 pt-12 pb-15">
            <h1 className="intro-item text-2xl font-bold">
                Hey, I&apos;m Rex Vincent Santos
            </h1>
            <p className="intro-item text-sm mt-2 leading-relaxed text-muted-foreground">
                I grew up with a pencil in hand. Video games pointed it toward tech.
                <span className="font-semibold"> Now I&apos;ve got both hands full. Curious to see where that leads.</span>
            </p>
        </div>
    );
}