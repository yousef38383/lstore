"use client"

import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/components/cart-context"

export default function ShopPage() {
  const { addToCart } = useCart()

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Shop Header */}
        <div className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">All Products</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our complete collection of luxury lighting solutions to suit all tastes.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <Link href={`/product/${product.id}`}>
                  <div className="aspect-square relative overflow-hidden rounded-lg bg-secondary mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.isNew && (
                      <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-2 py-1 rounded-sm">
                        New
                      </span>
                    )}
                    <button 
                      className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-red-500"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </Link>
                <div className="space-y-1 text-center md:text-left">
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-serif text-lg group-hover:text-primary/80 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="font-medium mt-1">${product.price.toLocaleString()}</p>
                </div>
                <Button 
                  className="w-full rounded-full shadow-lg mt-3" 
                  size="lg"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
