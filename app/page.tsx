import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CarmsSection } from "@/components/carms-section"
import { ProductsSection } from "@/components/products-section"
import { TechnologySection } from "@/components/technology-section"
import { PartnersSection } from "@/components/partners-section"
import { LeadershipSection } from "@/components/leadership-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CarmsSection />
      <ProductsSection />
      <TechnologySection />
      <PartnersSection />
      <LeadershipSection />
      <Footer />
    </main>
  )
}
