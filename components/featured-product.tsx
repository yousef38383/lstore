import Image from "next/image"
import { Button } from "@/components/ui/button"

export function FeaturedProduct() {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-[#1A1A1A] text-white rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-[600px] w-full">
              <Image src="/modern-minimalist-living-room-dark-elegant.jpg" alt="Featured Collection" fill className="object-cover" />
            </div>
            <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center items-start">
              <span className="text-xs font-bold tracking-widest uppercase text-white/60 mb-6">Fall Collection</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
                Escape Reality <br />
                Without Leaving Your Room
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-md leading-relaxed">
                Discover our new collection of ambient lighting that creates an atmosphere of serenity and calm in your personal space.
              </p>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-black rounded-full px-8 py-6 text-lg"
              >
                Explore Collection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
