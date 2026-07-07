import Image from "next/image";

export default function ContactSection() {
    return (
        <section id="contact" className="w-full px-4 sm:px-5 pt-5 pb-24 sm:pb-8 border-t-2 border-t-primary">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-8">
                <div className="max-w-3xl text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wide uppercase">
                        My Beginnings
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        I&apos;ve done a lot of art growing up, eventually transitioning into digital art and design, from 3D modeling to video editing.
                        Video games introduced me to tech along the way, which is its own form of art. Creativity has always been part of me, and even in tech,
                        I love doing UI/UX design. Check out my socials below to connect, and scan the QR code for my resume if you&apos;re interested in hiring me. ^v^
                    </p>
                </div>

                <div className="flex flex-col items-center shrink-0 self-center sm:self-start">
                    <div className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52">
                        <Image
                            src="/qr.png"
                            alt="Scan to connect"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-sm text-primary font-semibold text-center hover:underline"
                    >
                        Resume
                    </a>
                </div>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-semibold">
                <div className="uppercase flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
                    <a
                        href="https://www.linkedin.com/in/rex-santos/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="uppercase hover:underline"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://ph.jobstreet.com/profiles/rex-santos-tJy3Xj0LXQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="uppercase hover:underline"
                    >
                        Jobstreet
                    </a>
                    <a
                        href="https://www.instagram.com/hyungirex/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="uppercase hover:underline"
                    >
                        Instagram
                    </a>
                    <a
                        href="https://www.facebook.com/ducklings.16/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="uppercase hover:underline"
                    >
                        Facebook
                    </a>
                    <a
                        href="https://github.com/hyungirex"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="uppercase hover:underline"
                    >
                        Github
                    </a>
                </div>

                <a
                    href="mailto:rexvincentsantos16@gmail.com"
                    className="uppercase hover:underline text-center break-all sm:break-normal"
                >
                    rexvincentsantos16@gmail.com
                </a>
            </div>
        </section>
    );
}