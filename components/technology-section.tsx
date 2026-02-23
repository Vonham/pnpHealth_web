"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Brain, Database, ShieldCheck } from "lucide-react"

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function AnimatedCounter({ target, suffix = "", inView }: { target: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true
    const duration = 2000
    const startTime = Date.now()

    function step() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }

    requestAnimationFrame(step)
  }, [target])

  useEffect(() => {
    if (inView) animate()
  }, [inView, animate])

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const pillars = [
  {
    icon: Brain,
    title: "Explainable AI",
    description:
      'Provides the "Why" behind every risk score. Clinicians see transparent reasoning, not black-box outputs, ensuring trust and clinical adoption.',
    highlight: "Transparent Reasoning",
  },
  {
    icon: Database,
    title: "Data Scale",
    description:
      "Trained on 10M+ high-fidelity longitudinal records from KUMC & Huniverse, the CN Engine captures the full complexity of patient trajectories.",
    highlight: "10M+ Records",
  },
  {
    icon: ShieldCheck,
    title: "Safe AI",
    description:
      "Built like a safety-critical system with human-in-the-loop validation, continuous monitoring, and rigorous bias testing at every stage.",
    highlight: "Human-in-the-Loop",
  },
]

export function TechnologySection() {
  const { ref, inView } = useInView()

  return (
    <section id="technology" className="bg-background py-16 sm:py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            Proprietary Technology
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            The CN Engine:{" "}
            <span className="text-accent">
              Explainable AI Built on Massive Clinical Data
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground leading-relaxed">
            Our proprietary engine powers every PP Series model, combining
            clinical rigor with cutting-edge machine learning.
          </p>
        </div>

        {/* Animated stats bar */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:gap-12">
          {[
            { value: 10, suffix: "M+", label: "Clinical Records" },
            { value: 95, suffix: "%", label: "Sensitivity" },
            { value: 6, suffix: "hr", label: "Lead Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-accent sm:text-4xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              </p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="group relative rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-accent/30"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Decorative number */}
                <span className="absolute top-6 right-6 text-5xl font-bold text-secondary select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-bold text-foreground">
                  {pillar.title}
                </h3>

                <div className="mt-3 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">
                  {pillar.highlight}
                </div>

                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Architecture diagram placeholder */}
        <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-border bg-primary p-8 lg:p-12">
          <div className="text-center">
            <h3 className="text-lg font-bold text-primary-foreground">
              CN Engine Architecture
            </h3>
            <p className="mt-2 text-sm text-primary-foreground/60">
              End-to-end clinical data pipeline
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-0">
            {[
              "EHR Data Ingestion",
              "Feature Engineering",
              "CN Model Inference",
              "Risk Scoring",
              "Clinical Action",
            ].map((step, i) => (
              <div key={step} className="flex items-center gap-0">
                <div className="w-full rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-3 text-center sm:px-2 lg:px-4">
                  <p className="text-[10px] text-primary-foreground/50">
                    Step {i + 1}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-primary-foreground">
                    {step}
                  </p>
                </div>
                {i < 4 && (
                  <div className="hidden sm:block mx-1 shrink-0 text-primary-foreground/30">
                    <svg width="20" height="12" viewBox="0 0 24 12" fill="none">
                      <path d="M0 6h20m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
