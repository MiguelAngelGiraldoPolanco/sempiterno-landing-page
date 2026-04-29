"use client"

import { Button } from "@/components/ui/button"
import { Heart, Sparkles, PawPrint } from "lucide-react"
import { PetPhotoCarousel } from "./photo-carousel"

  

export function PetMemorial() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const whatsappMessage = encodeURIComponent("Hola!¿Podrían darme más información acerca de la personalizacion de velas de mascotas?")

  return (
    <section id="mascotas" className="py-24 bg-gradient-to-br from-secondary/30 via-background to-primary/5 relative overflow-hidden">
      {/* Decorative paw prints */}
      <div className="absolute top-20 right-10 text-primary/10">
        <PawPrint className="w-24 h-24 rotate-12" />
      </div>
      <div className="absolute bottom-20 left-10 text-accent/10">
        <PawPrint className="w-20 h-20 -rotate-12" />
      </div>
      <div className="absolute top-1/2 right-1/4 text-secondary/30">
        <PawPrint className="w-16 h-16 rotate-45" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-accent font-medium mb-4">
              <Heart className="w-4 h-4" />
              Memorias Eternas
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Velas de Mascotas
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Honra la memoria de tu compañero peludo con una vela única que captura 
              su esencia. Creamos piezas personalizadas que lucen exactamente como 
              tu perro o gato, preservando su recuerdo de manera hermosa y significativa.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Cada vela es esculpida a mano con atención meticulosa al detalle, 
              desde los rasgos faciales hasta el color del pelaje. Es más que una vela; 
              es un <span className="text-primary font-semibold">tributo eterno</span> a quien 
              llenó tu vida de amor incondicional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg shadow-primary/25 transition-all hover:scale-105"
                asChild
              >
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Pedido Personalizado
                </a>
              </Button>
            </div>
            
            {/* Trust badge */}
            <div className="mt-8 flex items-center gap-4 text-muted-foreground">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border-2 border-background">
                  <PawPrint className="w-5 h-5 text-primary" />
                </div>
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border-2 border-background">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
              </div>
              <p className="text-sm">
                Más de <span className="text-foreground font-semibold">100 familias</span> han confiado en nosotros
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Fondo decorativo con rotación */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 rounded-3xl transform rotate-3" />
              
              {/* CONTENEDOR DEL CARRUSEL */}
              <div className="absolute inset-0 bg-card rounded-3xl shadow-xl border border-border/50 overflow-hidden flex flex-col justify-center">
                <PetPhotoCarousel />
              </div>
              
              
              {/* Floating badges - Añadimos z-10 para asegurar que estén por encima del carrusel */}
              <div className="z-10 absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                100% Artesanal
              </div>
              <div className="z-10 absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                Hecho con Amor
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
