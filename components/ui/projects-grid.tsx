"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useFilter } from "@/components/providers/filter-provider";

type Section = "website" | "gallery" | "sketch" | "photo" | "video" | "threed";

type Project = {
    title: string;
    category: string;
    image: string;
    section: Section;
    video?: string;
    link?: string;
};

const projects: Project[] = [
    { title: "Consrv", category: "Website", image: "/projects/consrv.png", section: "website", link: "https://www.consrv.online/" },
    { title: "Barangay San Miguel CMS", category: "Website", image: "/projects/san-mig.png", section: "website" },
    { title: "Slab UI", category: "Component Library", image: "/projects/slab-ui.png", section: "website", link: "https://slab-ui.vercel.app/"},
    { title: "CAV-RHS", category: "Website", image: "/projects/cav-rhs.png", section: "website", link: "https://cav-rhs.vercel.app/" },
    { title: "Raze", category: "Website", image: "/projects/raze.png", section: "website", link: "https://azrel.vercel.app/" },
    { title: "Pong C++", category: "Desktop Application", image: "/projects/pong-cpp.png", section: "website" },
    { title: "Coursify", category: "Website Prototype", image: "/projects/prototype-design.png", section: "website", link: "https://www.figma.com/design/PZgQuecPjWiXv3cGr3aLoX/Coursify?node-id=0-1&p=f&t=e7lGh8ZiiZoTl4n1-0"},
    { title: "Brushwork", category: "Website Prototype", image: "/projects/brushwork-proto.png", section: "website", link: "https://www.figma.com/design/u7QQeg9SkH2BYjB6eqiPvW/Techno?node-id=0-1&t=FwIa6oetau0flsZd-1"},
    { title: "Barangay San Miguel", category: "Website Prototype", image: "/projects/sm-prototype.png", section: "website", link: "https://www.figma.com/design/QZXYTdkugI4c3LAWfNELk3/Barangay-San-Miguel-CMS?node-id=48-177&t=peJuvFOWCecLDRkS-1"},
    { title: "Pacman Assets", category: "Digital Asset", image: "/projects/pac-man.png", section: "gallery", link: "/projects/pacman-assets.png"},
    { title: "Music Taste's Mascot", category: "Mascot Design", image: "/projects/music-taste.gif", section: "gallery", link: "/projects/music-taste.gif" },
    { title: "Russel's Mascot", category: "Mascot Design", image: "/projects/russel.png", section: "gallery", link: "/projects/russel.png" },
    { title: "Ceaseless Ver. 1", category: "Logo Design", image: "/projects/ceaseless-silvr.png", section: "gallery", link: "/projects/ceaseless-silvr.png" },
    { title: "Ceaseless Ver. 2", category: "Logo Design", image: "/projects/ceaseless-purpl.png", section: "gallery", link: "/projects/ceaseless-purpl.png" },
    { title: "Raze Logo", category: "Logo Design", image: "/projects/raze-logo.png", section: "gallery", link: "/projects/raze-logo.png" },
    { title: "Brushwork Logo", category: "Logo Design", image: "/projects/brushwork-logo.png", section: "gallery", link: "/projects/brushwork-logo.png" },
    { title: "Consrv Logo", category: "Logo Design", image: "/projects/consrv-logo.png", section: "gallery", link: "/projects/consrv-logo.png" },
    { title: "Consrv Mascot", category: "Mascot Design", image: "/projects/consrv-mascot.png", section: "gallery", link: "/projects/consrv-mascot.png" },
    { title: "Green Warriors Concept", category: "Mockup Design", image: "/projects/g-warriors.png", section: "gallery", link: "/projects/g-warriors.png" },
    { title: "Coffee Packaging Concept", category: "Mockup Design", image: "/projects/leblanc.png", section: "gallery", link: "/projects/leblanc.png" },
    { title: "Ceaseless Shirt Cutout", category: "Cutout Design", image: "/projects/ceaseless-cutout.png", section: "gallery", link: "/projects/ceaseless-cutout.png" },
    { title: "Registrar Org Chart", category: "Public Material", image: "/projects/org-chart.png", section: "gallery", link: "/projects/org-chart.png" },
    { title: "Jean", category: "Sketch", image: "/projects/jean-sketch.png", section: "sketch", link: "/projects/jean-sketch.png"},
    { title: "Lumine", category: "Sketch", image: "/projects/trav-sketch.png", section: "sketch", link: "/projects/trav-sketch.png"},
    { title: "Lisa", category: "Sketch", image: "/projects/lisa-sketch.png", section: "sketch", link: "/projects/lisa-sketch.png"},
    { title: "Ollie", category: "Sketch", image: "/projects/ollie-sketch.png", section: "sketch", link: "/projects/ollie-sketch.png"},
    { title: "Ganyu", category: "Sketch", image: "/projects/ganyu-sketch.png", section: "sketch", link: "/projects/ganyu-sketch.png"},
    { title: "Mona", category: "Sketch", image: "/projects/mona-sketch.png", section: "sketch", link: "/projects/mona-sketch.png"},
    { title: "Keqing", category: "Sketch", image: "/projects/keqing-sketch.png", section: "sketch", link: "/projects/keqing-sketch.png"},
    { title: "Polka", category: "Sketch", image: "/projects/polka-sketch.png", section: "sketch", link: "/projects/polka-sketch.png" },
    { title: "Eye Practice", category: "Sketch", image: "/projects/eye-sketch.png", section: "sketch", link: "/projects/eye-sketch.png" },
    { title: "Lucy", category: "Sketch", image: "/projects/lucy-sketch.png", section: "sketch", link: "/projects/lucy-sketch.png" },
    { title: "Judge", category: "Sketch", image: "/projects/judge-sketch.png", section: "sketch", link: "/projects/judge-sketch.png" },
    { title: "Mini Judge", category: "Sketch", image: "/projects/mini-judge.png", section: "sketch", link: "/projects/mini-judge.png" },
    { title: "Character Design", category: "Sketch", image: "/projects/character-design.png", section: "sketch", link: "/projects/character-design.png" },
    { title: "Config", category: "Sketch", image: "/projects/config-design.png", section: "sketch", link: "/projects/config-design.png" },
    { title: "Resources Retold", category: "Videography & Editing", image: "/projects/resources-thumb.png", video: "https://streamable.com/jvgdwg", section: "video" },
    { title: "Evolution of Computing", category: "Videography & Editing", image: "/projects/evolution-thumb.png", video: "https://streamable.com/9zjpj5", section: "video" },
    { title: "Parental Joy", category: "Photograph & Editing", image: "/projects/parental-enjoyment.png", section: "photo", link: "/projects/parental-enjoyment.png"},
    { title: "Score!", category: "Photograph & Editing", image: "/projects/score.png", section: "photo", link: "/projects/score.png" },
    { title: "City View", category: "Photograph & Editing", image: "/projects/city-view.png", section: "photo", link: "/projects/city-view.png" },
    { title: "Brief Respite", category: "Photograph & Editing", image: "/projects/brief-respite.png", section: "photo", link: "/projects/brief-respite.png" },
    { title: "Glimpse to Nostalgia", category: "Photograph & Editing", image: "/projects/childhood.png", section: "photo", link: "/projects/childhood.png" },
    { title: "Night City", category: "Photograph & Editing", image: "/projects/night-city.png", section: "photo", link: "/projects/night-city.png" },
    { title: "City Lights", category: "Photograph & Editing", image: "/projects/city-light.png", section: "photo", link: "/projects/city-light.png" },
    { title: "Red in White", category: "Photograph & Editing", image: "/projects/redin-white.png", section: "photo", link: "/projects/redin-white.png" },
    { title: "Christmas is Coming", category: "Photograph & Editing", image: "/projects/christmas-light.png", section: "photo", link: "/projects/christmas-light.png" },
    { title: "I graduated!", category: "Editing", image: "/projects/graduation.png", section: "photo", link: "/projects/graduation.png" },
    { title: "Happy Moments", category: "Editing", image: "/projects/happy-moments.png", section: "photo", link: "/projects/happy-moments.png" },
    { title: "Elegance", category: "Photograph & Editing", image: "/projects/elegance.png", section: "photo", link: "/projects/elegance.png" },
    { title: "RAHHH!!!", category: "Photograph & Editing", image: "/projects/rah.png", section: "photo", link: "/projects/rah.png" },
    { title: "Pamantasan ng Lungsod ng Pasig Logo Showcase", category: "3D Design & Animation", image: "/projects/plp-logo.png", video: "https://streamable.com/dhgs59", section: "threed" },
    { title: "Pizzalicious", category: "3D Design & Animation", image: "/projects/pizzalicious.png", video: "https://streamable.com/s3jmk8", section: "threed" },
    { title: "3D Geograph Practice", category: "3D Design & Animation", image: "/projects/taal-showcase.png", video: "https://streamable.com/gutvni", section: "threed" },
    { title: "Derp Bloopers", category: "3D Design", image: "/projects/derp-blooper.png", section: "threed", link: "/projects/derp-blooper.png"},
    { title: "Lighting Test", category: "3D Design", image: "/projects/lighting-test.png", section: "threed", link: "/projects/lighting-test.png"},
    { title: "Post Practice", category: "3D Design", image: "/projects/post-test.png", section: "threed", link: "/projects/post-test.png" },
    { title: "Post Practice 2", category: "3D Design", image: "/projects/post-two.png", section: "threed", link: "/projects/post-two.png" },
    { title: "Lighting Practice", category: "3D Design", image: "/projects/lighting-practice.png", section: "threed", link: "/projects/lighting-practice.png" },
    { title: "Aesthetics", category: "3D Design", image: "/projects/aesthetic.png", section: "threed", link: "/projects/aesthetic.png" },
    { title: "GlaDos", category: "3D Design", image: "/projects/glados.png", section: "threed", link: "/projects/glados.png" },
    { title: "Eula", category: "3D Design", image: "/projects/eula.png", section: "threed", link: "/projects/eula.png" },
];

function PlayIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
    );
}

function ProjectThumbnail({ project, priority }: { project: Project; priority: boolean }) {
    const isVideo = Boolean(project.video);

    return (
        <div className="relative aspect-square overflow-hidden">
            <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                loading={priority ? "eager" : "lazy"}
                priority={priority}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-101"
            />
            {isVideo && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
                    <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-black shadow-md transition-transform duration-300 group-hover:scale-110">
                        <PlayIcon />
                    </span>
                </div>
            )}
        </div>
    );
}

function ProjectMeta({ project }: { project: Project }) {
    return (
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm">
            <span className="font-bold underline">{project.title}</span>
            <span className="ml-2 font-normal text-neutral-500 block sm:inline">{project.category}</span>
        </p>
    );
}

function ProjectCard({
    project,
    priority,
    onPlay,
}: {
    project: Project;
    priority: boolean;
    onPlay: (project: Project) => void;
}) {
    if (project.video) {
        return (
            <button
                type="button"
                onClick={() => onPlay(project)}
                className="project-card group block w-full cursor-pointer text-left"
                aria-haspopup="dialog"
            >
                <ProjectThumbnail project={project} priority={priority} />
                <ProjectMeta project={project} />
            </button>
        );
    }

    if (project.link) {
        return (
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card group block"
            >
                <ProjectThumbnail project={project} priority={priority} />
                <ProjectMeta project={project} />
            </a>
        );
    }

    return (
        <div className="project-card group block">
            <ProjectThumbnail project={project} priority={priority} />
            <ProjectMeta project={project} />
        </div>
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

function VideoModal({
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
    const useIframe = isEmbedUrl(video);

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
                className="relative w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close video"
                    className="absolute -top-8 right-0 text-xs sm:text-sm font-bold text-white underline underline-offset-2 sm:-top-10"
                >
                    Close
                </button>

                <div className="relative aspect-video w-full overflow-hidden bg-black">
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

                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white">
                    <span className="font-bold underline">{project.title}</span>
                    <span className="ml-2 font-normal text-neutral-400">{project.category}</span>
                </p>
            </div>
        </div>
    );
}

export default function ProjectsGrid() {
    const gridRef = useRef<HTMLDivElement>(null);
    const isFirstRun = useRef(true);
    const { filter } = useFilter();
    const [activeVideo, setActiveVideo] = useState<Project | null>(null);

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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 sm:gap-x-3 gap-y-3 sm:gap-y-4 px-3 pb-5">
                {visibleProjects.map((project, i) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        priority={i < 6}
                        onPlay={setActiveVideo}
                    />
                ))}
            </div>

            <VideoModal project={activeVideo} onClose={() => setActiveVideo(null)} />
        </section>
    );
}