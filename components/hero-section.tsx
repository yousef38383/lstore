import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto mb-16">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-balance">
            Perfect Lighting <br />
            <span className="italic font-light">Meets Modern Design</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Transform your space into a masterpiece with Lumière's exclusive collection of chandeliers and lamps, carefully designed to match your refined taste.
          </p>
        </div>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg">
          <Image src="/luxury-minimalist-living-room-warm-lighting-chande.jpg" alt="Hero Interior" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white text-left">
            <p className="text-sm uppercase tracking-widest mb-2 font-medium opacity-90">2025 Collection</p>
            <h3 className="font-serif text-3xl md:text-4xl">Quiet Elegance</h3>
          </div>
        </div>

        <div className="flex justify-center gap-12 mt-16">
          <div className="flex flex-col items-center gap-4 group cursor-pointer">
            <span className="text-sm font-bold tracking-widest uppercase">Discover Our Story</span>
            <div className="h-12 w-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 group cursor-pointer">
            <span className="text-sm font-bold tracking-widest uppercase">Shop Products</span>
            <div className="h-12 w-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
