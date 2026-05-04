import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "María Fernanda L.",
    location: "Cali",
    text: "Cuando perdí a mi Luna, pensé que nada podría consolarme. Pero cuando recibí su velita, fue como tener un pedacito de ella conmigo para siempre. Cada detalle es perfecto.",
    pet: "En memoria de Luna 🐕",
    stars: 5,
  },
  {
    name: "Carlos Andrés M.",
    location: "Palmira",
    text: "Increíble el trabajo que hacen. La vela de mi gato Simón captura perfectamente su personalidad. La tengo en un lugar especial de mi casa.",
    pet: "En memoria de Simón 🐈",
    stars: 5,
  },
  {
    name: "Patricia R.",
    location: "Cali",
    text: "Compré una virgen para mi mamá y quedó hermosa. La calidad es excepcional y el aroma es delicado y duradero. Volveré a comprar seguro.",
    pet: "Virgen del Carmen",
    stars: 5,
  },
  {
    name: "Valentina Ocampo",
    location: "Cali",
    text: "Son los mejores en lo que hacen, gracias por acompañarme en estos momentos con su hermoso trabajo.",
    pet: "",
    stars: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 left-10 text-primary/5">
        <Quote className="w-40 h-40" />
      </div>
      <div className="absolute bottom-20 right-10 text-accent/5">
        <Quote className="w-32 h-32 rotate-180" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.2em] text-accent font-medium">
            Historias Reales
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Testimonios
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Las palabras de nuestras familias son nuestro mayor orgullo
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6 md:p-8">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-foreground leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary font-medium">{testimonial.pet}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
