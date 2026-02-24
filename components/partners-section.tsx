"use client"

import { useEffect, useRef, useState } from "react"
import { GraduationCap, Cloud, Building2, Cpu, Globe } from "lucide-react"

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

const partners = [
  {
    icon: GraduationCap,
    name: "KUMC",
    fullName: "Korea University Medicine",
    role: "Clinical Data & R&D Hub",
    description:
      "Providing high-fidelity longitudinal clinical data and world-class research collaboration for model training and validation.",
  },
  {
    icon: Cloud,
    name: "Huniverse",
    fullName: "Huniverse Health",
    role: "Cloud-based EHR & Data Infrastructure",
    description:
      "Enabling seamless cloud-native EHR integration and scalable data infrastructure for real-time predictive analytics.",
  },
  {
    icon: Building2,
    name: "University of Georgia",
    fullName: "University of Georgia",
    role: "US Clinical Validation Partner",
    description:
      "Leading US-based clinical validation studies to ensure our solution meets the rigorous standards of American healthcare institutions.",
  },
  {
    icon: Cpu,
    name: "CareNest",
    fullName: "CareNest AI",
    role: "Core AI Engineering",
    description:
      "The engineering backbone behind the CN Engine, delivering production-grade AI models optimized for clinical environments.",
  },
  {
    icon: Globe,
    name: "VSee",
    fullName: "VSee Technologies",
    role: "System Architecture & Global Scalability",
    description:
      "Providing telehealth-grade system architecture and infrastructure for global deployment across healthcare markets.",
  },
]

export function PartnersSection() {
  const { ref, inView } = useInView()

  return (
    <section id="partners" className="bg-secondary py-16 sm:py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Ecosystem
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            A Strategic Alliance for{" "}
            <span className="text-primary">Global Healthcare</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground leading-relaxed">
            Our partner ecosystem combines deep clinical expertise, massive data
            assets, and world-class engineering to deliver predictive safety at
            scale.
          </p>
        </div>

        {/* Partner Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, i) => {
            const Icon = partner.icon
            return (
              <div
                key={partner.name}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {partner.fullName}
                    </p>
                  </div>
                </div>

                <div className="mb-3 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                  {partner.role}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {partner.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
