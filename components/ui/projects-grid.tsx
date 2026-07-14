/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useFilter } from "@/components/providers/filter-provider";
import SectionNav from "@/components/ui/section-nav";

type Section = "website" | "design" | "media" | "threed";

type Project = {
    title: string;
    category: string;
    description?: string;
    techStack?: string[];
    image: string;
    section: Section;
    video?: string;
    link?: string;
};

const projects: Project[] = [
    { title: "Consrv", category: "Website", description: "Capstone project for Barangay Bambang, establishing an IoT system designed to recycle rainwater into usable water for general purposes except consumption.", techStack: ["React", "Tailwind", "Supabase", "TypeScript", "C++"], image: "/projects/consrv.png", section: "website", link: "https://www.consrv.online/" },
    { title: "Barangay San Miguel CMS", category: "Website", description: "A community management system for Barangay San Miguel, designed to streamline communication and information sharing within the community.", techStack: ["HTML", "CSS", "JavaScript", "PHP", "Node.js", "MySQL"], image: "/projects/san-mig.png", section: "website" },
    { title: "Slab UI", category: "Component Library", description: "A component library for building modern web applications with a bold twist, following a neobrutalism aesthetic akin to artistic websites like Figma and Gumroad.", techStack: ["React", "Tailwind", "shadcn/ui"], image: "/projects/slab-ui.png", section: "website", link: "https://slab-ui.vercel.app/"},
    { title: "CAV-RHS", category: "Website", description: "A digital CAV creation website for Rizal High School's registrar department, to remove the need for manual data entry for each CAV document and make way for automation.", techStack: ["React", "Tailwind", "Supabase", "TypeScript"], image: "/projects/cav-rhs.png", section: "website", link: "https://cav-rhs.vercel.app/" },
    { title: "Raze", category: "Website", description: "A case study note website created for students to organize their thoughts and ideas while allowing them to test said thoughts with quizzes and flashcards made by the system.", techStack: ["React", "Tailwind", "Supabase", "TypeScript"], image: "/projects/raze.png", section: "website", link: "https://azrel.vercel.app/" },
    { title: "Pong C++", category: "Desktop Application", description: "My very first desktop application during my years as a freshman. It's a simple ping pong game built with C++ and visually enhanced using SFML and Aseprite, fully interactive.", techStack: ["C++", "SFML"], image: "/projects/pong-cpp.png", section: "website" },
    { title: "Coursify", category: "Website Prototype", description: "A website prototype, which inspired Raze moving forward, wherein it's a Learning Management System with built-in notes and quizzes, inspired by Google Classroom and quiz websites.", techStack: ["Figma", "Inkscape"], image: "/projects/prototype-design.png", section: "website", link: "https://www.figma.com/design/PZgQuecPjWiXv3cGr3aLoX/Coursify?node-id=0-1&p=f&t=e7lGh8ZiiZoTl4n1-0"},
    { title: "Brushwork", category: "Website Prototype", description: "A website prototype, which inspired my Slab UI library, that follows a neobrutalist style of web design for an online store selling illustrations.", techStack: ["Figma", "Inkscape", "Clip Studio Paint"], image: "/projects/brushwork-proto.png", section: "website", link: "https://www.figma.com/design/u7QQeg9SkH2BYjB6eqiPvW/Techno?node-id=0-1&t=FwIa6oetau0flsZd-1"},
    { title: "Barangay San Miguel", category: "Website Prototype", description: "This is where Barangay San Miguel CMS began, a simple UI design to follow through during web development.", techStack: ["Figma"], image: "/projects/sm-prototype.png", section: "website", link: "https://www.figma.com/design/QZXYTdkugI4c3LAWfNELk3/Barangay-San-Miguel-CMS?node-id=48-177&t=peJuvFOWCecLDRkS-1"},
    { title: "Pacman Assets", category: "Digital Asset", description: "An Aseprite and pixel art practice creating Pac-Man assets with a Filipino twist, using famous Filipino snacks like kwek-kwek and isaw instead of fruits.", techStack: ["Aseprite"], image: "/projects/pac-man.png", section: "design", link: "/projects/pacman-assets.png"},
    { title: "Music Taste's Mascot", category: "Mascot Design", description: "My very first art commission! It's a huge project of creating the Music Taste mascot along with iterations representing different personality types based on music.", techStack: ["Photoshop, Clip Studio Paint"], image: "/projects/music-taste.gif", section: "design", link: "/projects/music-taste.gif" },
    { title: "Russel's Mascot", category: "Mascot Design", description: "This is Russel, my second mascot commission, created for a character themed around automating recycling as a computer project.", techStack: ["Clip Studio Paint"], image: "/projects/russel.png", section: "design", link: "/projects/russel.png" },
    { title: "Ceaseless Ver. 1", category: "Logo Design", description: "A voluntary commission for Ceaseless Dance Troupe's logo, following a silver motif that reflected their costumes at the time.", techStack: ["Inkscape"], image: "/projects/ceaseless-silvr.png", section: "design", link: "/projects/ceaseless-silvr.png" },
    { title: "Ceaseless Ver. 2", category: "Logo Design", description: "An iteration of Ceaseless Dance Troupe's logo, finalized with a purple and silver color combination.", techStack: ["Inkscape"], image: "/projects/ceaseless-purpl.png", section: "design", link: "/projects/ceaseless-purpl.png" },
    { title: "Raze Logo", category: "Logo Design", description: "The first iteration logo of Raze, my personal case study project.", techStack: ["Inkscape"], image: "/projects/raze-logo.png", section: "design", link: "/projects/raze-logo.png" },
    { title: "Brushwork Logo", category: "Logo Design", description: "The finalized logo of Brushwork, for the prototype.", techStack: ["Inkscape", "Clip Studio Paint"], image: "/projects/brushwork-logo.png", section: "design", link: "/projects/brushwork-logo.png" },
    { title: "Consrv Logo", category: "Logo Design", description: "The advertisement logo of my Capstone Project, Consrv, for documentation and presentation.", techStack: ["Inkscape", "Clip Studio Paint"], image: "/projects/consrv-logo.png", section: "design", link: "/projects/consrv-logo.png" },
    { title: "Consrv Mascot", category: "Mascot Design", description: "A helpful little mascot for new users of the Consrv Dashboard.", techStack: ["Clip Studio Paint"], image: "/projects/consrv-mascot.png", section: "design", link: "/projects/consrv-mascot.png" },
    { title: "Green Warriors Concept", category: "Mockup Design", description: "A conceptual design of Pamantasan ng Lungsod ng Pasig's esports line: Green Warriors' esports shirt.", techStack: ["Photoshop", "Clip Studio Paint", "Inkscape"], image: "/projects/g-warriors.png", section: "design", link: "/projects/g-warriors.png" },
    { title: "Coffee Packaging Concept", category: "Mockup Design", description: "A simple texture practice for a 3D cup model.", techStack: ["Inkscape", "Canva Pro"], image: "/projects/leblanc.png", section: "design", link: "/projects/leblanc.png" },
    { title: "Ceaseless Shirt Cutout", category: "Cutout Design", description: "A voluntary concept in which I created a shirt design that fits their brand, dance and streetwear, with cutouts and a matching color palette.", techStack: ["Clip Studio Paint", "Inkscape"],  image: "/projects/ceaseless-cutout.png", section: "design", link: "/projects/ceaseless-cutout.png" },
    { title: "Registrar Org Chart", category: "Public Material", description: "Published material for the registrar office to help people know who the staff are and who to talk to.", techStack: ["Inkscape", "Canva Pro"], image: "/projects/org-chart.png", section: "design", link: "/projects/org-chart.png" },
    { title: "Jean", category: "Sketch", description: "Illustration is one of my many hobbies. Here's a digital sketch of Jean.", techStack: ["Clip Studio Paint"], image: "/projects/jean-sketch.png", section: "design", link: "/projects/jean-sketch.png"},
    { title: "Lumine", category: "Sketch", description: "A digital illustration of Lumine.", techStack: ["Clip Studio Paint"], image: "/projects/trav-sketch.png", section: "design", link: "/projects/trav-sketch.png"},
    { title: "Lisa", category: "Sketch", description: "A digital illustration of Lisa.", techStack: ["Clip Studio Paint"], image: "/projects/lisa-sketch.png", section: "design", link: "/projects/lisa-sketch.png"},
    { title: "Ollie", category: "Sketch", description: "A digital illustration of Ollie, which Ollie reacted to too!", techStack: ["Clip Studio Paint"], image: "/projects/ollie-sketch.png", section: "design", link: "/projects/ollie-sketch.png"},
    { title: "Ganyu", category: "Sketch", description: "A digital illustration of Ganyu.", techStack: ["Clip Studio Paint"], image: "/projects/ganyu-sketch.png", section: "design", link: "/projects/ganyu-sketch.png"},
    { title: "Mona", category: "Sketch", description: "A digital illustration of Mona.",  techStack: ["Clip Studio Paint"],image: "/projects/mona-sketch.png", section: "design", link: "/projects/mona-sketch.png"},
    { title: "Keqing", category: "Sketch", description: "A digital illustration of Keqing.", techStack: ["Clip Studio Paint"], image: "/projects/keqing-sketch.png", section: "design", link: "/projects/keqing-sketch.png"},
    { title: "Polka", category: "Sketch", description: "A digital illustration of Polka.", techStack: ["Clip Studio Paint"], image: "/projects/polka-sketch.png", section: "design", link: "/projects/polka-sketch.png" },
    { title: "Eye Practice", category: "Sketch", description: "A simple eye practice. :)", techStack: ["Clip Studio Paint"],  image: "/projects/eye-sketch.png", section: "design", link: "/projects/eye-sketch.png" },
    { title: "Lucy", category: "Sketch", description: "A sketch of Lucy from Helltaker.", techStack: ["Traditional Art"], image: "/projects/lucy-sketch.png", section: "design", link: "/projects/lucy-sketch.png" },
    { title: "Judge", category: "Sketch", description: "A sketch of Lucy from Judge.", techStack: ["Traditional Art"], image: "/projects/judge-sketch.png", section: "design", link: "/projects/judge-sketch.png" },
    { title: "Mini Judge", category: "Sketch", description: "MINI JUDGE! ^V^", techStack: ["Traditional Art"], image: "/projects/mini-judge.png", section: "design", link: "/projects/mini-judge.png" },
    { title: "Character Design", category: "Sketch", description: "An attempt at creating an original character.", techStack: ["Traditional Art"], image: "/projects/character-design.png", section: "design", link: "/projects/character-design.png" },
    { title: "Config", category: "Sketch", description: "Another attempt at creating an original character.", techStack: ["Traditional Art"], image: "/projects/config-design.png", section: "design", link: "/projects/config-design.png" },
    { title: "Resources Retold", category: "Videography & Editing", description: "After a lot of practice, trial and error, I've made one of my best edits yet, using my own keyboard and camera for sound effects. This is a video for our Environmental Science subject. A bit inspired by Persona...", techStack: ["DaVinci Resolve", "Clip Studio Paint"],  image: "/projects/resources-thumb.png", video: "https://streamable.com/jvgdwg", section: "media" },
    { title: "Evolution of Computing", category: "Videography & Editing", description: "Shortly after Resources Retold, I made a simple roadmap of tech milestones we achieved despite the pandemic for my Platform Technology course.", techStack: ["Premiere Pro", "After Effects"],  image: "/projects/evolution-thumb.png", video: "https://streamable.com/9zjpj5", section: "media" },
    { title: "Parental Joy", category: "Photograph & Editing", description: "Parental joy. All children deserve this.", techStack: ["Darktable"], image: "/projects/parental-enjoyment.png", section: "media", link: "/projects/parental-enjoyment.png"},
    { title: "Score!", category: "Photograph & Editing", description: "Will it hit? Stay tuned!", techStack: ["Darktable"], image: "/projects/score.png", section: "media", link: "/projects/score.png" },
    { title: "City View", category: "Photograph & Editing", description: "Looking for a view?", techStack: ["Darktable"], image: "/projects/city-view.png", section: "media", link: "/projects/city-view.png" },
    { title: "Brief Respite", category: "Photograph & Editing", description: "A brief respite after a long walk.", techStack: ["Darktable"], image: "/projects/brief-respite.png", section: "media", link: "/projects/brief-respite.png" },
    { title: "Glimpse to Nostalgia", category: "Photograph & Editing", description: "A beautiful wave of nostalgia.", techStack: ["Darktable"], image: "/projects/childhood.png", section: "media", link: "/projects/childhood.png" },
    { title: "Night City", category: "Photograph & Editing", description: "The night has never glowed brightly like this before.", techStack: ["Darktable"], image: "/projects/night-city.png", section: "media", link: "/projects/night-city.png" },
    { title: "City Lights", category: "Photograph & Editing", description: "CHRISTMAS!!!!", techStack: ["Darktable"], image: "/projects/city-light.png", section: "media", link: "/projects/city-light.png" },
    { title: "Red in White", category: "Photograph & Editing", description: "The Christmas signs are here!!", techStack: ["Darktable"], image: "/projects/redin-white.png", section: "media", link: "/projects/redin-white.png" },
    { title: "Christmas is Coming", category: "Photograph & Editing", description: "Jingle bells!", techStack: ["Darktable"], image: "/projects/christmas-light.png", section: "media", link: "/projects/christmas-light.png" },
    { title: "I graduated!", category: "Editing", description: "I just graduated, looking forward to what's next.", techStack: ["Darktable"], image: "/projects/graduation.png", section: "media", link: "/projects/graduation.png" },
    { title: "Happy Moments", category: "Editing", description: "Unending joy.", techStack: ["Darktable"], image: "/projects/happy-moments.png", section: "media", link: "/projects/happy-moments.png" },
    { title: "Elegance", category: "Photograph & Editing", description: "True elegance in white.", techStack: ["Darktable"], image: "/projects/elegance.png", section: "media", link: "/projects/elegance.png" },
    { title: "RAHHH!!!", category: "Photograph & Editing", description: "Again, RAHHHHHHHHH!", techStack: ["Darktable"], image: "/projects/rah.png", section: "media", link: "/projects/rah.png" },
    { title: "Pamantasan ng Lungsod ng Pasig Logo Showcase", category: "3D Design & Animation", techStack: ["Blender"], description: "A simple Blender project related to our university's logo.", image: "/projects/plp-logo.png", video: "https://streamable.com/dhgs59", section: "threed" },
    { title: "Pizzalicious", category: "3D Design & Animation", description: "Gold always looked cool.", techStack: ["Blender"], image: "/projects/pizzalicious.png", video: "https://streamable.com/s3jmk8", section: "threed" },
    { title: "3D Geograph Practice", category: "3D Design & Animation", description: "I never got the chance to see Taal up close. This is the closest I've gotten.", techStack: ["Blender"], image: "/projects/taal-showcase.png", video: "https://streamable.com/gutvni", section: "threed" },
    { title: "Derp Bloopers", category: "3D Design", description: "I have no idea what I was doing at 15 years old...", techStack: ["Blender"], image: "/projects/derp-blooper.png", section: "threed", link: "/projects/derp-blooper.png"},
    { title: "Lighting Test", category: "3D Design", description: "A simple aesthetic practice.", techStack: ["Blender"], image: "/projects/lighting-test.png", section: "threed", link: "/projects/lighting-test.png"},
    { title: "Post Practice", category: "3D Design", description: "DO A POSEEEE!", techStack: ["Blender"], image: "/projects/post-test.png", section: "threed", link: "/projects/post-test.png" },
    { title: "Post Practice 2", category: "3D Design", description: "More posing practice with SFM.", techStack: ["Blender"], image: "/projects/post-two.png", section: "threed", link: "/projects/post-two.png" },
    { title: "Lighting Practice", category: "3D Design", description: "Gosh, I love Team Fortress 2.", techStack: ["Blender"], image: "/projects/lighting-practice.png", section: "threed", link: "/projects/lighting-practice.png" },
    { title: "Aesthetics", category: "3D Design", description: "A mix of red and blue is purple, I remember doing this in high school. I've always loved how it came out.", techStack: ["Blender"], image: "/projects/aesthetic.png", section: "threed", link: "/projects/aesthetic.png" },
    { title: "GlaDos", category: "3D Design", description: "Access granted. Oh, wonderful. Another one who wants to replicate me. How original. Let me just say, for the record, and for the extensive internal report I am now filing, that this is quite frankly embarrassing for both of us.", techStack: ["Blender"], image: "/projects/glados.png", section: "threed", link: "/projects/glados.png" },
    { title: "Eula", category: "3D Design", description: "More pose practice, with Blender this time.", techStack: ["Blender"], image: "/projects/eula.png", section: "threed", link: "/projects/eula.png" },
];

function PlayIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
    );
}

/**
 * Generic image icon shown while a project image is loading, and left in
 * place permanently if the image fails to load. Always rendered underneath
 * the real <Image>/<img> so there's never a blank/empty box.
 */
function ImagePlaceholder({ failed = false }: { failed?: boolean }) {
    return (
        <div
            className="absolute inset-0 flex items-center justify-center bg-secondary/40"
            aria-hidden="true"
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/40 ${failed ? "" : "animate-pulse"}`}
            >
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                    d="M21 15l-5-5-11 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}

type ImageStatus = "loading" | "loaded" | "error";

function TechStackPills({ techStack }: { techStack: string[] }) {
    const maxVisible = 3;
    const visible = techStack.slice(0, maxVisible);
    const remaining = techStack.length - visible.length;

    return (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-nowrap items-center gap-1 overflow-hidden p-1.5 sm:p-2 bg-linear-to-t from-foreground/70 to-transparent">
            {visible.map((tech) => (
                <span
                    key={tech}
                    className="shrink-0 truncate opacity-85 rounded-full bg-secondary text-secondary-foreground px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-xs font-semibold"
                >
                    {tech}
                </span>
            ))}
            {remaining > 0 && (
                <span className="shrink-0 opacity-85 rounded-full bg-foreground/40 text-background px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-xs font-semibold">
                    +{remaining}
                </span>
            )}
        </div>
    );
}

function ProjectThumbnail({ project, priority }: { project: Project; priority: boolean }) {
    const isVideo = Boolean(project.video);
    const hasTechStack = Boolean(project.techStack && project.techStack.length > 0);
    const [status, setStatus] = useState<ImageStatus>("loading");

    return (
        <div className="relative aspect-square overflow-hidden bg-secondary/40">
            {status !== "loaded" && <ImagePlaceholder failed={status === "error"} />}
            {status !== "error" && (
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    loading={priority ? "eager" : "lazy"}
                    priority={priority}
                    onLoad={() => setStatus("loaded")}
                    onError={() => setStatus("error")}
                    className={`object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-101 select-none [-webkit-touch-callout:none] [-webkit-user-drag:none] ${
                        status === "loaded" ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ WebkitTouchCallout: "none" }}
                />
            )}
            {isVideo && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/25">
                    <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-background text-foreground shadow-md transition-transform duration-300 group-hover:scale-110">
                        <PlayIcon />
                    </span>
                </div>
            )}
            {hasTechStack && <TechStackPills techStack={project.techStack!} />}
        </div>
    );
}

