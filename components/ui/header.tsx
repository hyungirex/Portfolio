import { ModeToggle } from "./mode-toggle";
export default function Header() {
    return (
        <header className="w-full flex justify-between items-center px-5 py-6 border-2 border-b-primary">
            <span className="text-base font-black tracking-wide">hyungi.</span>
            <ModeToggle />
        </header>
    );
}