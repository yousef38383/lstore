import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { CartSheet } from "@/components/cart-sheet"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Lumière - Luxury Lighting Store",
  description: "The finest chandeliers and lamps to illuminate your home with elegance",
  generator: 'v0.app',
  icons: {
    icon: "https://cdn-icons-png.flaticon.com/512/2553/2553642.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}>
        <CartProvider>
          {children}
          <CartSheet />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
