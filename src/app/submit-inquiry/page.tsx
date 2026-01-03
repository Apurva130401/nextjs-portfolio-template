"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Send, User, Mail, Building, MessageSquare, ClipboardList, ArrowLeft, DollarSign, Clock, CheckCircle2, Rocket, PhoneCall, FileText } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

export default function SubmitInquiry() {
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const triggerIntenseConfetti = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 1000 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 70 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 200);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus("submitting");

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");

        // --- Environment Variables ---
        const accessKey = process.env.NEXT_PUBLIC_WEB3_FORM_ACCESS_KEY;
        const googleSheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

        if (!accessKey || !googleSheetUrl) {
            console.error("Missing API Keys in environment variables");
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 3000);
            return;
        }

        formData.append("access_key", accessKey);
        formData.append("subject", `New Project Inquiry from ${name}`);
        formData.append("from_name", name as string);

        try {
            // Prepare data for Google Sheets (optional but ensuring compatibility with GAS e.parameter)
            const googleFormData = new URLSearchParams();
            formData.forEach((value, key) => {
                googleFormData.append(key, value.toString());
            });

            // Sending to both destinations in parallel
            const [web3Response] = await Promise.all([
                fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                }),
                fetch(googleSheetUrl, {
                    method: "POST",
                    mode: "no-cors", // GAS requires no-cors for direct browser submissions to avoid preflight blocks
                    body: googleFormData
                })
            ]);

            const data = await web3Response.json();

            if (data.success) {
                setFormStatus("success");
                triggerIntenseConfetti();
                (e.target as HTMLFormElement).reset();
                setTimeout(() => {
                    setFormStatus("idle");
                }, 5000);
            } else {
                console.error("Submission failed:", data);
                setFormStatus("error");
                setTimeout(() => setFormStatus("idle"), 3000);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 3000);
        }
    };

    return (
        <main className="min-h-screen bg-[#FAFAF9] text-stone-900 selection:bg-orange-500/30">
            <Navbar />

            <section className="relative pt-32 pb-20 px-4 md:px-6 overflow-hidden border-b border-stone-100">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-amber-50/50 rounded-full blur-[80px]" />
                </div>

                <div className="container mx-auto max-w-4xl relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-playfair text-stone-900">
                            Tell me about your <span className="text-orange-600">Project</span>
                        </h1>
                        <p className="text-lg text-stone-600 mb-12 max-w-2xl font-light leading-relaxed">
                            Ready to take your business to the next level? Fill out the form below and I'll get back to you within 24-48 hours.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-white rounded-[32px] shadow-2xl shadow-stone-200/40 border border-stone-100 p-8 md:p-12"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-stone-800 flex items-center gap-2 px-1">
                                        <User className="w-4 h-4 text-orange-500" />
                                        Full Name
                                    </label>
                                    <input
                                        required
                                        name="name"
                                        type="text"
                                        id="name"
                                        placeholder="John Doe"
                                        className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-stone-400"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-stone-800 flex items-center gap-2 px-1">
                                        <Mail className="w-4 h-4 text-orange-500" />
                                        Email Address
                                    </label>
                                    <input
                                        required
                                        name="email"
                                        type="email"
                                        id="email"
                                        placeholder="john@example.com"
                                        className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-stone-400"
                                    />
                                </div>

                                {/* Business Name Input */}
                                <div className="space-y-2">
                                    <label htmlFor="business" className="text-sm font-semibold text-stone-800 flex items-center gap-2 px-1">
                                        <Building className="w-4 h-4 text-orange-500" />
                                        Business/Company <span className="text-xs font-normal text-stone-400">(Optional)</span>
                                    </label>
                                    <input
                                        name="business"
                                        type="text"
                                        id="business"
                                        placeholder="Company Name"
                                        className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-stone-400"
                                    />
                                </div>

                                {/* Service Needed Input */}
                                <div className="space-y-2">
                                    <label htmlFor="service" className="text-sm font-semibold text-stone-800 flex items-center gap-2 px-1">
                                        <ClipboardList className="w-4 h-4 text-orange-500" />
                                        Service Needed
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="service"
                                            name="service"
                                            required
                                            defaultValue=""
                                            className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Select Service Needed</option>
                                            <option value="ai-automation">AI Automation / Agents</option>
                                            <option value="web-dev">Web Development / SaaS</option>
                                            <option value="full-stack">Full Stack Project</option>
                                            <option value="consultation">Technical Consultation</option>
                                            <option value="other">Other / Custom Request</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Budget Input */}
                                <div className="space-y-2">
                                    <label htmlFor="budget" className="text-sm font-semibold text-stone-800 flex items-center gap-2 px-1">
                                        <DollarSign className="w-4 h-4 text-orange-500" />
                                        Project Budget (USD)
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="budget"
                                            name="budget"
                                            required
                                            defaultValue=""
                                            className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Select Budget Range</option>
                                            <option value="1k-3k">$1,000 - $3,000</option>
                                            <option value="3k-7k">$3,000 - $7,000</option>
                                            <option value="7k-15k">$7,000 - $15,000</option>
                                            <option value="15k-plus">$15,000+</option>
                                            <option value="flexible">Flexible / Monthly Retainer</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Timeline Input */}
                                <div className="space-y-2">
                                    <label htmlFor="timeline" className="text-sm font-semibold text-stone-800 flex items-center gap-2 px-1">
                                        <Clock className="w-4 h-4 text-orange-500" />
                                        Project Timeline
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="timeline"
                                            name="timeline"
                                            required
                                            defaultValue=""
                                            className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Select Timeline</option>
                                            <option value="asap">As soon as possible</option>
                                            <option value="1-month">Within a month</option>
                                            <option value="1-3-months">1-3 months</option>
                                            <option value="flexible">Flexible</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description Input */}
                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-semibold text-stone-800 flex items-center gap-2 px-1">
                                    <MessageSquare className="w-4 h-4 text-orange-500" />
                                    Describe your project or vision in detail
                                </label>
                                <textarea
                                    required
                                    name="message"
                                    id="description"
                                    rows={6}
                                    placeholder="Please provide details about your project, goals, and any relevant links (website, documentation, etc.)..."
                                    className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all resize-none placeholder:text-stone-400"
                                />
                            </div>

                            <button
                                disabled={formStatus !== "idle"}
                                type="submit"
                                className={cn(
                                    "w-full py-5 rounded-[20px] font-bold text-lg flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-xl",
                                    formStatus === "idle" ? "bg-stone-900 text-white hover:bg-orange-600 hover:shadow-orange-500/20" :
                                        formStatus === "submitting" ? "bg-stone-800 text-stone-400 cursor-not-allowed" :
                                            formStatus === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                                )}
                            >
                                {formStatus === "idle" && (
                                    <>
                                        Send Inquiry
                                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                                {formStatus === "submitting" && (
                                    <>
                                        Sending Inquiry...
                                        <div className="w-5 h-5 border-2 border-stone-400 border-t-white rounded-full animate-spin" />
                                    </>
                                )}
                                {formStatus === "success" && (
                                    <>
                                        Inquiry Sent Successfully
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold"
                                        >
                                            ✓
                                        </motion.div>
                                    </>
                                )}
                                {formStatus === "error" && (
                                    <>
                                        Submission Failed - Try Again
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold"
                                        >
                                            !
                                        </motion.div>
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* What Happens Next Section */}
            <section className="py-24 bg-white px-4 md:px-6 relative overflow-hidden">
                <div className="container mx-auto max-w-4xl relative">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold font-playfair mb-4 text-stone-900">What Happens Next?</h2>
                        <p className="text-stone-500 max-w-lg mx-auto font-light">The journey from vision to reality, simplified into three transparent steps.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600"><FileText className="w-6 h-6" /></div>,
                                title: "Discovery",
                                desc: "I'll dive into your requirements and research the best technical path to achieve your goals within 24 hours."
                            },
                            {
                                icon: <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 text-amber-600"><PhoneCall className="w-6 h-6" /></div>,
                                title: "Consultation",
                                desc: "We'll hop on a brief strategy call to align on vision and ensure perfect synergy for the project."
                            },
                            {
                                icon: <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 text-stone-600"><Rocket className="w-6 h-6" /></div>,
                                title: "Execution",
                                desc: "I'll provide a detailed roadmap and quote, and we start building your extraordinary solution."
                            }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="p-8 rounded-[32px] bg-stone-50 border border-stone-100 relative group hover:bg-white hover:shadow-xl transition-all"
                            >
                                <span className="absolute top-6 right-8 text-6xl font-black text-stone-200/40 select-none group-hover:text-orange-500/10 transition-colors">0{i + 1}</span>
                                {step.icon}
                                <h3 className="text-xl font-bold mb-3 text-stone-900">{step.title}</h3>
                                <p className="text-stone-600 text-sm leading-relaxed font-light">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
