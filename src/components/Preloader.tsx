"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const [text, setText] = useState("Welcome");

    useEffect(() => {
        const timer = setTimeout(() => {
            setText("System Initialized");
        }, 1200);

        const completeTimer = setTimeout(() => {
            onComplete();
        }, 2500);

        return () => {
            clearTimeout(timer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden"
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="/videos/volcano.mp4" type="video/mp4" />
                </video>
                {/* Gradient Overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
            </div>

            <motion.p
                key={text}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-4xl md:text-6xl font-light tracking-wider text-white drop-shadow-lg"
            >
                {text}
            </motion.p>
        </motion.div>
    );
}
