"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import * as d3 from "d3"
import type { MotionValue } from "framer-motion"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  /** framer-motion MotionValue in [0,1] that drives globe rotation */
  scrollProgress?: MotionValue<number>
}

import globeData from "../../../public/globe-data.json"

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = "",
  scrollProgress,
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Refs to hold mutable data across renders
  const projectionRef = useRef<d3.GeoProjection | null>(null)
  const renderFnRef = useRef<(() => void) | null>(null)
  const baseRadiusRef = useRef<number>(0)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    // Set up responsive dimensions
    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2.5
    baseRadiusRef.current = radius

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    // Create projection and path generator for Canvas
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    projectionRef.current = projection

    const path = d3.geoPath().projection(projection).context(context)

    interface DotData {
      lng: number
      lat: number
    }

    const allDots: DotData[] = []
    let landFeatures: any

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      // Draw ocean (globe background)
      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      
      const gradient = context.createRadialGradient(
        containerWidth / 2, containerHeight / 2, 0,
        containerWidth / 2, containerHeight / 2, currentScale
      )
      gradient.addColorStop(0, '#312726') // mid-ocean dark (charcoal)
      gradient.addColorStop(1, '#2c2322') // dark ocean bg (darker charcoal)
      context.fillStyle = gradient

      context.fill()
      context.strokeStyle = "rgba(255, 248, 237, 0.2)" // soft cream outline
      context.lineWidth = 1 * scaleFactor
      context.stroke()

      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = "rgba(255, 248, 237, 0.1)"
        context.lineWidth = 1 * scaleFactor
        context.globalAlpha = 1
        context.stroke()
        context.globalAlpha = 1

        // Draw land outlines
        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.strokeStyle = "rgba(255, 248, 237, 0.4)"
        context.lineWidth = 1 * scaleFactor
        context.stroke()

        // Draw halftone dots
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath()
            context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "rgba(255, 248, 237, 0.9)"
            context.fill()
          }
        })
      }
    }

    renderFnRef.current = render

    const loadWorldData = async () => {
      try {
        setIsLoading(true)

        // Statically use imported JSON instead of fetch() to avoid Vercel 404s
        const payload = globeData as any
        landFeatures = payload.landFeatures

        payload.dots.forEach((dot: [number, number]) => {
          allDots.push({ lng: dot[0], lat: dot[1] })
        })

        render()
        setIsLoading(false)
      } catch (err) {
        console.error(err);
        setError("Failed to load land map data")
        setIsLoading(false)
      }
    }

    // --- Interaction: drag ---
    const rotation: [number, number] = [0, 0]

    const handleMouseDown = (event: MouseEvent) => {
      const startX = event.clientX
      const startY = event.clientY
      const startRotation: [number, number] = [...rotation]

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5
        const dx = moveEvent.clientX - startX
        const dy = moveEvent.clientY - startY

        rotation[0] = startRotation[0] + dx * sensitivity
        rotation[1] = startRotation[1] - dy * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))

        projection.rotate(rotation)
        render()
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    canvas.addEventListener("mousedown", handleMouseDown)

    // --- Scroll-driven rotation ---
    // When scrollProgress is provided, subscribe to it and rotate
    let unsubscribeScroll: (() => void) | undefined
    if (scrollProgress) {
      unsubscribeScroll = scrollProgress.on("change", (v: number) => {
        // Map 0-1 to 0-720 degrees (two full rotations over the scroll)
        const lng = v * 720
        const lat = Math.sin(v * Math.PI * 2) * 15 // gentle wobble
        projection.rotate([lng, lat])
        render()
      })
    } else {
      // Fallback: auto-rotate with d3.timer if no scroll prop
      let autoRotateLng = 0
      const rotationTimer = d3.timer(() => {
        autoRotateLng += 0.3
        projection.rotate([autoRotateLng, 0])
        render()
      })

      // Store cleanup
      const origCleanup = () => {
        rotationTimer.stop()
      }
      unsubscribeScroll = origCleanup
    }

    loadWorldData()

    return () => {
      if (unsubscribeScroll) unsubscribeScroll()
      canvas.removeEventListener("mousedown", handleMouseDown)
    }
  }, [width, height, scrollProgress])

  if (error) {
    return (
      <div className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="dark text-destructive font-semibold mb-2">Error loading Earth visualization</p>
          <p className="dark text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-2xl bg-transparent"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  )
}
