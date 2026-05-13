"use client"

import { useRef, useState, useEffect } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion"
import RotatingEarth from "@/components/ui/wireframe-dotted-globe"
import {
  Swords,
  Shield,
  Network,
  Search,
  ArrowUpRight,
  Server,
  Container,
  GitBranch,
  Cloud,
  Blocks,
  Code2,
  Terminal,
  Cpu,
  TerminalSquare,
  Database,
  type LucideIcon,
} from "lucide-react"

/* ───────────────────────── Data Model ───────────────────────── */

interface SkillItem {
  name: string
  icon: LucideIcon
}

interface SkillPhase {
  category: string
  icon: LucideIcon
  skills: SkillItem[]
  hue: number
}

const PHASES: SkillPhase[] = [
  {
    category: "Offensive",
    icon: Swords,
    hue: 195,
    skills: [
      { name: "Active Directory", icon: Shield },
      { name: "Reverse Engineering", icon: Search },
      { name: "Web Exploitation", icon: Network },
      { name: "Network Recon", icon: Search },
      { name: "Privilege Escalation", icon: ArrowUpRight },
    ],
  },
  {
    category: "Infrastructure",
    icon: Server,
    hue: 200,
    skills: [
      { name: "Linux", icon: Terminal },
      { name: "Docker", icon: Container },
      { name: "Git", icon: GitBranch },
      { name: "AWS", icon: Cloud },
      { name: "Terraform", icon: Blocks },
    ],
  },
  {
    category: "Languages",
    icon: Code2,
    hue: 210,
    skills: [
      { name: "Rust", icon: Cpu },
      { name: "Python", icon: Code2 },
      { name: "C", icon: TerminalSquare },
      { name: "Bash", icon: Terminal },
      { name: "SQL", icon: Database },
    ],
  },
]

/* Pre-generated deterministic star positions (avoids SSR hydration mismatch) */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

const STARS = Array.from({ length: 150 }, (_, i) => ({
  x: Math.round(seededRandom(i * 3 + 1) * 10000) / 100,
  y: Math.round(seededRandom(i * 3 + 2) * 10000) / 100,
  opacity: Math.round((seededRandom(i * 3 + 3) * 0.5 + 0.1) * 100) / 100,
  delay: Math.round(seededRandom(i * 3 + 4) * 500) / 100,
  duration: Math.round((2 + seededRandom(i * 3 + 5) * 4) * 100) / 100,
}))

/* ──────────────── Orbital math ──────────────── */

function orbitalPosition(
  t: number,
  index: number,
  total: number,
  rx: number,
  ry: number,
  tiltDeg: number = 20,
) {
  const angle = t * Math.PI * 2 + (index / total) * Math.PI * 2
  const tiltRad = (tiltDeg * Math.PI) / 180

  const x = Math.cos(angle) * rx
  const yRaw = Math.sin(angle) * ry
  const y = yRaw * Math.cos(tiltRad)
  const z = Math.sin(angle) // -1 to 1 depth

  return { x, y, z }
}

/* ──────────────── Single Asteroid ──────────────── */

interface AsteroidProps {
  label: string
  icon: LucideIcon
  x: number
  y: number
  z: number
  opacity: number
  hue: number
  isLeader?: boolean
}

function Asteroid({ label, icon: Icon, x, y, z, opacity, hue, isLeader }: AsteroidProps) {
  const scale = 0.65 + (z + 1) * 0.25
  const zIndex = z > 0 ? 30 : 10

  if (opacity <= 0.01) return null

  return (
    <div
      className="absolute pointer-events-auto select-none will-change-transform"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        zIndex,
      }}
    >
      <div
        className={`
          flex items-center gap-2
          backdrop-blur-sm rounded-full
          whitespace-nowrap transition-shadow duration-300
          cursor-default
          ${
            isLeader
              ? "bg-[var(--brand-light)] border-2 border-[var(--brand-light)] px-6 py-3 text-base font-semibold tracking-wide"
              : "bg-[var(--brand-dark)]/90 border border-[var(--brand-light)]/40 px-4 py-2 text-sm font-medium hover:border-[var(--brand-light)] hover:bg-[var(--brand-dark)] transition-colors"
          }
        `}
        style={{
          color: isLeader ? "var(--brand-dark)" : "var(--brand-light)",
        }}
      >
        <Icon size={isLeader ? 20 : 16} strokeWidth={1.5} />
        <span>{label}</span>
      </div>
    </div>
  )
}

/* ──────────── Progress-reactive renderer ──────────── */

function MotionValueRenderer({
  progress,
  render,
}: {
  progress: MotionValue<number>
  render: (p: number) => React.ReactNode
}) {
  const [p, setP] = useState(0)

  useMotionValueEvent(progress, "change", (v) => {
    setP(v)
  })

  return <>{render(p)}</>
}

/* ──────────────── Asteroid Belt ──────────────── */

interface AsteroidBeltProps {
  phase: SkillPhase
  progress: MotionValue<number>
  viewportWidth: number
  viewportHeight: number
}

