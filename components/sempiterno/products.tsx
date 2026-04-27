import { Card, CardContent } from "@/components/ui/card"
import { PawPrint, Church, Sparkles, Flame } from "lucide-react"

const products = [
  {
    title: "Velas de Mascotas",
    description: "Esculturas personalizadas de tu perro o gato, capturando cada detalle con amor.",
    icon: PawPrint,
    gradient: "from-secondary via-secondary/50 to-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Figuras Religiosas",
    description: "Vírgenes, santos y símbolos sagrados elaborados con devoción y respeto.",
    icon: Church,
    gradient: "from-primary/20 via-primary/10 to-accent/10",
    iconColor: "text-primary",
  },
  {
    title: "Velas Decorativas",
    description: "Piezas aromáticas únicas que transforman cualquier espacio en un refugio de paz.",
    icon: Sparkles,
    gradient: "from-accent/20 via-accent/10 to-secondary/20",
    iconColor: "text-accent",
  },
  {
    title: "Ediciones Especiales",
    description: "Creaciones exclusivas para ocasiones memorables y celebraciones únicas.",
    icon: Flame,
    gradient: "from-primary/10 via-secondary/30 to-accent/10",
    iconColor: "text-primary",
  },
]

export function Products() {
  return (
    <section id="productos" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.2em] text-accent font-medium">
            Nuestra Colección
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Productos Destacados
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada pieza es una obra de arte creada con pasión y dedicación artesanal
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card 
              key={index}
              className="group border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl overflow-hidden"
            >
              <CardContent className="p-0">
                <div className={`aspect-square bg-gradient-to-br ${product.gradient} flex items-center justify-center relative overflow-hidden`}>
                  {/* Decorative circles */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-4 right-4 w-20 h-20 border border-current rounded-full" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 border border-current rounded-full" />
                  </div>
                  <product.icon className={`w-20 h-20 ${product.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
