"use client";

import { motion } from "framer-motion";

const skillCategories = [
    {
        title: "AI & Automation",
        skills: ["n8n", "LangChain", "OpenAI API", "Python", "RAG Systems", "Zapier", "Make.com", "Vector DBs"]
    },
    {
        title: "Frontend Development",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Redux", "HTML/CSS"]
    },
    {
        title: "Backend & Cloud",
        skills: ["Node.js", "Express", "PostgreSQL", "Supabase", "AWS Lambda", "Docker", "Firebase", "REST APIs"]
    }
];

const MobileSkills = () => {
    return (
        <section className="relative bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-stone-900">
                        Technical Stack
                    </h2>
                    <p className="text-sm text-stone-500 max-w-xs mx-auto">
                        Swipe to explore
                    </p>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 scrollbar-hide">
                    {skillCategories.map((category, index) => (
                        <div
                            key={index}
                            className="snap-center flex-shrink-0 w-[85vw] p-6 rounded-2xl border border-stone-200 bg-[#FAFAF9] shadow-sm"
                        >
                            <h3 className="text-xl font-bold text-stone-900 mb-4 border-b border-stone-100 pb-2">
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-600 text-xs font-medium shadow-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="w-1 flex-shrink-0" />
                </div>
            </div>
        </section>
    );
};

export const Skills = () => {
    return (
        <section id="skills" className="py-24 bg-white relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 [mask-image:linear-gradient(180deg,transparent,black,transparent)]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="hidden md:block text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900">
                        Technical Stack
                    </h2>
                    <p className="text-lg text-stone-500 max-w-2xl mx-auto">
                        A comprehensive toolset for building scalable, intelligent solutions.
                    </p>
                </motion.div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="glass-card p-10 rounded-2xl hover:border-orange-200 transition-all group bg-[#FAFAF9]"
                        >
                            <h3 className="text-2xl font-bold text-stone-900 mb-8 border-b border-stone-100 pb-4">
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 rounded-lg bg-white border border-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all cursor-default shadow-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>


            </div>
            {/* Full width container for sticky scroll outside the constrained container */}
            <div className="md:hidden">
                <MobileSkills />
            </div>
        </section>
    );
};
