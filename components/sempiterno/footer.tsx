import { Flame, Heart, Instagram } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Flame className="w-8 h-8 text-secondary" />
            <div>
              <p className="font-serif text-xl font-bold">Sempiterno</p>
              <p className="text-sm text-background/60">Aromas & Momentos</p>
            </div>
          </div>
          
          {/* Tagline */}
          <p className="text-center text-background/80 italic">
            &ldquo;Luz que trasciende, aromas que abrazan el alma&rdquo;
          </p>
          
          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/sempiterno_aromas_momentos/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-background/10 text-center">
          <p className="text-sm text-background/60 flex items-center justify-center gap-1">
            © {currentYear} Sempiterno. Hecho con <Heart className="w-4 h-4 text-secondary fill-secondary" /> en Cali, Colombia
          </p>
        </div>
      </div>
    </footer>
  )
}
