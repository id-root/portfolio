import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Library — Whitepapers & Write-ups",
    description: "A curated collection of deep-dive security research papers and detailed CTF write-up methodologies by Vector.",
};

export default function WriteupsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
