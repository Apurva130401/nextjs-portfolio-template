
import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MouseFollower } from "@/components/MouseFollower";
import { ContextMenu } from "@/components/ContextMenu";
import Script from "next/script";
import { ToastProvider } from "@/hooks/use-toast";
import { Toaster } from "@/components/Toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

const clashGrotesk = localFont({
  src: "./fonts/ClashGrotesk-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
});

const supreme = localFont({
  src: "./fonts/Supreme-Variable.woff2",
  variable: "--font-supreme",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: "John Doe | Creative Developer & Designer",
    template: "%s | John Doe"
  },
  description: "Creative Developer specializing in building premium web experiences. Expert in Next.js, Design Systems, and Interactive UI.",
  keywords: ["Web Developer", "UI/UX", "Next.js", "React", "Creative Coding"],
  authors: [{ name: "John Doe" }],
  creator: "John Doe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://example.com",
    title: "John Doe | Creative Developer",
    description: "Building premium web experiences and interactive interfaces.",
    siteName: "John Doe Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "John Doe - Creative Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Doe | Creative Developer",
    description: "Creative Developer & UI Designer.",
    images: ["/og-image.jpg"],
    creator: "@johndoe",
  },
  icons: {
    icon: "/favicon.png",
  },
  alternates: {
    canonical: 'https://example.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'John Doe',
    url: 'https://example.com',
    jobTitle: 'Creative Developer',
    description: 'Creative Developer & UI Designer specializing in building premium web experiences.',
    knowsAbout: [
      'Web Development',
      'UI/UX Design',
      'Next.js',
      'React',
      'TypeScript',
      'Animation'
    ],
    sameAs: [
      'https://www.linkedin.com/',
      'https://github.com/',
      'https://twitter.com/'
    ],
    email: 'john@example.com',
    worksFor: {
      '@type': 'Organization',
      name: 'Tech Company'
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${clashGrotesk.variable} ${spaceGrotesk.variable} ${supreme.variable} bg-background text-foreground antialiased cursor-none`}>
        {/* JSON-LD for SEO - Injected into HEAD */}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ToastProvider>
          <SmoothScroll />
          <MouseFollower />
          <ContextMenu />
          <Toaster />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
