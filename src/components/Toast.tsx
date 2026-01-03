"use client"

import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, Check, AlertCircle, Info, Loader2, Zap } from "lucide-react"
import { useToast, Toast as ToastType } from "../hooks/use-toast"

const transformTypeToIcon = (type?: ToastType["type"]) => {
    switch (type) {
        case "success":
            return <Check className="w-5 h-5 text-green-400" />
        case "error":
            return <AlertCircle className="w-5 h-5 text-red-500" />
        case "info":
            return <Info className="w-5 h-5 text-blue-400" />
        case "loading":
            return <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
        default:
            return <Zap className="w-5 h-5 text-orange-400" />
    }
}

const ToastItem = ({ toast }: { toast: ToastType }) => {
    const { removeToast } = useToast()

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="pointer-events-auto relative w-full max-w-sm rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl p-4 shadow-lg shadow-black/20"
            role="alert"
        >
            <div className="flex gap-4">
                <div className="flex-shrink-0 pt-0.5">
                    {transformTypeToIcon(toast.type)}
                </div>
                <div className="w-full flex-1 pt-0.5">
                    <p className="text-sm font-semibold text-white/90">
                        {toast.title}
                    </p>
                    {toast.description && (
                        <p className="mt-1 text-sm text-white/60">
                            {toast.description}
                        </p>
                    )}
                    {toast.action && (
                        <div className="mt-2 text-sm">
                            {toast.action}
                        </div>
                    )}
                </div>
                <div className="flex-shrink-0">
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="inline-flex rounded-md p-1.5 text-white/40 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="sr-only">Dismiss</span>
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export const Toaster = () => {
    const { toasts } = useToast()

    return (
        <div className="pointer-events-none fixed bottom-4 right-4 z-[9999] flex w-full max-w-[420px] flex-col gap-2 p-4 md:bottom-8 md:right-8">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} />
                ))}
            </AnimatePresence>
        </div>
    )
}
