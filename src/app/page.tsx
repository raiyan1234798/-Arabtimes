import HeroSection from '@/components/sections/HeroSection';
import DealsStrip from '@/components/sections/DealsStrip';
import FeaturedCollections from '@/components/sections/FeaturedCollections';
import ProductShowcase from '@/components/sections/ProductShowcase';
import BrandStory from '@/components/sections/BrandStory';
import WhyArabTimes from '@/components/sections/WhyArabTimes';
import InstagramShowcase from '@/components/sections/InstagramShowcase';
import SocialProof from '@/components/sections/SocialProof';
import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';
import { getProducts } from '@/lib/fetchStoreProducts';

// Auto-refresh home page every hour to show new products
export const revalidate = 3600;

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const products = await getProducts();
  // Pass top 3 featured products to the home page sections
  const featured = products.filter(w =>
    ['casio-edifice-blue', 'citizen-auto-red', 'seiko-presage-blue'].includes(w.id)
  );
  const featuredProducts = featured.length >= 3 ? featured : products.slice(0, 3);

  return (
    <>
      <HeroSection />
      <DealsStrip />
      <FeaturedCollections products={featuredProducts} />
      <ProductShowcase products={products.slice(0, 8)} />
      <BrandStory />
      <WhyArabTimes />
      <InstagramShowcase />
      <SocialProof />
    </>
  );
}
