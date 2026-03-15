"use client"

import * as React from "react"
import { CardTransformed, CardsContainer, ContainerScroll, ProgressIndicator } from "./animated-cards-stack"
import Image from "next/image"
import { cn } from "@/lib/utils"

const myAccomplishments = [
  { tempId: 0, image: "/badges/aoc2024.png", title: "Advent of Cyber 2024", desc: "Completed TryHackMe's annual event", icon: "🎄" },
  { tempId: 1, image: "/badges/aoc2025.png", title: "Advent of Cyber 2025", desc: "Completed TryHackMe's annual event", icon: "🎅" },
  { tempId: 2, image: "/badges/sidequest.png", title: "Side Quest 2025", desc: "Completed advanced challenge track", icon: "⚔️" },
  { tempId: 3, image: "/badges/pentest101.png", title: "Penetration 101", desc: "Foundations of penetration testing", icon: "🛡️" },
  { tempId: 4, image: "/badges/osint.png", title: "OSINT", desc: "Open-source intelligence gathering", icon: "🔍" },
  { tempId: 5, image: "/badges/apihacking.png", title: "API Hacking", desc: "API security testing methodology", icon: "🔌" },
]

export const AwardsVariant = () => {
  return (
    <section className="bg-transparent px-4 sm:px-8 pb-0">
      <ContainerScroll className="w-full h-[140vh]" totalCards={myAccomplishments.length}>
        <div className="sticky left-0 top-0 h-svh w-full flex items-center justify-center overflow-hidden">
          <CardsContainer className="mx-auto w-full max-w-2xl md:max-w-3xl h-[400px] md:h-[500px]">
            {myAccomplishments.map((item, index) => (
              <CardTransformed
                key={item.tempId}
                className="items-start justify-evenly border border-stone-200/50 dark:border-[#d5c0aa]/15 bg-white dark:bg-[#0a0a0a] shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.8)] px-8 md:px-12 py-10"
                arrayLength={myAccomplishments.length}
                index={index + 1}
              >
                <div className="flex flex-col items-center justify-center space-y-6 w-full h-full text-center">
                  <div className="relative mb-2 w-[140px] h-[140px] md:w-[180px] md:h-[180px]">
                      <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain drop-shadow-xl"
                          unoptimized
                      />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-serif font-bold text-stone-800 dark:text-[#d5c0aa] drop-shadow-sm tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-stone-500 dark:text-stone-300 font-light leading-relaxed max-w-[340px] md:max-w-[420px] text-lg md:text-xl">
                    {item.desc}
                  </p>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
          {/* Progress indicator inside the sticky container so it's always visible */}
          <ProgressIndicator totalCards={myAccomplishments.length} />
        </div>
      </ContainerScroll>
    </section>
  )
}
