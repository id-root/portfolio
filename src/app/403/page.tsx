"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function ForbiddenPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-background">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full bg-[var(--brand-dark)] border border-[var(--brand-accent)]/30 rounded-2xl p-8 backdrop-blur-xl relative z-10 shadow-[0_20px_60px_rgba(49,39,38,0.3)]"
            >
                <div className="flex items-center gap-4 mb-6 border-b border-[var(--brand-accent)]/20 pb-4">
                    <ShieldAlert className="w-10 h-10 text-[var(--brand-accent)] animate-pulse" />
                    <h1 className="text-3xl font-gamja font-bold text-[var(--brand-accent)] tracking-wider">
                        ACCESS DENIED
                    </h1>
                </div>

                <div className="space-y-6 font-mono text-sm md:text-base">
                    <div className="bg-[var(--brand-dark)] border border-[var(--brand-accent)]/20 p-4 rounded-xl">
                        <p className="flex gap-2 text-[var(--brand-light)]">
                            <span className="text-[var(--brand-accent)]">root@vector:~$</span>
                            <span>sudo access-level --check</span>
                        </p>
                        <p className="mt-2 text-[var(--brand-light)]/80">
                            [ERROR] 403_FORBIDDEN<br />
                            Security Protocol Override: FAILED<br />
                            Neural Link Handshake: REJECTED<br />
                            Clearance Level: INSUFFICIENT
                        </p>
                    </div>

                    <p className="text-[var(--brand-light)]/60">
                        It seems you&apos;ve wandered into a restricted sector of the grid.
                        This area is protected by Level-5 kinetic firewalls.
                        Please return to safe coordinates immediately.
                    </p>

                    <div className="pt-4 flex justify-center">
                        <Link
                            href="/"
                            className="px-8 py-3.5 rounded-full font-outfit uppercase tracking-widest text-xs font-semibold transition-all duration-500 hover:shadow-[0_8px_32px_rgba(196,168,130,0.3)]"
                            style={{
                                backgroundColor: 'var(--brand-accent)',
                                color: 'var(--brand-dark)',
                            }}
                        >
                            RETURN TO SAFETY
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
