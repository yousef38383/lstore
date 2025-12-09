import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { CategoryShowcase } from "@/components/category-showcase"
import { FeaturedProduct } from "@/components/featured-product"
import { ProductGrid } from "@/components/product-grid"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <CategoryShowcase />
        <FeaturedProduct />
        <ProductGrid />
      </main>
      <SiteFooter />
    </div>
  )
}
