"use client"

import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLMotionProps, MotionValue, motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "absolute will-change-transform flex size-full flex-col items-center justify-center gap-6 rounded-2xl p-6",
)

interface ReviewProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
  maxRating?: number
}

interface CardStickyProps extends HTMLMotionProps<"div">, VariantProps<typeof cardVariants> {
  arrayLength: number
  index: number
  incrementY?: number
  incrementZ?: number
  incrementRotation?: number
}

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}

const ContainerScrollContext = React.createContext<ContainerScrollContextValue | undefined>(undefined)

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (context === undefined) {
    throw new Error("useContainerScrollContext must be used within a ContainerScrollContextProvider")
  }
  return context
}

export const ContainerScroll: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, style, className, ...props }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  
  // Adjusted offset to strictly start when the container hits the top of the viewport (fully in view)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  })

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-[60vh] md:min-h-[80vh] w-full", className)}
        style={{ perspective: "1000px", ...style }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}
ContainerScroll.displayName = "ContainerScroll"

export const CardsContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ perspective: "1000px", ...props.style }}
      {...props}
    >
      {children}
    </div>
  )
}
CardsContainer.displayName = "CardsContainer"

export const CardTransformed = React.forwardRef<HTMLDivElement, CardStickyProps>(
  ({ arrayLength, index, incrementY = 10, incrementZ = 10, incrementRotation, className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext()

    const isLastCard = index === arrayLength;
    const flyOffCardsCount = Math.max(1, arrayLength - 1);
    
    // Normalize animation to perfectly end at 1.0 (no dead scrolling space!)
    const start = (index - 1) / flyOffCardsCount;
    const end = isLastCard ? 1.0 : index / flyOffCardsCount;
    const range = [start, end];

    // Card straigthens right as it flies off (or when the flying card above it reveals it)
    const rotateStart = Math.max(0, start - 0.2);
    const rotateEnd = isLastCard ? 1.0 : end;

    // Last card stays as the final presentation, all others fly entirely off screen
    const y = useTransform(scrollYProgress, range, ["0%", isLastCard ? "0%" : "-250%"]);
    
    // Give cards a nice scattered stack look 
    const initialRotation = incrementRotation !== undefined ? incrementRotation : (index % 2 === 0 ? index * 2 : -index * 2);
    const rotate = useTransform(scrollYProgress, [rotateStart, rotateEnd], [initialRotation, 0]);
    
    const z = useTransform(scrollYProgress, range, [index * incrementZ, 0]);
    const transform = useMotionTemplate`translateZ(${z}px) translateY(${y}) rotate(${rotate}deg)`

    const cardStyle = {
      top: index * incrementY,
      transform,
      backfaceVisibility: "hidden" as const,
      zIndex: (arrayLength - index) * incrementZ,
      ...style,
    }

    return (
      <motion.div
        layout="position"
        ref={ref}
        style={cardStyle}
        className={cn(cardVariants({ className }))}
        {...props}
      />
    )
  }
)
CardTransformed.displayName = "CardTransformed"

export const ReviewStars = React.forwardRef<HTMLDivElement, ReviewProps>(
  ({ rating, maxRating = 5, className, ...props }, ref) => {
    const filledStars = Math.floor(rating)
    const fractionalPart = rating - filledStars
    const emptyStars = maxRating - filledStars - (fractionalPart > 0 ? 1 : 0)

    return (
      <div className={cn("flex items-center gap-2", className)} ref={ref} {...props}>
        <div className="flex items-center">
          {[...Array(filledStars)].map((_, index) => (
            <svg key={`filled-${index}`} className="size-4 text-inherit" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
          {fractionalPart > 0 && (
            <svg className="size-4 text-inherit" fill="currentColor" viewBox="0 0 20 20">
              <defs>
                <linearGradient id="half">
                  <stop offset={`${fractionalPart * 100}%`} stopColor="currentColor" />
                  <stop offset={`${fractionalPart * 100}%`} stopColor="rgb(209 213 219)" />
                </linearGradient>
              </defs>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" fill="url(#half)" />
            </svg>
          )}
          {[...Array(emptyStars)].map((_, index) => (
            <svg key={`empty-${index}`} className="size-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
        </div>
        <p className="sr-only">{rating}</p>
      </div>
    )
  }
)
ReviewStars.displayName = "ReviewStars"
