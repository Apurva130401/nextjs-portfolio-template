"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FAFAF9]">
            {/* Background Gradients (Warm & Subtle) */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-[120px] opacity-60 mix-blend-multiply animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-100/60 rounded-full blur-[100px] opacity-60 mix-blend-multiply" />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-40 [mask-image:linear-gradient(180deg,black,transparent)]" />

            <div className="container relative z-10 px-4 md:px-6 text-center flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-white/50 text-orange-700 text-sm font-medium mb-8 backdrop-blur-md shadow-sm"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    Available for New Projects
                </motion.div>

                <motion.h1
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-bold tracking-tight text-stone-900 mb-6"
                >
                    John <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Doe</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-stone-600 max-w-2xl mb-12 leading-relaxed font-light"
                >
                    Creative Developer & UI/UX Designer.
                    Building digital experiences that matter and solving complex problems with code.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-5"
                >
                    <Link
                        href="#projects"
                        className="group relative px-8 py-4 rounded-full bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                        View Work
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="#contact"
                        className="px-8 py-4 rounded-full border border-stone-200 bg-white/50 text-stone-800 font-semibold hover:bg-white transition-all shadow-sm hover:shadow-md backdrop-blur-sm"
                    >
                        Contact Me
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            >
                <ChevronDown className="w-6 h-6 text-stone-400" />
            </motion.div>
        </section>
    );
};
