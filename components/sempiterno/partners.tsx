import { Handshake, Shield, Heart, Award } from "lucide-react"

const benefits = [
  {
    icon: Shield,
    title: "Confianza Profesional",
    description: "Trabajamos con estándares de calidad que garantizan satisfacción total.",
  },
  {
    icon: Heart,
    title: "Atención Empática",
    description: "Entendemos la sensibilidad de cada momento y actuamos con respeto.",
  },
  {
    icon: Award,
    title: "Calidad Garantizada",
    description: "Cada pieza cumple con los más altos estándares de elaboración artesanal.",
  },
]
const allies = [
  { name: "Empresa 1", logo: "/logos/aliado1.png" },
  { name: "Empresa 2", logo: "/logos/aliado2.png" },
  { name: "Empresa 3", logo: "/logos/aliado3.png" },
]

export function Partners() {
  return (
    <section id="aliados" className="py-24 bg-card relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-accent font-medium">
            <Handshake className="w-4 h-4" />
            Colaboración Profesional
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Nuestros Aliados
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full mb-6" />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-secondary/20 via-background to-primary/5 rounded-3xl p-8 md:p-12 border border-border/50">
            <div className="text-center mb-10">
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Trabajamos de la mano empresas en Cali y el Valle del Cauca, 
                ofreciendo a las familias una forma hermosa y significativa de honrar 
                la memoria de sus compañeros de vida.
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-16 opacity-80">
              {allies.map((ally, index) => (
                <div key={index} className="group">
                  <img 
                    src={ally.logo} 
                    alt={ally.name} 
                    className="h-12 md:h-16 w-auto grayscale group-hover:grayscale-0 transition-all duration-500 object-contain mix-blend-multiply" 
                  />
                </div>
              ))}
            </div>

            {/* <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-14 h-14 bg-card rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div> */}
            
            {/* CTA for businesses */}
            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-4">
                ¿Te gustaría colaborar con nosotros?
              </p>
              <a 
                href="#contacto"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                <Handshake className="w-5 h-5" />
                Contáctanos para alianzas B2B
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
