"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { products } from "@/lib/data"
import { useCart } from "@/components/cart-context"

export function ProductGrid() {
  const bestSellers = products.slice(0, 4)
  const { addToCart } = useCart()

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-4xl md:text-5xl">Best Sellers</h2>
          <p className="text-muted-foreground">Selected pieces loved by our customers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-square relative overflow-hidden rounded-lg bg-white mb-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-red-500">
                  <Heart className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Button className="w-full rounded-full shadow-lg" size="lg" onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div className="space-y-1 text-center md:text-left">
                <p className="text-xs text-muted-foreground">{product.category}</p>
                <h3 className="font-serif text-lg group-hover:text-primary/80 transition-colors">{product.name}</h3>
                <p className="font-medium mt-1">${product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
