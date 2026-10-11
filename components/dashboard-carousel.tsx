"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RichText } from "@/components/rich-text"

type Slide = {
  title: string
  description: string | string[]
  bullets?: string[]
  image: string
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

export function DashboardCarousel({
  title,
  description,
  slides,
}: {
  title?: string
  description?: string
  slides: Slide[]
}) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1)
    setCurrent(next)
  }

  if (!slides || slides.length === 0) return null

  return (
    <div className="mt-6 space-y-3">
      {/* Heading */}
      {(title || description) && (
        <div>
          {title && (
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>
      )}

      {/* Carousel card */}
      <div className="rounded-xl border border-border overflow-hidden bg-card">
        {/* Text + controls */}
        <div className="px-5 pt-4 pb-3 border-b border-border">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-1">
                {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </p>
              <h4 className="text-base font-semibold text-foreground mb-1">{slides[current].title}</h4>
              <div className="space-y-2">
                {(Array.isArray(slides[current].description)
                  ? slides[current].description
                  : [slides[current].description]
                ).map((para, i) => (
                  <RichText key={i} text={para} className="text-sm" />
                ))}
                {slides[current].bullets && (
                  <ul className="mt-1 space-y-1">
                    {slides[current].bullets!.map((item, i) => {
                      const colonIndex = item.indexOf(":")
                      const label = colonIndex !== -1 ? item.slice(0, colonIndex + 1) : null
                      const rest = colonIndex !== -1 ? item.slice(colonIndex + 1) : item
                      return (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" />
                          <span>
                            {label && <span className="text-foreground font-medium">{label}</span>}
                            {rest}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go((current - 1 + slides.length) % slides.length)}
                className="flex items-center justify-center size-8 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => go((current + 1) % slides.length)}
                className="flex items-center justify-center size-8 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative overflow-hidden bg-muted">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Image
                src={slides[current].image}
                alt={slides[current].title}
                width={1200}
                height={675}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
