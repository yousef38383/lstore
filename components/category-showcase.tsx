import Image from "next/image"
import Link from "next/link"

interface CategoryProps {
  title: string
  subtitle: string
  image: string
  href: string
  reverse?: boolean
}

function CategoryCard({ title, subtitle, image, href, reverse }: CategoryProps) {
  return (
    <Link href={href} className="group block w-full">
      <div className="relative bg-secondary/50 p-8 md:p-12 rounded-xl overflow-hidden transition-colors hover:bg-secondary h-[500px] flex flex-col justify-between">
        <div
          className={`relative z-10 transition-transform duration-500 group-hover:-translate-y-2 ${reverse ? "order-2 mt-8" : "order-1 mb-8"}`}
        >
          <h3 className="font-serif text-4xl md:text-5xl mb-2">{title}</h3>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <div className={`relative h-64 w-full z-10 ${reverse ? "order-1" : "order-2"}`}>
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/40 rounded-full blur-3xl -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </Link>
  )
}

export function CategoryShowcase() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="font-serif text-4xl md:text-6xl max-w-xl leading-tight">
            Eye-Catching Designs <br />
            <span className="text-muted-foreground italic text-3xl md:text-5xl">For Every Corner of Your Home</span>
          </h2>
          <Link
            href="/shop"
            className="hidden md:inline-block border-b border-primary pb-1 hover:opacity-70 transition-opacity"
          >
            View All Collections
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard
            title="Crystal Chandeliers"
            subtitle="Classic luxury with a modern touch"
            image="/crystal-chandelier-isolated.jpg"
            href="/category/chandeliers"
          />
          <CategoryCard
            title="Floor Lamps"
            subtitle="Soft lighting for reading and relaxation"
            image="/modern-floor-lamp-minimal-isolated.jpg"
            href="/category/floor-lamps"
            reverse
          />
          <CategoryCard
            title="Pendant Lights"
            subtitle="Modern designs for dining rooms"
            image="/pendant-light-modern-isolated.jpg"
            href="/category/pendant"
          />
        </div>
      </div>
    </section>
  )
}
