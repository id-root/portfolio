"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useSpring, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";

/**
 * LiquidGlassCard — True liquid glass card with SVG feTurbulence
 * backdrop distortion, backdrop-blur, smooth rounded edges, and 3D tilt.
 */

function CardGlassFilter({ id }: { id: string }) {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter
          id={id}
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03 0.03"
            numOctaves="2"
            seed="2"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="3" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="2.5" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "a";
  href?: string;
  target?: string;
  children: React.ReactNode;
}

const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  ({ className, children, as = "div", ...props }, ref) => {
    const filterId = React.useId().replace(/:/g, "");
    
    // 3D Tilt logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      const xPct = clickX / rect.width - 0.5;
      const yPct = clickY / rect.height - 0.5;
      
      x.set(xPct);
      y.set(yPct);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const Comp = as === "a" ? motion.a : motion.div;

    return (
      <Comp
        ref={ref as any}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "liquid-glass-card relative group shadow-2xl transition-all duration-300",
          className
        )}
        {...(props as any)}
      >
        {/* SVG backdrop distortion layer */}
        <div
          className="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden rounded-[1.25rem]"
          style={{ backdropFilter: `url("#glass-${filterId}") blur(16px)` }}
        />

        {/* Dynamic glare/lighting reflection */}
        <motion.div
           className="absolute inset-0 z-0 pointer-events-none rounded-[1.25rem]"
           style={{
             background: useMotionTemplate`radial-gradient(ellipse at ${useTransform(mouseXSpring, x => x * 100 + 50)}% ${useTransform(mouseYSpring, y => y * 100 + 50)}%, rgba(255, 248, 237, 0.15) 0%, transparent 60%)`
           }}
        />

        {/* Inset shadow ring — liquid glass edge refraction */}
        <div
          className="absolute top-0 left-0 z-0 h-full w-full rounded-[1.25rem] pointer-events-none"
          style={{
            boxShadow:
              "inset 1px 1px 2px -0.5px rgba(255,255,255,0.25), inset -1px -1px 2px -0.5px rgba(255,255,255,0.15), 0 0 10px rgba(0,0,0,0.04)",
          }}
        />

        {/* Content */}
        <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
          {children}
        </div>

        <CardGlassFilter id={`glass-${filterId}`} />
      </Comp>
    );
  }
);

LiquidGlassCard.displayName = "LiquidGlassCard";

export { LiquidGlassCard };
