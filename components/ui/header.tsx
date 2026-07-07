import { ModeToggle } from "./mode-toggle";

export default function Header() {
    return (
        <header className="w-full flex justify-between items-center px-4 sm:px-5 py-4 sm:py-6 border-2 border-b-primary">
            <span className="text-sm sm:text-base font-black tracking-wide">hyungi.</span>
            <ModeToggle />
        </header>
    );
}