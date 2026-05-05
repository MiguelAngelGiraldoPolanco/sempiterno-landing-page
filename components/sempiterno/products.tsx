"use client"

import { Card, CardContent } from "@/components/ui/card"
import { PawPrint, Church, Sparkles, Flame } from "lucide-react"
import { PhotoCarousel } from "./photo-carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const products = [
  {
    title: "Velas de Mascotas",
    description: "Esculturas personalizadas de tu perro o gato, capturando cada detalle con amor.",
    icon: PawPrint,
    gradient: "",
    iconColor: "text-primary",
    whatsappMessage: "Hola!¿Podrían darme más información acerca de la personalizacion de velas de mascotas?",
    photos: [
      { src: "/mascotas/mas1.jpeg", alt: "Mascota 1" },
      { src: "/mascotas/mas2.jpeg", alt: "Mascota 2" },
      { src: "/mascotas/mas3.jpeg", alt: "Mascota 3" },
      { src: "/mascotas/mas4.jpeg", alt: "Mascota 4" },
      { src: "/mascotas/mas5.jpeg", alt: "Mascota 5" },
      { src: "/mascotas/mas6.jpeg", alt: "Mascota 6" },
      { src: "/mascotas/mas7.jpeg", alt: "Mascota 7" },
      { src: "/mascotas/mas8.jpeg", alt: "Mascota 8" },
      { src: "/mascotas/mas9.jpeg", alt: "Mascota 9" },
      { src: "/mascotas/mas10.jpeg", alt: "Mascota 10" },
      { src: "/mascotas/mas11.jpeg", alt: "Mascota 11" },
      { src: "/mascotas/mas12.jpeg", alt: "Mascota 12" },
      { src: "/mascotas/mas13.jpeg", alt: "Mascota 13" },
      { src: "/mascotas/mas14.jpeg", alt: "Mascota 14" },
    ],
  },
  {
    title: "Figuras Religiosas",
    description: "Vírgenes, santos y símbolos sagrados elaborados con devoción y respeto.",
    icon: Church,
    gradient: "from-primary/20 via-primary/10 to-accent/10",
    iconColor: "text-primary",
    photos: [
      { src: "/velas-religiosas/rel1.jpeg", alt: "Religiosa 1" },
      { src: "/velas-religiosas/rel2.jpeg", alt: "Religiosa 2" },
      { src: "/velas-religiosas/rel3.jpeg", alt: "Religiosa 3" },
      { src: "/velas-religiosas/rel4.jpeg", alt: "Religiosa 4" },
      { src: "/velas-religiosas/rel5.jpeg", alt: "Religiosa 5" },
      { src: "/velas-religiosas/rel6.jpeg", alt: "Religiosa 6" },
      { src: "/velas-religiosas/rel7.jpeg", alt: "Religiosa 7" },
      { src: "/velas-religiosas/rel8.jpeg", alt: "Religiosa 8" },
      { src: "/velas-religiosas/rel9.jpeg", alt: "Religiosa 9" },
      { src: "/velas-religiosas/rel11.jpeg", alt: "Religiosa 11" },
      { src: "/velas-religiosas/rel12.jpeg", alt: "Religiosa 12" },
      { src: "/velas-religiosas/rel13.jpeg", alt: "Religiosa 13" },
      { src: "/velas-religiosas/rel14.jpeg", alt: "Religiosa 14" },
    ],
  },
  {
    title: "Velas Decorativas",
    description: "Piezas que transforman cualquier espacio en un refugio de paz.",
    icon: Sparkles,
    gradient: "from-accent/20 via-accent/10 to-secondary/20",
    iconColor: "text-accent",
    photos: [
      { src: "/velas-decorativas/dec1.jpeg", alt: "dec 1" },
      { src: "/velas-decorativas/dec2.jpeg", alt: "dec 2" },
      { src: "/velas-decorativas/dec3.jpeg", alt: "dec 3" },
      { src: "/velas-decorativas/dec4.jpeg", alt: "dec 4" },
      { src: "/velas-decorativas/dec5.jpeg", alt: "dec 5" },
      { src: "/velas-decorativas/dec6.jpeg", alt: "dec 6" },
      { src: "/velas-decorativas/dec7.jpeg", alt: "dec 7" },
      { src: "/velas-decorativas/dec8.jpeg", alt: "dec 8" },
      { src: "/velas-decorativas/dec9.jpeg", alt: "dec 9" },
      { src: "/velas-decorativas/dec10.jpeg", alt: "dec 10" },
      { src: "/velas-decorativas/dec11.jpeg", alt: "dec 11" },
      { src: "/velas-decorativas/dec12.jpeg", alt: "dec 12" },
    ],
  },
  {
    title: "Ediciones Especiales",
    description: "Creaciones exclusivas para ocasiones memorables y celebraciones únicas.",
    icon: Flame,
    gradient: "from-primary/10 via-secondary/30 to-accent/10",
    iconColor: "text-primary",
    photos: [
      { src: "/ediciones-especiales/esp1.jpeg", alt: "Especial 1" },
      { src: "/ediciones-especiales/esp2.jpeg", alt: "Especial 2" },
      { src: "/ediciones-especiales/esp3.jpeg", alt: "Especial 3" },
      { src: "/ediciones-especiales/esp4.jpeg", alt: "Especial 4" },
      { src: "/ediciones-especiales/esp5.jpeg", alt: "Especial 5" },
      { src: "/ediciones-especiales/esp6.jpeg", alt: "Especial 6" },
      { src: "/ediciones-especiales/esp7.jpeg", alt: "Especial 7" },
      { src: "/ediciones-especiales/esp8.jpeg", alt: "Especial 8" },
      { src: "/ediciones-especiales/esp9.jpeg", alt: "Especial 9" },
      { src: "/ediciones-especiales/esp10.jpeg", alt: "Especial 10" },
      { src: "/ediciones-especiales/esp11.jpeg", alt: "Especial 11" },
      { src: "/ediciones-especiales/esp12.jpeg", alt: "Especial 12" },
      { src: "/ediciones-especiales/esp13.jpeg", alt: "Especial 13" },
      { src: "/ediciones-especiales/esp14.jpeg", alt: "Especial 14" },
    ],
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
        {/* aqui esta el div de la imagen */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card
              key={index}
              className="group border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative h-64 w-full overflow-hidden">
                  <PhotoCarousel photos={product.photos} delay={0} />
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
              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-fit mx-auto felx items-center bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 text-sm rounded-full shadow-lg shadow-primary/25 transition-all hover:scale-105"
                  >Ver Álbum</button>
                </DialogTrigger>

                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Galería de {product.title}</DialogTitle>
                    <DialogDescription className="sr-only">
                      Muestra una colección de imágenes detalladas sobre {product.title}.
                    </DialogDescription>
                  </DialogHeader>

                  <PhotoCarousel photos={product.photos} delay={2000} />
                </DialogContent>
              </Dialog>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
