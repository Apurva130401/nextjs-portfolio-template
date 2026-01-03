"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Linkedin,
    Github,
    Mail,
    RefreshCw,
    Code,
    Zap,
    Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContextMenu = () => {
    const { addToast, removeToast } = useToast();
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            setVisible(true);

            // Adjust position to keep menu onscreen
            let x = e.clientX;
            let y = e.clientY;
            const menuWidth = 260;
            const menuHeight = 320;

            if (x + menuWidth > window.innerWidth) x -= menuWidth;
            if (y + menuHeight > window.innerHeight) y -= menuHeight;

            setPosition({ x, y });
        };

        const handleClick = () => setVisible(false);
        const handleScroll = () => setVisible(false);

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("click", handleClick);
        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", handleClick);
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.2,
                ease: "circOut",
                staggerChildren: 0.05
            } as any
        },
        exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" }
    };

    const handleCopy = () => {
        const selection = window.getSelection()?.toString();
        if (selection) {
            navigator.clipboard.writeText(selection);
            addToast({
                title: "Copied",
                description: "Selection copied",
                type: "success",
                duration: 2000
            });
        } else {
            // Fallback to copying URL if no text is selected
            navigator.clipboard.writeText(window.location.href);
            addToast({
                title: "Link Copied",
                description: "Page URL copied",
                type: "success",
                duration: 2000
            });
        }
        setVisible(false);
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("john@example.com");
        setVisible(false);
        addToast({
            title: "Email Copied",
            description: "Address copied to clipboard",
            type: "success",
            duration: 3000
        });
    };

    const handleAudit = () => {
        setVisible(false);
        const id = addToast({
            title: "Running System Audit",
            description: "Analyzing performance metrics...",
            type: "loading"
        });

        setTimeout(() => {
            removeToast(id);
            addToast({
                title: "Audit Complete",
                description: "Score: 100/100 ELITE",
                type: "success",
                duration: 4000
            });
        }, 2000);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    ref={menuRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{ top: position.y, left: position.x }}
                    className="fixed z-[9999] w-[260px] p-2 rounded-2xl bg-stone-900/95 backdrop-blur-3xl border border-white/10 shadow-2xl ring-1 ring-black/50 overflow-hidden"
                >
                    {/* Header Section */}
                    <div className="px-3 py-2 mb-2 border-b border-white/10 flex justify-between items-center">
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-[family-name:var(--font-supreme)]">
                            Command Center
                        </p>
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        </div>
                    </div>

                    {/* Quick Access Grid (Socials) */}
                    <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2 mb-2 px-1">
                        {[
                            { icon: <Mail className="w-5 h-5" />, label: "Email", action: () => window.location.href = "mailto:john@example.com" },
                            { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", action: () => window.open("https://www.linkedin.com/", "_blank") },
                            { icon: <Github className="w-5 h-5" />, label: "GitHub", action: () => window.open("https://github.com/", "_blank") }
                        ].map((item, i) => (
                            <button
                                key={i}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    item.action();
                                    setVisible(false);
                                }}
                                className="group flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300"
                            >
                                <span className="text-stone-300 group-hover:text-white transition-colors mb-1">
                                    {item.icon}
                                </span>
                            </button>
                        ))}
                    </motion.div>

                    {/* Action List */}
                    <div className="flex flex-col gap-1 px-1">
                        <motion.button
                            variants={itemVariants}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCopy();
                            }}
                            className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white group transition-all duration-200"
                        >
                            <div className="flex items-center gap-3">
                                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                                    <Copy className="w-4 h-4" />
                                </span>
                                <span className="text-sm font-medium font-[family-name:var(--font-supreme)]">
                                    Copy
                                </span>
                            </div>
                            <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-stone-500 border border-white/5 transition-colors group-hover:bg-white/10">
                                ⌘C
                            </span>
                        </motion.button>

                        <motion.button
                            variants={itemVariants}
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://github.com/", "_blank");
                                setVisible(false);
                            }}
                            className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white group transition-all duration-200"
                        >
                            <div className="flex items-center gap-3">
                                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                                    <Code className="w-4 h-4" />
                                </span>
                                <span className="text-sm font-medium font-[family-name:var(--font-supreme)]">
                                    View Source Code
                                </span>
                            </div>
                            <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-stone-500 border border-white/5 transition-colors group-hover:bg-white/10">
                                SRC
                            </span>
                        </motion.button>

                        <motion.button
                            variants={itemVariants}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCopyEmail();
                            }}
                            className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white group transition-all duration-200"
                        >
                            <div className="flex items-center gap-3">
                                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                                    <Mail className="w-4 h-4" />
                                </span>
                                <span className="text-sm font-medium font-[family-name:var(--font-supreme)]">
                                    Copy Email Address
                                </span>
                            </div>
                        </motion.button>

                        <motion.button
                            variants={itemVariants}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAudit();
                            }}
                            className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white group transition-all duration-200"
                        >
                            <div className="flex items-center gap-3">
                                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                                    <Zap className="w-4 h-4" />
                                </span>
                                <span className="text-sm font-medium font-[family-name:var(--font-supreme)]">
                                    Run Performance Audit
                                </span>
                            </div>
                        </motion.button>

                        <motion.button
                            variants={itemVariants}
                            onClick={(e) => {
                                e.stopPropagation();
                                window.location.reload();
                            }}
                            className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white group transition-all duration-200 border-t border-white/5 mt-1"
                        >
                            <div className="flex items-center gap-3">
                                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                                    <RefreshCw className="w-4 h-4" />
                                </span>
                                <span className="text-sm font-medium font-[family-name:var(--font-supreme)]">
                                    Refresh Page
                                </span>
                            </div>
                            <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-stone-500 border border-white/5 transition-colors group-hover:bg-white/10">
                                ⌘R
                            </span>
                        </motion.button>
                    </div>

                    {/* Footer */}
                    <motion.div variants={itemVariants} className="mt-2 pt-2 border-t border-white/10 px-2 text-center">
                        <p className="text-[10px] text-white/50 font-[family-name:var(--font-space-grotesk)]">
                            Developed by You
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
