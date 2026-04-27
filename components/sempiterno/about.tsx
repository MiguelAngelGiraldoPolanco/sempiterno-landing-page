import { Heart, Sparkles, HandHeart } from "lucide-react"

const features = [
  {
    icon: HandHeart,
    title: "Hecho a Mano",
    description: "Cada vela es cuidadosamente elaborada a mano, asegurando atención al detalle y calidad excepcional.",
  },
  {
    icon: Heart,
    title: "Con Amor",
    description: "Ponemos corazón en cada creación, entendiendo que cada vela cuenta una historia única.",
  },
  {
    icon: Sparkles,
    title: "Personalizado",
    description: "Diseñamos piezas únicas que capturan la esencia de tus seres queridos y momentos especiales.",
  },
]

export function About() {
  return (
    <section id="nosotros" className="py-24 bg-card relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.2em] text-accent font-medium">
            Nuestra Historia
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Sobre Nosotros
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full" />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-center text-muted-foreground leading-relaxed mb-8">
            Desde las ferias artesanales de <span className="text-foreground font-semibold">Cali</span>, 
            compartimos nuestra pasión por crear velas que trascienden lo ordinario. 
            Cada pieza que elaboramos está impregnada de dedicación artesanal y el deseo 
            de preservar los momentos más preciados de tu vida.
          </p>
          <p className="text-lg md:text-xl text-center text-muted-foreground leading-relaxed">
            Nos especializamos en capturar la esencia de tus mascotas y crear representaciones 
            únicas de figuras religiosas, transformando cera en <span className="text-primary font-semibold">recuerdos eternos</span>.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-background rounded-2xl p-8 text-center shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
