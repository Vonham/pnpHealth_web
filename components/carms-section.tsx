"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, MonitorSmartphone, Users, ArrowRight } from "lucide-react"

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

const features = [
  {
    icon: Clock,
    title: "6-Hour Lead Time",
    description:
      "Predicts patient deterioration long before traditional monitors, giving your clinical team a critical window to intervene.",
  },
  {
    icon: MonitorSmartphone,
    title: "EHR-Agnostic",
    description:
      "Seamlessly integrates with Epic, Cerner, and Meditech. No rip-and-replace required for your existing infrastructure.",
  },
  {
    icon: Users,
    title: "Triggering Action",
    description:
      "Automatically prompts Huddles, Rapid Response Teams, and ICU consults based on risk-score thresholds.",
  },
]

function ComparisonChart() {
  const { ref, inView } = useInView(0.3)

  return (
    <div ref={ref} className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Detection Timeline Comparison
      </h4>
      <div className="space-y-8">
        {/* Reactive */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Reactive Alarms</span>
            <span className="text-xs font-semibold text-muted-foreground">0-1 hour</span>
          </div>
          <div className="h-6 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="flex h-full items-center justify-end rounded-full bg-[#ef4444]/80 pr-3 transition-all duration-1000 ease-out"
              style={{ width: inView ? "14%" : "0%" }}
            >
              <span className="text-[10px] font-bold text-primary-foreground">1hr</span>
            </div>
          </div>
        </div>

        {/* Proactive Prediction - with glow */}
        <div className="relative">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Proactive Prediction
            </span>
            <span className="text-xs font-semibold text-accent">6 hours</span>
          </div>
          <div className="h-6 w-full overflow-hidden rounded-full bg-secondary relative">
            <div
              className="flex h-full items-center justify-end rounded-full pr-3 transition-all duration-1000 delay-300 ease-out relative"
              style={{
                width: inView ? "85%" : "0%",
                background: "linear-gradient(90deg, #0056B3, #38bdf8)",
                boxShadow: inView ? "0 0 20px rgba(56, 189, 248, 0.5), 0 0 40px rgba(0, 86, 179, 0.3)" : "none",
              }}
            >
              <span className="text-[10px] font-bold text-primary-foreground">6hrs</span>
            </div>
          </div>
          {/* +5 hours callout */}
          <div
            className="absolute -top-2 transition-all duration-1000 delay-700 ease-out"
            style={{
              right: inView ? "8%" : "80%",
              opacity: inView ? 1 : 0,
            }}
          >
            <div className="flex items-center gap-1 rounded-full bg-[#38bdf8] px-2.5 py-1 shadow-lg shadow-[#38bdf8]/30">
              <span className="text-[11px] font-bold text-[#002D62]">+5 hours</span>
            </div>
            <div className="mx-auto h-2 w-px bg-[#38bdf8]/50" />
          </div>
        </div>

        {/* Golden Window highlight */}
        <div className="flex items-center gap-3 rounded-lg border border-accent/20 bg-accent/5 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <ArrowRight className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              The 6-Hour Golden Window
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our solution gives clinical teams up to 6 hours of advance notice,
              transforming crisis response into planned intervention.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CarmsSection() {
  const { ref, inView } = useInView()

  return (
    <section id="carms" className="bg-background py-16 sm:py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            Core Solution
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-accent">
              Stop Patient Crashing in Slow Motion
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground leading-relaxed">
            A predictive safety layer
            that transforms how hospitals identify and respond to patient
            deterioration.
          </p>
        </div>

        {/* Features & chart */}
        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-2 lg:gap-16">
          {/* Features */}
          <div className="space-y-8">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="flex gap-5"
                  style={{
                    animationDelay: `${i * 150}ms`,
                  }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Comparison Chart */}
          <ComparisonChart />
        </div>
      </div>
    </section>
  )
}
