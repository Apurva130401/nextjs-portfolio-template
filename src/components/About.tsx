"use client";

import { motion, useScroll, useTransform, useVelocity, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// Local wrap function to handle infinite loop ranges
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
    children: string;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // We track direction to flip the marquee: 1 = LTR, -1 = RTL
    const directionFactor = useRef<number>(1);

    // Wrap logic for infinite scrolling effect
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    useAnimationFrame((t, delta) => {
        // Determine direction based on scroll polarity
        const currentVelocity = scrollVelocity.get();

        // If scrolling up (negative), go -1. If down (positive), go 1.
        // We retain the previous direction if velocity is 0 (idle).
        if (currentVelocity < 0) {
            directionFactor.current = -1;
        } else if (currentVelocity > 0) {
            directionFactor.current = 1;
        }

        // Constant movement: baseVelocity * delta. No acceleration from scroll speed.
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="parallax overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div className="scroller font-[family-name:var(--font-clash)] font-[405] text-4xl md:text-6xl text-black flex whitespace-nowrap flex-nowrap" style={{ x }}>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
            </motion.div>
        </div>
    );
}

export const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    });

    // Expand Animation:
    // Starts at 90% width -> Expands to 100% (Full Bleed)
    // Starts with rounded corners -> Sharp corners (Full Page feel)
    const width = useTransform(scrollYProgress, [0, 1], ["90%", "100%"]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], ["3rem", "0rem"]);

    return (
        <section
            ref={containerRef}
            id="about"
            className="w-full min-h-screen py-20 bg-white flex items-center justify-center overflow-hidden"
        >
            <motion.div
                style={{ width, borderRadius }}
                className="bg-[#e0e0e0] overflow-hidden py-16 md:py-24 relative shadow-2xl mx-auto"
            >
                {/* Marquee at Top - Constant Speed */}
                <div className="w-full mb-16 py-8">
                    <ParallaxText baseVelocity={2}>
                        Web Developer • Automation Expert • AI Agents • Expert Prompting •
                    </ParallaxText>
                </div>

                <div className="container mx-auto px-4 md:px-6 flex flex-col items-center gap-12">
                    {/* Image Wrap */}
                    <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-xl border border-white/20">
                        <Image
                            src="/me.jpg"
                            alt="Profile"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    {/* Text Content */}
                    <div className="max-w-3xl text-center">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-[family-name:var(--font-supreme)] font-[700] text-stone-900 mb-6 tracking-tight leading-tight">
                            <span className="whitespace-nowrap">Creative Vision</span> <br />
                            <span className="text-orange-600 whitespace-nowrap ml-10">Technical Excellence</span>
                        </h2>
                        <p className="text-lg md:text-xl lg:text-2xl text-stone-700 font-medium leading-relaxed font-serif">
                            I combine design thinking with robust engineering to build systems that scale. I bridge the gap between aesthetic beauty and functional reliability.
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
