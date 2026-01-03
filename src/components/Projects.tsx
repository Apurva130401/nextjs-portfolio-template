"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        title: "Project Alpha",
        description: "An advanced AI orchestration platform for enterprise workflows.",
        tags: ["Next.js", "AI", "Tailwind"],
        link: "#",
        colSpan: "md:col-span-2",
        gradient: "from-orange-100 to-amber-50" // Light warm gradient
    },
    {
        title: "SaaS Analytics",
        description: "Real-time data visualization dashboard for business metrics.",
        tags: ["React", "D3.js", "Supabase"],
        link: "#",
        colSpan: "md:col-span-1",
        gradient: "from-stone-100 to-stone-50"
    },
    {
        title: "Voice Agent",
        description: "Autonomous booking system powered by voice recognition.",
        tags: ["Python", "Twilio", "OpenAI"],
        link: "#",
        colSpan: "md:col-span-1",
        gradient: "from-orange-50 to-rose-50"
    },
    {
        title: "E-Commerce Suite",
        description: "Full-stack inventory management and customer portal solution.",
        tags: ["Shopify", "Node.js", "Redis"],
        link: "#",
        colSpan: "md:col-span-2",
        gradient: "from-stone-50 to-orange-50"
    }
];

const MobileProjects = () => {
    return (
        <section className="relative bg-[#FAFAF9] py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-stone-900">
                        Featured Projects
                    </h2>
                    <p className="text-sm text-stone-500 max-w-xs mx-auto">
                        Swipe to view all
                    </p>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 scrollbar-hide">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`snap-center flex-shrink-0 w-[85vw] h-[55vh] rounded-3xl overflow-hidden border border-stone-200 bg-gradient-to-br ${project.gradient} shadow-lg`}
                        >
                            <div className="relative z-20 h-full flex flex-col justify-between p-6">
                                <div className="flex justify-between items-start">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-stone-900" />
                                    </div>
                                    <Link href={project.link} className="p-3 rounded-full bg-white text-stone-900 shadow-sm">
                                        <ExternalLink className="w-5 h-5" />
                                    </Link>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-stone-900 mb-2">{project.title}</h3>
                                    <p className="text-stone-600 mb-4 text-base line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-stone-800 border border-stone-100 shadow-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="w-1 flex-shrink-0" />
                </div>
            </div>
        </section>
    );
};

export const Projects = () => {
    return (
        <section id="projects" className="py-24 relative bg-[#FAFAF9]">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="hidden md:block text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900">
                        Featured Projects
                    </h2>
                    <p className="text-lg text-stone-500 max-w-2xl mx-auto">
                        Innovation in action. Delivering value through code.
                    </p>
                </motion.div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative rounded-3xl overflow-hidden border border-stone-200 bg-gradient-to-br ${project.gradient} shadow-sm hover:shadow-xl transition-all duration-500 ${project.colSpan}`}
                        >
                            <div className="relative z-20 h-full flex flex-col justify-between p-8 md:p-10">
                                <div className="flex justify-between items-start">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-stone-900" />
                                    </div>
                                    <Link href={project.link} className="p-3 rounded-full bg-white text-stone-900 shadow-sm hover:bg-stone-900 hover:text-white transition-colors">
                                        <ExternalLink className="w-5 h-5" />
                                    </Link>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold text-stone-900 mb-3">{project.title}</h3>
                                    <p className="text-stone-600 mb-6 line-clamp-2 md:text-lg">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-stone-800 border border-stone-100 shadow-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>


            </div>

            {/* Mobile Projects Sticky Container */}
            <div className="md:hidden">
                <MobileProjects />
            </div>
        </section>
    );
};
