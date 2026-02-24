import { ShieldCheck, Mail, MapPin } from "lucide-react"

const footerLinks = {
  Solutions: [
    { label: "PNP Kardia", href: "#products" },
    { label: "PNP Cerebro", href: "#products" },
    { label: "PNP Hepar", href: "#products" },
    { label: "CN Engine", href: "#technology" },
  ],
  Company: [
    { label: "Leadership", href: "#leadership" },
    { label: "Partners", href: "#partners" },
    { label: "Careers", href: "#" },
    { label: "News", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "White Papers", href: "#" },
    { label: "Clinical Studies", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
}

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10">
                <ShieldCheck className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none">
                  PNP Health
                </span>
                <span className="text-[10px] uppercase tracking-widest text-primary-foreground/50 leading-none mt-0.5">
                  Prevention by Prediction
                </span>
              </div>
            </a>
            <p className="mt-4 text-sm text-primary-foreground/60 leading-relaxed">
              Prevention by Prediction, Plug and Play. Transforming hospital
              safety through predictive AI infrastructure.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@pnphealth.ai</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Delaware C-Corp, USA</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/40">
                {title}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-primary-foreground/40">
              &copy; {new Date().getFullYear()} PNP Health Inc. All rights
              reserved. Delaware C-Corp.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-xs text-primary-foreground/40 transition-colors hover:text-primary-foreground"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-primary-foreground/40 transition-colors hover:text-primary-foreground"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-xs text-primary-foreground/40 transition-colors hover:text-primary-foreground"
              >
                HIPAA
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