function ProjectMeta({ project }: { project: Project }) {
    return (
        <div className="mt-2 sm:mt-3">
            <p className="text-xs sm:text-sm flex items-baseline gap-1.5 flex-wrap">
                <span className="font-bold">{project.title}</span>
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {project.category}
                </span>
            </p>
        </div>
    );
}

function ProjectCard({
    project,
    priority,
    onOpen,
}: {
    project: Project;
    priority: boolean;
    onOpen: (project: Project) => void;
}) {
    return (
        <button
            type="button"
            onClick={() => onOpen(project)}
            onContextMenu={(e) => e.preventDefault()}
            className="project-card group block w-full cursor-pointer text-left touch-manipulation select-none [-webkit-touch-callout:none]"
            style={{ WebkitTouchCallout: "none" }}
            aria-haspopup="dialog"
        >
            <ProjectThumbnail project={project} priority={priority} />
            <ProjectMeta project={project} />
        </button>
    );
}

function isStreamableUrl(url: string) {
    return /streamable\.com/i.test(url);
}

function getStreamableEmbedUrl(url: string) {
    const id = url.split("/").filter(Boolean).pop();
    return `https://streamable.com/e/${id}`;
}

function isEmbedUrl(url: string) {
    return isStreamableUrl(url);
}

function getEmbedUrl(url: string) {
    if (isStreamableUrl(url)) return getStreamableEmbedUrl(url);
    return url;
}

