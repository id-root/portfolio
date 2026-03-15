import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "Learn about Vector's philosophy, technical arsenal, and milestones in offensive security research and tool development.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
