"use client"

import { useEffect, useRef, useState } from "react"
import { HeartPulse, Brain, FlaskConical, ArrowUpRight } from "lucide-react"

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

const products = [
  {
    icon: HeartPulse,
    badge: "Flagship",
    badgeColor: "bg-[#10b981] text-primary-foreground",
    title: "PNP Kardia",
    subtitle: "Real-Time Cardiac Arrest Prediction",
    description:
      "Industry-leading accuracy with remarkably low false-alarm rates. PNP Kardia provides real-time cardiac arrest prediction, enabling proactive care in the most critical moments.",
    stats: [
      { label: "Sensitivity", value: "95.2%" },
      { label: "Specificity", value: "93.8%" },
      { label: "Lead Time", value: "6 hrs" },
    ],
    status: "Active Development",
    statusColor: "text-[#10b981]",
    statusBadges: [
      { label: "FDA Pathway", color: "bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20" },
      { label: "Clinical Trials", color: "bg-accent/10 text-accent border-accent/20" },
    ],
  },
  {
    icon: Brain,
    badge: "In Pipeline",
    badgeColor: "bg-accent text-accent-foreground",
    title: "PNP Cerebro",
    subtitle: "Neurological Event Prediction",
    description:
      "Leveraging the CN Engine to predict critical neurological events from standard clinical data. Designed for neurology and neurocritical care units to enable early intervention.",
    stats: [
      { label: "Data Points", value: "180+" },
      { label: "Model Type", value: "CN Engine" },
      { label: "Target", value: "2026" },
    ],
    status: "Research Phase",
    statusColor: "text-accent",
    statusBadges: [
      { label: "Research Phase", color: "bg-accent/10 text-accent border-accent/20" },
      { label: "Neuro ICU", color: "bg-primary/10 text-primary border-primary/20" },
    ],
  },
  {
    icon: FlaskConical,
    badge: "In Pipeline",
    badgeColor: "bg-accent text-accent-foreground",
    title: "PNP Hepar",
    subtitle: "Complex Liver Disease Progression",
    description:
      "Utilizing the CN Engine to predict complex liver disease progression from standard clinical data. Designed for high-acuity hepatology and transplant programs.",
    stats: [
      { label: "Data Points", value: "200+" },
      { label: "Model Type", value: "CN Engine" },
      { label: "Target", value: "2026" },
    ],
    status: "Research Phase",
    statusColor: "text-accent",
    statusBadges: [
      { label: "Research Phase", color: "bg-accent/10 text-accent border-accent/20" },
      { label: "KUMC Partnership", color: "bg-primary/10 text-primary border-primary/20" },
    ],
  },
]

export function ProductsSection() {
  const { ref, inView } = useInView()

  return (
    <section id="products" className="bg-secondary py-16 sm:py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Product Roadmap
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            The PNP Series:{" "}
            <span className="text-primary">
              Excellence in High-Acuity AI
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground leading-relaxed">
            Disease-specific predictive models designed for the most critical
            clinical environments.
          </p>
        </div>

        {/* Product Cards */}
        <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => {
            const Icon = product.icon
            return (
              <div
                key={product.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                {/* Badge */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${product.badgeColor}`}
                    >
                      {product.badge}
                    </span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h3 className="text-2xl font-bold text-foreground">
                  {product.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {product.subtitle}
                </p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {product.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg bg-secondary px-3 py-2.5 text-center"
                    >
                      <p className="text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Status */}
                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        i === 0 ? "bg-[#10b981]" : "bg-accent"
                      } animate-pulse-glow`}
                    />
                    <span
                      className={`text-xs font-semibold ${product.statusColor}`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.statusBadges.map((sb) => (
                      <span
                        key={sb.label}
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${sb.color}`}
                      >
                        {sb.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
