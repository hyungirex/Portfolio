import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const vulfMono = localFont({
  src: [
    {
      path: "../public/fonts/VulfMonoDemo-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/VulfMonoDemo-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/VulfMonoDemo-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/VulfMonoDemo-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/VulfMonoDemo-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/VulfMonoDemo-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-vulf-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rex Vincent Santos",
  description: "A personal portfolio website showcasing the work and projects of Rex Vincent Santos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        vulfMono.variable,
        "font-mono"
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}