import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Rubik_Distressed, Rubik } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { GlitchProvider } from "@/components/theme-glitch-provider";
import { CyberBackground } from "@/components/ui/cyber-background";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    weight: ["400", "700"]
});
const rubikDistressed = Rubik_Distressed({ subsets: ["latin"], weight: "400", variable: "--font-rubik-distressed" });
const rubik = Rubik({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    variable: "--font-rubik"
});

export const metadata: Metadata = {
    title: "Portfolio",
    description: "A Student, learning offensive security, Waiting for AGI",
};

import { Navbar } from "@/components/navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${rubikDistressed.variable} ${rubik.variable} font-sans antialiased selection:bg-red-500 selection:text-white overflow-x-hidden`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                    <GlitchProvider>
                        <CyberBackground />
                        <Navbar />
                        <main className="relative z-10 flex flex-col min-h-screen">
                            {children}
                        </main>
                    </GlitchProvider>
                </ThemeProvider>
            </body>
        </html >
    );
}
