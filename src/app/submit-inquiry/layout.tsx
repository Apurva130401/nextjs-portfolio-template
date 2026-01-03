import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Start Your Project | Apurva Mishra",
    description: "Describe your AI automation or web development needs to get a custom proposal and timeline. Let's build something extraordinary together.",
    openGraph: {
        title: "Start Your Project | Apurva Mishra",
        description: "Ready to take your business to the next level? Fill out the inquiry form and I'll get back to you with a custom proposal.",
    }
};

export default function InquiryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
