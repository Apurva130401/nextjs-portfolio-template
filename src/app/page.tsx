"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const handleLoadComplete = () => {
    setLoading(false);
    setTimeout(() => {
      const isMobile = window.innerWidth < 768;
      addToast({
        title: "Command Center Online",
        description: isMobile ? "Hold anywhere to access tools" : "Right-click anywhere to access tools",
        type: "info",
        duration: 5000,
        action: isMobile ? undefined : <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded border border-white/10">⌘ + Click</span>
      });
    }, 500);
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-purple-500/30">
      <AnimatePresence mode="wait">
        {/* {loading && <Preloader onComplete={handleLoadComplete} />} */}
      </AnimatePresence>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
