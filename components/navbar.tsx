"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#carms", label: "Solution" },
  { href: "#products", label: "Products" },
  { href: "#technology", label: "Technology" },
  { href: "#partners", label: "Partners" },
  { href: "#leadership", label: "Leadership" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/60 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-transparent"
      }`}
      style={scrolled ? { WebkitBackdropFilter: "blur(20px)" } : undefined}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300 ${scrolled ? "bg-primary" : "bg-primary-foreground/15"}`}>
            <ShieldCheck className={`h-5 w-5 transition-colors duration-300 ${scrolled ? "text-primary-foreground" : "text-primary-foreground"}`} />
          </div>
          <div className="flex flex-col">
            <span className={`text-lg font-bold tracking-tight leading-none transition-colors duration-300 ${scrolled ? "text-primary" : "text-primary-foreground"}`}>
              PNP Health
            </span>
            <span className={`text-[10px] uppercase tracking-widest leading-none mt-0.5 transition-colors duration-300 ${scrolled ? "text-muted-foreground" : "text-primary-foreground/60"}`}>
              Prevention by Prediction
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-muted-foreground hover:text-primary"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            asChild
            size="sm"
            className={`transition-all duration-300 ${
              scrolled
                ? "bg-accent text-accent-foreground hover:bg-accent/90"
                : "bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25 border border-primary-foreground/20"
            }`}
          >
            <a href="#contact">Contact Us</a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden transition-colors duration-300 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-6 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary py-2"
              >
                {link.label}
              </a>
            ))}
            <Button asChild size="sm" className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90 w-full">
              <a href="#contact" onClick={() => setMobileOpen(false)}>
                Contact Us
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
