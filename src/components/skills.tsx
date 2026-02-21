"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SkillItem = ({ item, index }: { item: string, index: number }) => {
    const itemRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "end start"]
    });

    // Micro-parallax: alternating directions based on index mapped to scroll
    const yOffset = index % 2 === 0 ? ["8px", "-8px"] : ["-8px", "8px"];
    const y = useTransform(scrollYProgress, [0, 1], yOffset);

    return (
        <motion.li
            ref={itemRef}
            style={{ y }}
            className="py-4 border-b border-beige-200/40 last:border-0 text-text-secondary hover:text-accent-sienna transition-colors duration-300 font-outfit"
        >
            {item}
        </motion.li>
    );
};

export const Skills = () => {
    const skillset = [
        {
            category: "Languages",
            items: ["Rust", "Python", "C", "Bash", "SQL"]
        },
        {
            category: "Offensive",
            items: ["Active Directory", "Reverse Engineering", "Web Exploitation", "Network Recon", "Privilege Escalation"]
        },
        {
            category: "Infrastructure",
            items: ["Linux (Arch)", "Docker", "Git", "AWS", "Terraform"]
        }
    ];

    return (
        <section id="capabilities" className="py-32 px-4 md:px-8 relative bg-beige-50/50 dark:bg-transparent">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-24 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-8 tracking-tight">Capabilities</h2>
                    <div className="w-16 h-[1px] bg-accent-caramel/50 mx-auto"></div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-16 md:gap-12">
                    {skillset.map((group, groupIndex) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.8, delay: groupIndex * 0.1, ease: "easeOut" }}
                        >
                            <h4 className="text-2xl font-serif text-text-primary mb-8 flex items-center gap-4">
                                <span className="text-xs font-outfit tracking-[0.2em] text-accent-caramel uppercase">0{groupIndex + 1}</span>
                                {group.category}
                            </h4>
                            <ul className="flex flex-col">
                                {group.items.map((item, index) => (
                                    <SkillItem key={item} item={item} index={index} />
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
