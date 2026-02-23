"use client"

import { useEffect, useRef, useState } from "react"
import { Linkedin, Mail } from "lucide-react"

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

const leaders = [
  {
    name: "Thomas Cho",
    role: "Chief Technical Officer",
    initials: "TC",
    bio: "Visionary technology leader bridging US clinical practice with Korean big data excellence. Driving the technical mission to make predictive safety the standard in every hospital.",
    color: "bg-primary",
  },
  {
    name: "Nicola Zetola",
    role: "Chief Medical Officer",
    initials: "NZ",
    bio: "Board-certified physician with deep expertise in infectious disease and global health. Ensures CARMS meets the highest clinical standards for patient safety.",
    color: "bg-accent",
  },
  {
    name: "Milton Chen",
    role: "Technical Advisor",
    initials: "MC",
    bio: "Seasoned technology executive with extensive experience in healthcare IT and AI systems. Guides the technical strategy and architecture of the CN Engine.",
    color: "bg-[#10b981]",
  },
]

export function LeadershipSection() {
  const { ref, inView } = useInView()

  return (
    <section id="leadership" className="bg-background py-16 sm:py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            Leadership
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Led by <span className="text-accent">Experts</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground leading-relaxed">
            A multidisciplinary team of clinical, technical, and business leaders
            committed to transforming hospital safety.
          </p>
        </div>

        {/* Leader Cards */}
        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {leaders.map((leader, i) => (
            <div
              key={leader.name}
              className="group rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Avatar */}
              <div
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${leader.color} text-primary-foreground shadow-lg`}
              >
                <span className="text-2xl font-bold">{leader.initials}</span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-foreground">
                {leader.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-accent">
                {leader.role}
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {leader.bio}
              </p>

              {/* Social links */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  aria-label={`LinkedIn profile of ${leader.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                </button>
                <button
                  aria-label={`Email ${leader.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
