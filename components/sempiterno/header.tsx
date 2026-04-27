"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Flame, Menu, X, Instagram } from "lucide-react"

const navItems = [
  { label: "Inicio", href: "#" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Mascotas", href: "#mascotas" },
  { label: "Productos", href: "#productos" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection("#")}
            className="flex items-center gap-2 group"
          >
            <Flame className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-serif text-xl font-bold text-foreground hidden sm:block">
              Sempiterno
            </span>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>
          
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.instagram.com/sempiterno_aromas_momentos/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <Button 
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5"
              onClick={() => scrollToSection("#contacto")}
            >
              Contactar
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border shadow-lg transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-border flex items-center gap-4">
            <a
              href="https://www.instagram.com/sempiterno_aromas_momentos/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>Síguenos</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
