"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { products } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Heart, Minus, Plus, ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/components/cart-context"
import { useState } from "react"

export default function ProductPage() {
  const params = useParams()
  const id = Number(params.id)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  
  const product = products.find((p) => p.id === id)
  const relatedProducts = products
    .filter((p) => p.categorySlug === product?.categorySlug && p.id !== id)
    .slice(0, 4)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">Product Not Found</h1>
            <Button asChild variant="outline">
              <Link href="/shop">Back to Shop</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href={`/category/${product.categorySlug}`} className="hover:text-foreground">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Product Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isNew && (
                <span className="absolute top-6 left-6 bg-black text-white text-sm font-bold px-3 py-1 rounded-sm">
                  New
                </span>
              )}
              <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-bold mb-6">${product.price.toLocaleString()}</p>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button 
                size="lg" 
                className="w-full md:w-auto rounded-full px-12 py-6 text-lg font-bold"
                onClick={handleAddToCart}
              >
                Add to Cart - ${(product.price * quantity).toLocaleString()}
              </Button>

              {/* Product Features */}
              <div className="mt-10 pt-8 border-t space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Free shipping on orders over $500</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span>2-year warranty included</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t pt-16">
              <h2 className="font-serif text-3xl md:text-4xl mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="group relative">
                    <Link href={`/product/${relatedProduct.id}`}>
                      <div className="aspect-square relative overflow-hidden rounded-lg bg-secondary mb-4">
                        <Image
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div className="space-y-1 text-center md:text-left">
                      <p className="text-xs text-muted-foreground">{relatedProduct.category}</p>
                      <Link href={`/product/${relatedProduct.id}`}>
                        <h3 className="font-serif text-lg group-hover:text-primary/80 transition-colors">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                      <p className="font-medium mt-1">${relatedProduct.price.toLocaleString()}</p>
                    </div>
                    <Button 
                      className="w-full rounded-full shadow-lg mt-3" 
                      onClick={() => addToCart(relatedProduct)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
