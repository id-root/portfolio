"use client";

import Link from "next/link";
import { Radio, Terminal } from "lucide-react";
import { CyberButton } from "@/components/ui/cyber-button";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl w-full text-center relative z-10"
            >
                <div className="mb-8 relative inline-block">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-red-500/30 rounded-full"
                    />
                    <div className="w-32 h-32 bg-stone-900/50 backdrop-blur rounded-full flex items-center justify-center border border-red-500/50 shadow-lg mx-auto relative">
                        <Radio className="w-12 h-12 text-red-500" />
                    </div>
                </div>

                <h1 className="text-6xl font-heading font-bold text-stone-900 dark:text-white mb-2 glitch-text" data-text="404">
                    404
                </h1>
                <h2 className="text-2xl font-mono text-red-500 mb-6">
                    SIGNAL LOST_
                </h2>

                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                    The requested coordinates cannot be resolved. The data stream may have been corrupted or the sector has been decommissioned.
                </p>

                <div className="flex justify-center gap-4">
                    <Link href="/">
                        <CyberButton variant="primary">
                            RE-INITIALIZE
                        </CyberButton>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
