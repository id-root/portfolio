import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, DM_Sans, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const garamond = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-garamond" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: {
        default: "Portfolio",
        template: "%s | Vector",
    },
    description: "A student exploring cyber-space, creating elegant zero-trust solutions. Offensive security research, custom tooling in Rust & Python, and deep-dive whitepapers.",
    keywords: ["security researcher", "offensive security", "Rust", "Python", "portfolio", "CTF", "reverse engineering", "penetration testing"],
    openGraph: {
        title: "Vector — Security Researcher & Developer",
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
            </head>
            <body className={`${playfair.variable} ${garamond.variable} ${dmSans.variable} ${outfit.variable} font-sans antialiased bg-background text-text-primary selection:bg-accent-caramel selection:text-white overflow-x-hidden`}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                    <GlitchProvider>
                        <SmoothScroll>
                            <ElegantBackground />
                            <Navbar />
                            <main className="relative z-10 flex flex-col min-h-screen">
                                {children}
                            </main>
                        </SmoothScroll>
                    </GlitchProvider>
                </ThemeProvider>
                <SpeedInsights />
            </body>
        </html>
    );
}
