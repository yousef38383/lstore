"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { products, categories } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/components/cart-context"

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const { addToCart } = useCart()
  
  const category = categories.find((c) => c.slug === slug)
  const categoryProducts = products.filter((p) => p.categorySlug === slug)

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">Category Not Found</h1>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Category Header */}
        <div className="relative h-[40vh] w-full overflow-hidden">
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">{category.name}</h1>
            <div className="flex items-center gap-2 text-sm md:text-base opacity-80">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <span>{category.name}</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <p className="text-muted-foreground">{categoryProducts.length} products found</p>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {categoryProducts.map((product) => (
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
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No products in this category yet.</p>
              <Button asChild className="mt-6 bg-transparent" variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
