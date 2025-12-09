"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/components/cart-context"
import { CheckCircle, CreditCard, Truck, ShieldCheck, Package, Receipt } from "lucide-react"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const shipping = subtotal > 500 ? 0 : 25
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setIsComplete(true)
    clearCart()
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-serif text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <p className="text-muted-foreground mb-8">
              Order #LUM-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </p>
            <Button asChild className="rounded-full px-8">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }


  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add some products to checkout</p>
            <Button asChild className="rounded-full px-8">
              <Link href="/shop">Browse Products</Link>
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
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold">Contact Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                  </div>
                </div>

                <Separator />

                {/* Shipping Address */}
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold">Shipping Address</h2>
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main Street" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input id="apartment" placeholder="Apt 4B" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="NY" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="10001" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" placeholder="United States" required />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Payment Information */}
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold">Payment Information</h2>
                  <div className="p-4 bg-secondary/50 rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      This is a demo checkout. No real payment will be processed.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="4242 4242 4242 4242" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" required />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full rounded-full py-6 text-lg font-bold"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay $${total.toFixed(2)}`
                  )}
                </Button>
              </form>
            </div>


            {/* Detailed Invoice */}
            <div>
              <div className="bg-secondary/30 rounded-2xl p-6 lg:p-8 sticky top-24">
                {/* Invoice Header */}
                <div className="flex items-center gap-3 mb-2">
                  <Receipt className="w-6 h-6 text-primary" />
                  <h2 className="font-serif text-2xl font-bold">Invoice</h2>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-muted-foreground">Order Summary</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <Separator className="my-4" />

                {/* Items Table Header */}
                <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-3 text-right">Total</div>
                </div>

                <Separator className="mb-4" />

                {/* Cart Items - Detailed */}
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                  {items.map((item, index) => (
                    <div key={item.id}>
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-5 flex gap-3 items-center">
                          <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-white shrink-0 border">
                            <Image 
                              src={item.image || "/placeholder.svg"} 
                              alt={item.name} 
                              fill 
                              className="object-cover" 
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">{item.category}</p>
                            <p className="text-xs text-muted-foreground/70">SKU: LUM-{item.id.toString().padStart(4, '0')}</p>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className="inline-flex items-center justify-center w-7 h-7 bg-background rounded-full text-sm font-medium border">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="col-span-2 text-right">
                          <p className="text-sm text-muted-foreground">${item.price.toLocaleString()}</p>
                        </div>
                        <div className="col-span-3 text-right">
                          <p className="text-sm font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                      {index < items.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Summary Section */}
                <div className="bg-background/60 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                    </span>
                    <span className="font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Shipping
                    </span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {shipping === 0 && (
                    <div className="text-xs text-green-600 bg-green-50 dark:bg-green-950/30 px-3 py-2 rounded-lg flex items-center gap-2">
                      <CheckCircle className="w-3 h-3" />
                      You qualified for free shipping (orders over $500)
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <span className="text-lg font-bold">Total Due</span>
                      <p className="text-xs text-muted-foreground">Including all taxes</p>
                    </div>
                    <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Savings Banner */}
                {subtotal > 500 && (
                  <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-900 rounded-lg p-3">
                    <p className="text-sm text-green-700 dark:text-green-400 font-medium text-center">
                      🎉 You&apos;re saving $25 on shipping!
                    </p>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Truck className="w-5 h-5 shrink-0" />
                    <span>Free shipping on orders over $500</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CreditCard className="w-5 h-5 shrink-0" />
                    <span>All major cards accepted</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-4 flex justify-center gap-2">
                  <div className="w-12 h-7 bg-background rounded border flex items-center justify-center text-[10px] font-bold text-blue-600">VISA</div>
                  <div className="w-12 h-7 bg-background rounded border flex items-center justify-center text-[10px] font-bold text-red-500">MC</div>
                  <div className="w-12 h-7 bg-background rounded border flex items-center justify-center text-[10px] font-bold text-blue-800">AMEX</div>
                  <div className="w-12 h-7 bg-background rounded border flex items-center justify-center text-[10px] font-bold text-orange-500">PayPal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
