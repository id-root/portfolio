import type { Metadata } from "next";
import { DM_Sans, Outfit, Patrick_Hand, Figtree } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-dm-sans" });
const outfit = Outfit({ subsets: ["latin"], display: "swap", variable: "--font-outfit" });
const patrickHand = Patrick_Hand({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-gamja" });
const figtree = Figtree({ subsets: ["latin"], display: "swap", variable: "--font-figtree" });

export const metadata: Metadata = {
    title: {
        default: "Portfolio",
        template: "%s | Vector",
    },
    description: "A student exploring cyber-space, creating elegant zero-trust solutions. Offensive security research, custom tooling in Rust & Python, and deep-dive whitepapers.",
    keywords: ["security researcher", "offensive security", "Rust", "Python", "portfolio", "CTF", "reverse engineering", "penetration testing"],
    openGraph: {
        title: "Vector",
        description: "Offensive security research, custom tooling, and deep-dive whitepapers.",
        type: "website",
        locale: "en_US",
    },
    robots: {
        index: true,
        follow: true,
    },
};

import { Navbar } from "@/components/navbar";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ElegantBackground } from "@/components/ui/elegant-background";
import { GlitchProvider } from "@/components/theme-glitch-provider";
import { PreloaderWrapper } from "@/components/preloader-wrapper";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
            </head>
            <body className={`${dmSans.variable} ${outfit.variable} ${patrickHand.variable} ${figtree.variable} font-gamja antialiased bg-background text-text-primary selection:bg-brand-primary selection:text-white overflow-x-hidden`}>
                <PreloaderWrapper>
                    <GlitchProvider>
                        <SmoothScroll>
                            <ElegantBackground />
                            <Navbar />
                            <main className="relative z-10 flex flex-col min-h-screen">
                                {children}
                            </main>
                        </SmoothScroll>
                    </GlitchProvider>
                </PreloaderWrapper>
                <SpeedInsights />
            </body>
        </html>
    );
}
