import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
    title: "VECTOR // Offensive Security Portfolio",
    description: "Exploring cyber-space: Offensive security research, custom implant development, and adversary simulation by Vector.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased selection:bg-accent selection:text-black overflow-x-hidden`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                    <GlitchProvider>
                        <CyberBackground />
                        <main className="relative z-10 flex flex-col min-h-screen">
                            {children}
                        </main>
                    </GlitchProvider>
                </ThemeProvider>
            </body>
        </html >
    );
}
