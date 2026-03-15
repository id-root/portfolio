import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Vector — an interactive terminal-style contact page.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
