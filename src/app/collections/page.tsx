import type { Metadata } from 'next';
import { getProducts } from '@/lib/fetchStoreProducts';
import CollectionsClient from './CollectionsClient';

// ✅ Auto-revalidate every 60 minutes
// When you add/remove products on arabtimes.in, this page refreshes automatically
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'All Collections | Arab Times — Citizen, Casio, Forest & More Watches',
  description:
    'Shop all Arab Times watches — Citizen, Casio Edifice, G-Shock, Forest Skeleton, Seiko and more. Best prices with free shipping across India.',
  alternates: { canonical: '/collections' },
  openGraph: {
    title: 'Collections | Arab Times',
    description: 'Quality branded watches at the best prices. Free shipping across India.',
    url: 'https://arabtimes.in/collections',
    images: [
      {
        url: 'https://m.media-amazon.com/images/X/bxt1/M/xbxt1BgvdtMNzZA.png',
        alt: 'Arab Times Collections',
      },
    ],
  },
};

export default async function CollectionsPage() {
  // Fetch live products from arabtimes.in (with static fallback)
  const products = await getProducts();

  return <CollectionsClient products={products} />;
}
