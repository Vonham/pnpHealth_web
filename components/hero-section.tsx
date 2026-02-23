"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

function PredictiveDashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const w = rect.width
    const h = rect.height

    let frame = 0

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)

      // Grid lines
      ctx.strokeStyle = "rgba(0, 86, 179, 0.08)"
      ctx.lineWidth = 1
      for (let i = 0; i < 6; i++) {
        const y = (h / 6) * (i + 1)
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Timeline labels
      ctx.fillStyle = "rgba(74, 97, 128, 0.6)"
      ctx.font = "10px Inter, sans-serif"
      const labels = ["-6hr", "-5hr", "-4hr", "-3hr", "-2hr", "-1hr", "Now"]
      labels.forEach((label, i) => {
        ctx.fillText(label, (w / 7) * i + 10, h - 8)
      })

      // Stable vital line
      ctx.beginPath()
      ctx.strokeStyle = "#10b981"
      ctx.lineWidth = 2
      const stablePoints: [number, number][] = []
      for (let x = 0; x < w * 0.6; x += 2) {
        const y = h * 0.55 + Math.sin(x * 0.02 + frame * 0.02) * 8
        stablePoints.push([x, y])
      }
      stablePoints.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.stroke()

      // Predictive trajectory (risk rising)
      ctx.beginPath()
      ctx.strokeStyle = "#0056B3"
      ctx.lineWidth = 2.5
      ctx.setLineDash([6, 4])
      const predStart = w * 0.55
      for (let x = predStart; x < w * 0.95; x += 2) {
        const progress = (x - predStart) / (w * 0.4)
        const y =
          h * 0.55 -
          progress * progress * h * 0.3 +
          Math.sin(x * 0.03 + frame * 0.03) * 4
        if (x === predStart) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.setLineDash([])

      // Risk threshold zone
      ctx.fillStyle = "rgba(239, 68, 68, 0.06)"
      ctx.fillRect(0, 0, w, h * 0.22)
      ctx.strokeStyle = "rgba(239, 68, 68, 0.3)"
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(0, h * 0.22)
      ctx.lineTo(w, h * 0.22)
      ctx.stroke()
      ctx.setLineDash([])

      // Label for threshold
      ctx.fillStyle = "rgba(239, 68, 68, 0.6)"
      ctx.font = "bold 9px Inter, sans-serif"
      ctx.fillText("RISK THRESHOLD", w - 110, h * 0.18)

      // Prediction alert dot
      const alertX = w * 0.88
      const alertY =
        h * 0.55 -
        Math.pow((alertX - predStart) / (w * 0.4), 2) * h * 0.3
      const pulse = Math.sin(frame * 0.06) * 0.3 + 0.7
      ctx.beginPath()
      ctx.arc(alertX, alertY, 8 * pulse, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 86, 179, ${0.2 * pulse})`
      ctx.fill()
      ctx.beginPath()
      ctx.arc(alertX, alertY, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#0056B3"
      ctx.fill()

      // CARMS Score badge
      const scoreX = w * 0.7
      const scoreY = h * 0.2
      ctx.fillStyle = "rgba(0, 45, 98, 0.9)"
      ctx.beginPath()
      ctx.roundRect(scoreX, scoreY, 100, 40, 8)
      ctx.fill()
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 11px Inter, sans-serif"
      ctx.fillText("CARMS Score", scoreX + 10, scoreY + 16)
      ctx.font = "bold 16px Inter, sans-serif"
      ctx.fillStyle = "#38bdf8"
      ctx.fillText("78 / 100", scoreX + 10, scoreY + 34)

      frame++
      requestAnimationFrame(draw)
    }

    const id = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="relative rounded-xl border border-border bg-card p-4 shadow-xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#10b981] animate-pulse-glow" />
          <span className="text-xs font-semibold text-foreground">
            Patient Monitor - ICU Bed 12
          </span>
        </div>
        <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold text-accent">
          LIVE
        </span>
      </div>
      <canvas
        ref={canvasRef}
        className="h-48 w-full sm:h-56 md:h-64"
        style={{ width: "100%", display: "block" }}
      />
      <div className="mt-3 grid grid-cols-3 gap-3">
        {[
          { label: "Heart Rate", value: "82 bpm", color: "text-[#10b981]" },
          { label: "SpO2", value: "96%", color: "text-accent" },
          { label: "Risk Level", value: "Moderate", color: "text-[#f59e0b]" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg bg-secondary px-3 py-2 text-center"
          >
            <p className="text-[10px] text-muted-foreground">{item.label}</p>
            <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 sm:gap-12 sm:px-6 lg:flex-row lg:gap-16">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
            <span className="text-xs font-medium text-primary-foreground/80">
              AI-Powered Clinical Safety
            </span>
          </div>

          <h1 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Prevention by{" "}
            <span className="text-[#38bdf8]">Prediction</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-primary-foreground/70 sm:mt-6 sm:text-base lg:mx-0 lg:text-lg">
            US Clinical Leadership meets Korean Big Data Excellence. We provide
            predictive safety infrastructure for hospitals, powered by our
            proprietary CN Engine.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-start">
            <Button
              asChild
              size="lg"
              className="bg-[#38bdf8] text-primary hover:bg-[#38bdf8]/90 font-semibold"
            >
              <a href="#carms">
                Explore CARMS <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href="#technology">
                <Play className="mr-2 h-4 w-4" /> View Technology
              </a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-12 sm:gap-6 lg:justify-start">
            {["HIPAA Compliant", "FDA Pathway", "SOC 2 Ready"].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-1.5 text-xs font-medium text-primary-foreground/50"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Right dashboard */}
        <div className="w-full max-w-xl flex-1 animate-fade-in-up lg:max-w-lg xl:max-w-xl">
          <PredictiveDashboard />
        </div>
      </div>
    </section>
  )
}
