"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

export interface Testimonial {
  id: string
  name: string
  role: string
  avatar?: string
  content: string
  rating: number
  badge?: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoPlayInterval?: number
  className?: string
}

export function TestimonialCarousel({
  testimonials,
  autoPlayInterval = 5000,
  className = "",
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return
    const timer = setInterval(next, autoPlayInterval)
    return () => clearInterval(timer)
  }, [isPaused, next, autoPlayInterval, testimonials.length])

  if (testimonials.length === 0) return null

  const t = testimonials[current]

  return (
    <section
      className={`py-16 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by Builders
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            See why teams are switching to Titan for their AI agent workflows.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Quote decoration */}
          <Quote className="absolute -top-6 -left-4 h-12 w-12 text-primary/10" aria-hidden="true" />

          <Card className="border-2 shadow-lg">
            <CardContent className="p-8 sm:p-10">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < t.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="text-lg sm:text-xl leading-relaxed mb-6 text-foreground/90">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={t.avatar} alt={t.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
                {t.badge && (
                  <Badge variant="secondary" className="hidden sm:inline-flex">
                    {t.badge}
                  </Badge>
                )}
              </div>

              {/* Dot navigation */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === current
                        ? "w-6 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation arrows */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                aria-label="Previous testimonial"
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                aria-label="Next testimonial"
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
