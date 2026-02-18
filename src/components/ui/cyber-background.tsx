"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export const CyberBackground = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {theme === "dark" ? <NetworkCanvas /> : <CircuitBoard />}
        </div>
    );
};

const NetworkCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;
            }
            draw() {
                if (!ctx) return;
                ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < 60; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, w, h);

            // Draw particles and lines
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(100, 100, 100, ${0.1 - distance / 1500})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener("resize", handleResize);
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />;
};

const CircuitBoard = () => {
    return (
        <div className="absolute inset-0 bg-[#fff5f2]">
            {/* Large smooth gradient orbs - Harmonized with peach base */}
            <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-gradient-to-br from-red-100/30 via-orange-50/20 to-transparent rounded-full blur-3xl animate-blob will-change-transform"></div>
            <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-gradient-to-bl from-red-50/30 via-red-100/20 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000 will-change-transform"></div>
            <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-orange-50/30 via-red-50/20 to-transparent rounded-full blur-3xl animate-blob animation-delay-4000 will-change-transform"></div>

            {/* Subtle radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-white/20 via-transparent to-transparent rounded-full blur-2xl"></div>

            {/* Sublte warm-gray grid texture */}
            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #78716c 1px, transparent 1px),
                        linear-gradient(to bottom, #78716c 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* Soft animated scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent w-full h-[30%] animate-scanline pointer-events-none"></div>

            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-stone-200/5"></div>
        </div>
    );
};

