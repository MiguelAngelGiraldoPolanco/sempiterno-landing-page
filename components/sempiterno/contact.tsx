import { MapPin, Clock, Instagram, Heart } from "lucide-react"

export function Contact() {
  return (
    <section id="contacto" className="py-24 bg-gradient-to-br from-primary/10 via-card to-accent/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.2em] text-accent font-medium">
            Estemos en Contacto
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Contáctanos
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full" />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Info cards */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                      Ubicación
                    </h3>
                    <p className="text-muted-foreground">
                      Cali, Colombia
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Encuéntranos en ferias artesanales de la ciudad
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                      Horario de Atención
                    </h3>
                    <p className="text-muted-foreground">
                      Lunes a Sábado
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                      Síguenos
                    </h3>
                    <a 
                      href="https://www.instagram.com/sempiterno_aromas_momentos/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      @sempiterno_aromas_momentos
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Descubre nuestras últimas creaciones
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Message card */}
            <div className="bg-gradient-to-br from-primary/5 via-card to-secondary/10 rounded-2xl p-8 border border-border/50 flex flex-col justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  ¿Listo para crear algo especial?
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Escríbenos por WhatsApp y cuéntanos tu idea. 
                  Juntos crearemos una pieza única que honre tus momentos más preciados.
                </p>
                <p className="text-sm text-muted-foreground">
                  Respondemos en menos de 24 horas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
