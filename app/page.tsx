import { Header } from "@/components/sempiterno/header"
import { Hero } from "@/components/sempiterno/hero"
import { About } from "@/components/sempiterno/about"
import { PetMemorial } from "@/components/sempiterno/pet-memorial"
import { Products } from "@/components/sempiterno/products"
import { Partners } from "@/components/sempiterno/partners"
import { Testimonials } from "@/components/sempiterno/testimonials"
import { Contact } from "@/components/sempiterno/contact"
import { Footer } from "@/components/sempiterno/footer"
import { WhatsAppButton } from "@/components/sempiterno/whatsapp-button"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <PetMemorial />
      <Products />
      <Partners />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
