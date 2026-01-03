"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";

const experiences = [
    {
        title: "Senior Software Engineer",
        company: "Tech Corp",
        period: "2023 - Present",
        description: "Leading the development of scalable web applications using Next.js and React. implemented CI/CD pipelines and improved system performance by 40%. Mentoring junior developers and conducting code reviews.",
        tags: ["Next.js", "React", "TypeScript", "AWS", "CI/CD"]
    },
    {
        title: "Full Stack Developer",
        company: "Startup Inc",
        period: "2021 - 2023",
        description: "Built and launched multiple MVP products for early-stage startups. Integrated payment gateways, authentication systems, and real-time data sync using Supabase and Node.js.",
        tags: ["Node.js", "Supabase", "PostgreSQL", "Stripe", "Redis"]
    },
    {
        title: "Frontend Developer",
        company: "Digital Agency",
        period: "2019 - 2021",
        description: "Collaborated with designers to create pixel-perfect user interfaces. Optimized website performance and accessibility scores. Developed reusable component libraries for internal use.",
        tags: ["React", "TailwindCSS", "Figma", "Accessibility"]
    }
];

const ExperienceItem = ({ experience, index }: { experience: any; index: number }) => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center w-full py-12 md:py-24 relative z-10 md:min-h-screen">
            {/* Left Side (45% width): Company Name */}
            <div className="w-full md:w-[45%] flex justify-start md:justify-end items-center pl-16 md:pl-0 pr-0 md:pr-16 mb-4 md:mb-0">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-20%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black text-left md:text-right leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-900 dark:from-gray-100 dark:to-gray-500"
                >
                    {experience.company}
                </motion.h2>
            </div>

            {/* Spacer for Center Line - Desktop Only */}
            <div className="hidden md:block w-[10%]"></div>

            {/* Right Side (45% width): Role and Description */}
            <div className="w-full md:w-[45%] flex flex-col justify-center pl-16 md:pl-16 relative">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-20%" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="h-px w-12 bg-green-500/50"></span>
                        <span className="text-green-500 font-mono text-lg tracking-wider uppercase">
                            {experience.period}
                        </span>
                    </div>

                    <h3 className="text-2xl md:text-5xl font-bold mb-4 md:mb-8 leading-tight">
                        {experience.title}
                    </h3>

                    <p className="text-base md:text-xl leading-relaxed max-w-xl mb-6 md:mb-10 font-light opacity-80">
                        {experience.description}
                    </p>

                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {experience.tags.map((tag: string) => (
                            <span key={tag} className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm border bg-opacity-10 rounded-full transition-colors duration-300 border-current opacity-70 hover:opacity-100">
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export const Experience = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scrollYProgressSpring = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Theme Transition Colors
    // Adjusted for longer scroll interaction
    const backgroundColor = useTransform(
        scrollYProgressSpring,
        [0, 0.05, 0.1, 0.9, 0.95, 1],
        ["#e0e0e0", "#e0e0e0", "#0e0e0e", "#0e0e0e", "#e0e0e0", "#e0e0e0"]
    );

    const textColor = useTransform(
        scrollYProgressSpring,
        [0, 0.05, 0.1, 0.9, 0.95, 1],
        ["#1a1a1a", "#1a1a1a", "#ffffff", "#ffffff", "#1a1a1a", "#1a1a1a"]
    );

    // Sync Navbar Theme Logic
    useMotionValueEvent(backgroundColor, "change", (latest) => {
        if (typeof window !== "undefined") {
            const isDark = latest === "#0e0e0e";
            window.dispatchEvent(new CustomEvent("theme-change", {
                detail: { theme: isDark ? "dark" : "light" }
            }));
        }
    });

    // Vertical Line Fill
    const lineHeight = useTransform(scrollYProgressSpring, [0.05, 0.9], ["0%", "100%"]);

    return (
        <motion.section
            ref={containerRef}
            id="experience"
            style={{ backgroundColor, color: textColor }}
            className="relative w-screen ml-[calc(-50vw+50%)] pt-32 pb-32 overflow-hidden"
        >
            {/* The Curve Transition (Top) */}
            <div className="absolute top-0 left-0 w-full overflow-hidden -translate-y-[98%] leading-[0] z-20 pointer-events-none text-[#e0e0e0]">
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-full h-[120px] md:h-[180px] fill-current"
                >
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
                    <path d="M0,0V15.81C13,36.92,46,62.34,98,74.52c53.36,12.5,108.77,5.56,164.26-6.18C362.4,43.37,455.51,20.06,558.12,27c87.35,5.91,167.35,42.3,247.35,62.33,70.52,17.66,138.68,14.71,200.75-2.58,58.82-16.39,94.22-54.74,117.84-82.69V0Z"></path>
                </svg>
            </div>

            {/* Continuous Vertical Line Container */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700 -translate-x-1/2 h-full z-0 opacity-20"></div>

            {/* Filling Green Line */}
            <motion.div
                style={{ height: lineHeight }}
                className="absolute left-8 md:left-1/2 top-0 w-px bg-green-500 -translate-x-1/2 z-0 origin-top"
            />

            <div className="w-full max-w-[90%] mx-auto relative z-10">
                {experiences.map((exp, index) => (
                    <ExperienceItem key={index} experience={exp} index={index} />
                ))}
            </div>

        </motion.section>
    );
};
