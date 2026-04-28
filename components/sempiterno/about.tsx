import { Heart, Sparkles, HandHeart,Leaf  } from "lucide-react"

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
        
        <div className="max-w-4xl mx-auto mb-16"> {/* Añadido mb-16 */}
          <p className="text-lg md:text-xl text-center text-muted-foreground leading-relaxed mb-8">
            Sempiterno aromas y momentos nace del amor por los detalles, los recuerdos y la necesidad de crear piezas con propósito. Cada vela es una expresión de emociones, un símbolo de luz que acompaña momentos especiales y memorias que perduran en el tiempo.
          </p>
          <p className="text-lg md:text-xl text-center text-muted-foreground leading-relaxed">
            Nuestra marca surge como una alternativa consciente al uso de la parafina, optando por ceras vegetales ecológicas que respetan el entorno y brindan una combustión más limpia.
          </p>
        </div>

        {/* --- SECCIÓN CEO --- */}
        <div className="max-w-5xl mx-auto mb-24 bg-background/50 rounded-3xl p-8 md:p-12 border border-border/40">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative">
              <img 
                src="/ceo.png" // Asegúrate de tener esta imagen en public
                alt="Fundadora de Sempiterno" 
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-accent p-3 rounded-xl shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-2">El alma tras el aroma</h3>
              <p className="text-primary font-medium mb-4 italic">"Crear luz para abrazar el alma"</p>
              <p className="text-muted-foreground leading-relaxed text-lg italic">
                "Mi formación como bióloga despertó mi conciencia ambiental, y mi camino como artista realista me enseñó a amar cada pequeño detalle. Sempiterno es el punto donde la ciencia y el arte se encuentran para honrar lo que más amo: la naturaleza y los animales. Creo piezas a mano con materiales ecológicos, diseñadas para que tus recuerdos más queridos permanezcan siempre encendidos."
              </p>
              <p className="mt-6 font-serif text-xl text-foreground font-semibold">— Andrea G. Fundadora & Artesana</p>
            </div>
          </div>
        </div>
        {/* --- FIN SECCIÓN CEO --- */}
        
        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8">
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