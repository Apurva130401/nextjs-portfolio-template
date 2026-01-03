"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Contact = () => {
    const [copied, setCopied] = React.useState(false);

    const handleEmailClick = (e: React.MouseEvent) => {
        // e.preventDefault(); // Optional: Uncomment if we want to ONLY copy and not open client
        navigator.clipboard.writeText("john@example.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-24 relative bg-white">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto p-12 md:p-20 rounded-[3rem] text-center border border-stone-100 bg-[#FAFAF9] shadow-inner"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-stone-900">
                        Let's Build the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                            Future Together
                        </span>
                    </h2>

                    <p className="text-xl text-stone-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Ready to elevate your business with cutting-edge AI automation?
                        I'm currently available for freelance projects and consulting.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <a
                            href="mailto:john@example.com"
                            onClick={handleEmailClick}
                            className="px-8 py-4 rounded-full bg-stone-900 text-white font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-500/20 flex items-center gap-3 cursor-pointer"
                        >
                            {copied ? <CheckCircle2 className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                            {copied ? "Email Copied!" : "Email Me"}
                        </a>
                        <Link
                            href="https://www.linkedin.com/"
                            className="px-8 py-4 rounded-full bg-white text-stone-900 border border-stone-200 font-bold text-lg hover:border-stone-900 transition-all shadow-sm flex items-center gap-3"
                        >
                            <Linkedin className="w-5 h-5" />
                            LinkedIn
                        </Link>
                    </div>

                    <div className="flex justify-center gap-8 text-stone-400">
                        <Link href="https://github.com/" className="hover:text-stone-900 transition-colors">
                            <Github className="w-8 h-8" />
                        </Link>
                        <Link href="https://twitter.com/" className="hover:text-stone-900 transition-colors">
                            <Twitter className="w-8 h-8" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
