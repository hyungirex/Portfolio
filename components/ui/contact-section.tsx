import Image from "next/image";

export default function ContactSection() {
    return (
        <section id="contact" className="w-full px-5 py-10 border-t-2 border-t-primary">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
                <div className="max-w-2xl text-left">
                    <h2 className="text-lg font-bold">Get in touch</h2>
                    <p className="mt-2 text-sm text-neutral-500">
                        Interested in working together? Reach out below.
                    </p>
                </div>

                <div className="relative h-32 w-32 shrink-0 sm:h-36 sm:w-36">
                    <Image
                        src="/qr-code.png"
                        alt="Scan to connect"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            <div className="mt-10 flex items-center justify-between text-sm font-bold">
                <a
                    href="https://instagram.com/YOUR_HANDLE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uppercase hover:underline"
                >
                    Instagram
                </a>
                <a
                    href="mailto:your@email.com"
                    className="uppercase hover:underline"
                >
                    your@email.com
                </a>
            </div>
        </section>
    );
}