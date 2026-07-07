import Header from "@/components/ui/header";
import HeroIntro from "@/components/ui/hero";
import ProjectsGrid from "@/components/ui/projects-grid";
import BubbleHead from "@/components/ui/bubble-head";
import ContactSection from "@/components/ui/contact-section";
import { FilterProvider } from "@/components/providers/filter-provider";

export default function HomePage() {
    return (
        <FilterProvider>
            <div className="min-h-screen pb-3">
                <div className="flex">
                    <Header />
                </div>
                <div className="flex">
                    <HeroIntro />
                </div>
                <ProjectsGrid />
                <ContactSection />
                <BubbleHead />
            </div>
        </FilterProvider>
    );
}