function AsteroidBelt({ phase, progress, viewportWidth, viewportHeight }: AsteroidBeltProps) {
  const rx = Math.min(viewportWidth * 0.38, 380)
  const ry = Math.min(viewportHeight * 0.28, 260)
  const total = phase.skills.length + 1

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Leader */}
      <MotionValueRenderer
        progress={progress}
        render={(p) => {
          const { x, y, z } = orbitalPosition(p * 1.2, 0, total, rx, ry, 22)
          const fadeIn = Math.min(1, p / 0.12)
          const fadeOut = Math.min(1, (1 - p) / 0.12)
          const opacity = fadeIn * fadeOut

          return (
            <Asteroid
              label={phase.category}
              icon={phase.icon}
              x={x}
              y={y}
              z={z}
              opacity={opacity}
              hue={phase.hue}
              isLeader
            />
          )
        }}
      />

      {/* Trailing skill asteroids */}
      {phase.skills.map((skill, i) => (
        <MotionValueRenderer
          key={skill.name}
          progress={progress}
          render={(p) => {
            const stagger = 0.04 * (i + 1)
            const localP = Math.max(0, (p - stagger) / (1 - stagger))
            const { x, y, z } = orbitalPosition(
              localP * 1.2,
              i + 1,
              total,
              rx,
              ry,
              22,
            )
            const fadeIn = Math.min(1, localP / 0.1)
            const fadeOut = Math.min(1, (1 - p) / 0.1)
            const opacity = localP > 0 ? fadeIn * fadeOut : 0

            return (
              <Asteroid
                label={skill.name}
                icon={skill.icon}
                x={x}
                y={y}
                z={z}
                opacity={opacity}
                hue={phase.hue}
              />
            )
          }}
        />
      ))}
    </div>
  )
}

/* ──────────────── Main Parallax Section ──────────────── */

export default function SkillAsteroidsParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 800, h: 600 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Three phases
  const phase1Progress = useTransform(scrollYProgress, [0, 0.33], [0, 1], {
    clamp: true,
  })
  const phase2Progress = useTransform(scrollYProgress, [0.33, 0.66], [0, 1], {
    clamp: true,
  })
  const phase3Progress = useTransform(scrollYProgress, [0.66, 1], [0, 1], {
    clamp: true,
  })

  const phaseProgresses = [phase1Progress, phase2Progress, phase3Progress]

  // Track viewport
  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Active phase indicator
  const [activePhase, setActivePhase] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.33) setActivePhase(0)
    else if (v < 0.66) setActivePhase(1)
    else setActivePhase(2)
  })

  return (
    <section ref={containerRef} className="relative h-[400vh]" id="skills-parallax">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center section-dark w-full">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,248,237,0.05) 0%, transparent 70%)",
          }}
        />

        {/* BIG SKILLS TEXT — JeskoJets "Global" style: massive, edge-to-edge behind globe */}
        <div className="absolute top-[-10%] inset-x-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden select-none">
            <span
              className="font-gamja text-[var(--brand-light)] font-bold uppercase whitespace-nowrap"
              style={{
                fontSize: "clamp(14rem, 28vw, 50rem)",
                letterSpacing: "-0.03em",
                lineHeight: "0.85",
                opacity: 0.08,
              }}
            >
              SKILLS
            </span>
        </div>

        {/* Starfield particles — optimized as a single static SVG background instead of 150 animated DOM nodes */}
        <div 
            className="absolute inset-0 pointer-events-none"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E${STARS.map(star => `%3Ccircle cx='${star.x}%25' cy='${star.y}%25' r='1' fill='%23FFF8ED' opacity='${star.opacity}' /%3E`).join('')}%3C/svg%3E")`
            }}
        />

        {/* Globe */}
        <div className="relative z-20">
          <RotatingEarth
            width={Math.min(dims.w * 0.55, 650)}
            height={Math.min(dims.h * 0.65, 550)}
            scrollProgress={scrollYProgress}
          />
        </div>

        {/* Asteroid overlays */}
        {PHASES.map((phase, i) => (
          <AsteroidBelt
            key={phase.category}
            phase={phase}
            progress={phaseProgresses[i]}
            viewportWidth={dims.w}
            viewportHeight={dims.h}
          />
        ))}

        {/* Phase indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-40">
          {PHASES.map((phase, i) => (
            <div
              key={phase.category}
              className="flex items-center gap-2 transition-all duration-500"
              style={{ opacity: activePhase === i ? 1 : 0.25 }}
            >
              <div
                className="w-2 h-2 rounded-full transition-all duration-500"
                style={{
                  backgroundColor:
                    activePhase === i
                      ? "var(--brand-light)"
                      : "rgba(255,248,237,0.2)",
                  boxShadow: "none",
                  transform: activePhase === i ? "scale(1.4)" : "scale(1)",
                }}
              />
              <span
                className="text-xs font-medium tracking-wider uppercase transition-colors duration-500"
                style={{
                  color: activePhase === i ? "var(--brand-light)" : "rgba(255,248,237,0.4)",
                  textShadow: "none",
                }}
              >
                {phase.category}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll hint — only visible at start */}
        <MotionValueRenderer
          progress={scrollYProgress}
          render={(p) => {
            const opacity = Math.max(0, 1 - p * 20) // Fades out very quickly
            if (opacity <= 0) return null
            return (
              <div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
                style={{ opacity }}
              >
                <span className="text-xs text-[var(--brand-light)]/40 tracking-widest uppercase">
                  Scroll to explore
                </span>
                <motion.div
                  className="w-5 h-8 rounded-full border border-[var(--brand-light)]/20 flex items-start justify-center p-1"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-1 h-2 rounded-full bg-[var(--brand-light)]/50" />
                </motion.div>
              </div>
            )
          }}
        />
      </div>
    </section>
  )
}
