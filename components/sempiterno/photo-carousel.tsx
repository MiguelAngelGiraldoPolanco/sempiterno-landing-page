"use client" 

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel" 
import Image from "next/image"


type photo = {
  src: string;
  alt: string;
};

export function PetPhotoCarousel() {
  const photos : photo []= [
    { src: "/velas-mascotas/masc1.jpeg", alt: "Mascota 1" },
    { src: "/velas-mascotas/vela1.jpeg", alt: "Vela 1" },
    { src: "/velas-mascotas/masc2.jpeg", alt: "Mascota 2" },
    { src: "/velas-mascotas/vela2.jpeg", alt: "Vela 2" },
    { src: "/velas-mascotas/masc3.jpeg", alt: "Mascota 3" },
    { src: "/velas-mascotas/vela3.jpeg", alt: "Vela 3" },
    { src: "/velas-mascotas/masc4.jpeg", alt: "Mascota 4" },
    { src: "/velas-mascotas/vela4.jpeg", alt: "Vela 4" },
    { src: "/velas-mascotas/masc5.jpeg", alt: "Mascota 5" },
    { src: "/velas-mascotas/vela5.jpeg", alt: "Vela 5" },
    { src: "/velas-mascotas/masc6.jpeg", alt: "Mascota 6" },
    { src: "/velas-mascotas/vela6.jpeg", alt: "Vela 6" },
  ]

  return (
    <div className="w-full relative px-12"> 
       <Carousel 
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false, 
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
        >
        <CarouselContent>
            {photos.map((photo, index) => (
            <CarouselItem key={index}>
                <div className="relative aspect-square">
                    <Image 
                        src={photo.src} 
                        alt={photo.alt} 
                        fill 
                        className="object-cover rounded-xl"
                    />
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0 " />
        </Carousel>
    </div>
)
}