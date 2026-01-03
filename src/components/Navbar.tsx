"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleThemeChange = (e: CustomEvent) => {
            setIsDark(e.detail.theme === "dark");
        };

        window.addEventListener("scroll", handleScroll);
        // @ts-ignore
        window.addEventListener("theme-change", handleThemeChange);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            // @ts-ignore
            window.removeEventListener("theme-change", handleThemeChange);
        };
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "glass-nav py-4" : "bg-transparent py-6",
                isDark && "bg-[#0e0e0e]/90 border-b border-white/10"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link
                    href="/"
                    className={cn(
                        "flex items-center gap-2 text-xl font-bold transition-colors",
                        isDark ? "text-white" : "text-stone-900"
                    )}
                >
                    <div className={cn(
                        "p-1.5 rounded-lg transition-colors",
                        isDark ? "bg-white" : "bg-stone-900"
                    )}>
                        <Rocket className={cn("w-5 h-5", isDark ? "text-black" : "text-white")} />
                    </div>
                    <span>Portfolio</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors relative group",
                                isDark ? "text-gray-300 hover:text-white" : "text-stone-600 hover:text-stone-900"
                            )}
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full" />
                        </Link>
                    ))}
                    <Link
                        href="/submit-inquiry"
                        className={cn(
                            "px-5 py-2.5 rounded-full text-sm font-medium transition-colors shadow-lg hover:shadow-orange-500/20",
                            isDark ? "bg-white text-black hover:bg-gray-200" : "bg-stone-900 text-white hover:bg-orange-600"
                        )}
                    >
                        Hire Me
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={cn("md:hidden p-2 transition-colors", isDark ? "text-white" : "text-stone-900")}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={cn(
                            "absolute top-full left-0 right-0 p-6 md:hidden flex flex-col gap-4 shadow-xl border-b backdrop-blur-xl",
                            isDark ? "bg-[#0e0e0e]/95 border-white/10" : "bg-stone-50/95 border-stone-200"
                        )}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    "text-lg font-medium hover:text-orange-500",
                                    isDark ? "text-gray-300" : "text-stone-600"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/submit-inquiry"
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                                "px-5 py-3 rounded-xl text-center font-bold transition-colors",
                                isDark ? "bg-white text-black" : "bg-stone-900 text-white"
                            )}
                        >
                            Hire Me
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