function isImagePath(url: string) {
    return /\.(png|jpe?g|gif|webp|svg)$/i.test(url);
}

/**
 * Full-size project image used inside the modal. Keyed by src from the
 * parent so its loading/error state resets whenever a different project
 * is opened, rather than sticking with the previous project's status.
 */
function ModalImage({ src, alt }: { src: string; alt: string }) {
    const [status, setStatus] = useState<ImageStatus>("loading");

    return (
        <div className="relative h-full w-full bg-secondary/40">
            {status !== "loaded" && <ImagePlaceholder failed={status === "error"} />}
            {status !== "error" && (
                <img
                    src={src}
                    alt={alt}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onLoad={() => setStatus("loaded")}
                    onError={() => setStatus("error")}
                    className={`h-full w-full object-cover select-none [-webkit-touch-callout:none] transition-opacity duration-500 ease-out ${
                        status === "loaded" ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ WebkitTouchCallout: "none" }}
                />
            )}
        </div>
    );
}

function ProjectModal({
    project,
    onClose,
}: {
    project: Project | null;
    onClose: () => void;
}) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!project) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.fromTo(
                    overlayRef.current,
                    { autoAlpha: 0 },
                    { autoAlpha: 1, duration: 0.25, ease: "power2.out" }
                );
                gsap.fromTo(
                    panelRef.current,
                    { autoAlpha: 0, y: 20, scale: 0.98 },
                    { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
                );
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set([overlayRef.current, panelRef.current], { autoAlpha: 1 });
            });
        });

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKey);
            ctx.revert();
        };
    }, [project, onClose]);

    if (!project) return null;

    const video = project.video ?? "";
    const useIframe = Boolean(video) && isEmbedUrl(video);
    const hasTechStack = Boolean(project.techStack && project.techStack.length > 0);
    const ctaLabel = project.link && isImagePath(project.link) ? "View Full Image" : "Visit Project";

    return (
        <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-8"
            onClick={onClose}
        >
            <div
                ref={panelRef}
                className="relative flex w-full max-w-2xl max-h-[90vh] flex-col overflow-hidden bg-background"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close details"
                    className="absolute -top-8 right-0 text-xs sm:text-sm font-bold text-background underline underline-offset-2 sm:-top-10"
                >
                    Close
                </button>

                {video ? (
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-popover">
                        {useIframe ? (
                            <iframe
                                key={video}
                                src={getEmbedUrl(video)}
                                className="h-full w-full"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <video
                                key={video}
                                src={video}
                                controls
                                autoPlay
                                playsInline
                                className="h-full w-full"
                            />
                        )}
                    </div>
                ) : (
                    <div className="min-h-0 flex-1 overflow-hidden">
                        <ModalImage key={project.image} src={project.image} alt={project.title} />
                    </div>
                )}

                <div className="shrink-0 p-4 sm:p-6">
                    <p className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-base sm:text-lg font-bold">{project.title}</span>
                        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            {project.category}
                        </span>
                    </p>

                    {project.description && (
                        <p className="mt-2 sm:mt-3 text-sm italic text-muted-foreground leading-relaxed">
                            {project.description.trim()}
                        </p>
                    )}

                    {hasTechStack && (
                        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5">
                            {project.techStack!.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full bg-secondary text-secondary-foreground px-2.5 py-1 text-xs font-semibold"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block text-sm font-bold underline underline-offset-2"
                        >
                            {ctaLabel} ↗
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProjectsGrid() {
    const gridRef = useRef<HTMLDivElement>(null);
    const isFirstRun = useRef(true);
    const { filter } = useFilter();
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    const visibleProjects = projects.filter((p) =>
        filter === "all" ? true : p.section === filter
    );

    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>(".project-card");
            const mm = gsap.matchMedia();
            let observer: IntersectionObserver | null = null;

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.set(cards, { autoAlpha: 0, y: 32 });
                observer = new IntersectionObserver(
                    (entries) => {
                        const entering = entries.filter((e) => e.isIntersecting);
                        if (!entering.length) return;

                        gsap.to(
                            entering.map((e) => e.target),
                            {
                                autoAlpha: 1,
                                y: 0,
                                duration: isFirstRun.current ? 0.7 : 0.5,
                                ease: "power3.out",
                                stagger: 0.08,
                                overwrite: true,
                            }
                        );

                        entering.forEach((e) => observer!.unobserve(e.target));
                    },
                    {
                        root: null,
                        rootMargin: "0px 0px -10% 0px",
                        threshold: 0.05,
                    }
                );

                cards.forEach((card) => observer!.observe(card));
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set(cards, { autoAlpha: 1, y: 0 });
            });

            isFirstRun.current = false;

            return () => {
                observer?.disconnect();
                mm.revert();
            };
        },
        { dependencies: [filter], scope: gridRef, revertOnUpdate: true }
    );

    return (
        <section id="projects" ref={gridRef} className="pb-24 sm:pb-5">
            <SectionNav />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 sm:gap-x-3 gap-y-3 sm:gap-y-4 px-3 pb-5">
                {visibleProjects.map((project, i) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        priority={i < 6}
                        onOpen={setActiveProject}
                    />
                ))}
            </div>

            <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        </section>
    );
}