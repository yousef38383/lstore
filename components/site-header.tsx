"use client"

import Link from "next/link"
import { ShoppingBag, Menu, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"

export function SiteHeader() {
  const { setIsCartOpen, cartCount } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-1 md:flex-none">
          <Link href="/" className="font-serif text-3xl font-bold tracking-tighter">
            Lumière
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors outline-none">
              Categories
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/shop" className="w-full cursor-pointer">
                  All Products
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/category/chandeliers" className="w-full cursor-pointer">
                  Chandeliers
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/category/floor-lamps" className="w-full cursor-pointer">
                  Floor Lamps
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/category/pendant" className="w-full cursor-pointer">
                  Pendant Lights
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/category/table-lamps" className="w-full cursor-pointer">
                  Table Lamps
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">
            Shop
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full animate-in zoom-in duration-300" />
            )}
          </Button>

        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl text-left">Lumière</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Categories
                  </h4>
                  <Link
                    href="/shop"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 hover:bg-secondary/50 rounded-md px-2"
                  >
                    All Products
                  </Link>
                  <Link
                    href="/category/chandeliers"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 hover:bg-secondary/50 rounded-md px-2"
                  >
                    Chandeliers
                  </Link>
                  <Link
                    href="/category/floor-lamps"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 hover:bg-secondary/50 rounded-md px-2"
                  >
                    Floor Lamps
                  </Link>
                  <Link
                    href="/category/pendant"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 hover:bg-secondary/50 rounded-md px-2"
                  >
                    Pendant Lights
                  </Link>
                  <Link
                    href="/category/table-lamps"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 hover:bg-secondary/50 rounded-md px-2"
                  >
                    Table Lamps
                  </Link>
                </div>
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Shop
                </Link>

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
