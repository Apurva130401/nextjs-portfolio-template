"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, Check, AlertCircle, Info, Loader2 } from "lucide-react"

export type ToastType = "success" | "error" | "info" | "loading"

export interface Toast {
    id: string
    title: string
    description?: string
    type?: ToastType
    duration?: number
    action?: ReactNode
}

interface ToastContextHelper {
    toasts: Toast[]
    addToast: (toast: Omit<Toast, "id">) => string
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextHelper | undefined>(undefined)

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}

// Simple ID generator
const generateId = () => Math.random().toString(36).substring(2, 9)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([])

    const addToast = useCallback((toast: Omit<Toast, "id">) => {
        const id = generateId()
        setToasts((prev) => [...prev, { ...toast, id }])

        // Auto dismiss
        if (toast.type !== "loading") {
            setTimeout(() => {
                removeToast(id)
            }, toast.duration || 4000)
        }

        return id
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    )
}
