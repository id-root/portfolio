"use client";

import Link from "next/link";
import { ShieldAlert, Terminal } from "lucide-react";
import { CyberButton } from "@/components/ui/cyber-button";
import { motion } from "framer-motion";

export default function ForbiddenPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glitch Effect */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full bg-black/80 border border-red-500/30 rounded-lg p-8 backdrop-blur-xl relative z-10 shadow-[0_0_50px_rgba(239,68,68,0.2)]"
            >
                <div className="flex items-center gap-4 mb-6 border-b border-red-500/20 pb-4">
                    <ShieldAlert className="w-10 h-10 text-red-500 animate-pulse" />
                    <h1 className="text-3xl font-heading font-bold text-red-500 tracking-wider">
                        ACCESS DENIED_
                    </h1>
                </div>

                <div className="space-y-6 font-mono text-sm md:text-base">
                    <div className="bg-red-950/20 border border-red-900/30 p-4 rounded text-red-400">
                        <p className="flex gap-2">
                            <span className="text-red-600">root@vector:~$</span>
                            <span>sudo access-level --check</span>
                        </p>
                        <p className="mt-2 text-white">
                            [ERROR] 403_FORBIDDEN<br />
                            Security Protocol Override: FAILED<br />
                            Neural Link Handshake: REJECTED<br />
                            Clearance Level: INSUFFICIENT
                        </p>
                    </div>

                    <p className="text-slate-400">
                        It seems you&apos;ve wandered into a restricted sector of the grid.
                        This area is protected by Level-5 kinetic firewalls.
                        Please return to safe coordinates immediately.
                    </p>

                    <div className="pt-4 flex justify-center">
                        <Link href="/">
                            <CyberButton variant="danger" glitch>
                                RETURN TO SAFETY
                            </CyberButton>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
