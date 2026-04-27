"use client"

import { Button } from "@/components/ui/button"
import { Flame, Heart, Sparkles } from "lucide-react"

export function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-background to-accent/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      {/* Floating decorative icons */}
      <div className="absolute top-32 right-20 text-primary/20 animate-pulse">
        <Flame className="w-12 h-12" />
      </div>
      <div className="absolute bottom-40 left-20 text-accent/20 animate-pulse delay-500">
        <Heart className="w-10 h-10" />
      </div>
      <div className="absolute top-48 left-32 text-secondary/40 animate-pulse delay-1000">
        <Sparkles className="w-8 h-8" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Flame className="w-10 h-10 text-primary" />
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-light">
              Cali, Colombia
            </span>
          </div>
        </div>
        
        {/* Main heading */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
          <span className="block">Sempiterno</span>
          <span className="block text-3xl md:text-4xl lg:text-5xl font-normal text-primary mt-2">
            Aromas & Momentos
          </span>
        </h1>
        
        {/* Tagline */}
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light italic mb-8 max-w-3xl mx-auto leading-relaxed">
          &ldquo;Luz que trasciende, aromas que abrazan el alma&rdquo;
        </p>
        
        {/* Specialty description */}
        <p className="text-lg md:text-xl text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Expertos en velas personalizadas de <span className="text-accent font-semibold">mascotas</span> y{" "}
          <span className="text-primary font-semibold">figuras religiosas</span>. 
          Cada pieza es creada a mano con amor y dedicación.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg shadow-primary/25 transition-all hover:scale-105"
            onClick={() => scrollToSection("productos")}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Ver Colección
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
            onClick={() => scrollToSection("mascotas")}
          >
            <Heart className="w-5 h-5 mr-2" />
            Velas de Mascotas
          </Button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
