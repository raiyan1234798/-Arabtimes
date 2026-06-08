/**
 * fetchStoreProducts.ts
 *
 * Fetches the latest product catalog directly from arabtimes.in by
 * extracting the __NEXT_DATA__ JSON that SmartBiz injects into every
 * page (same mechanism the browser agent used). Falls back to the
 * static collections.ts data if the fetch fails.
 */

import { collections, type Watch } from '@/data/collections';

export interface LiveProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  mrp: string;
  discount: string;
  image: string;
  storeUrl: string;
  description: string;
  features: string[];
  badge?: string;
  inStock: boolean;
}

function calcDiscount(sale: number, mrp: number): string {
  if (!mrp || mrp <= sale) return '';
  return `${Math.round(((mrp - sale) / mrp) * 100)}% OFF`;
}

function formatPrice(paise: number): string {
  return `₹${(paise / 100).toLocaleString('en-IN')}`;
}

function extractFeatures(product: Record<string, unknown>): string[] {
  const features: string[] = [];
  // Try to extract from product properties
  const desc = (product.description as string) || '';
  if (/chronograph/i.test(desc)) features.push('Chronograph');
  if (/water.resist/i.test(desc) || /WR/i.test(desc)) features.push('Water Resistant');
  if (/automatic/i.test(desc)) features.push('Automatic');
  if (/skeleton/i.test(desc)) features.push('Skeleton Dial');
  if (/leather/i.test(desc)) features.push('Leather Strap');
  if (/stainless/i.test(desc)) features.push('Stainless Steel');
  if (/quartz/i.test(desc)) features.push('Quartz');
  if (/digital/i.test(desc)) features.push('Digital');
  if (features.length < 2) {
    // Add from name
    const name = (product.name as string) || '';
    if (/blue/i.test(name)) features.push('Blue Dial');
    if (/black/i.test(name)) features.push('Black Dial');
    if (/rose.gold/i.test(name)) features.push('Rose Gold');
    if (/silver/i.test(name)) features.push('Silver');
    if (/gold/i.test(name) && !/rose/i.test(name)) features.push('Gold Tone');
  }
  if (features.length === 0) features.push('Analog', 'Premium Style', 'Stylish');
  return features.slice(0, 4);
}

function determineBrand(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('casio') || n.includes('g-shock') || n.includes('edifice')) return 'Casio';
  if (n.includes('citizen')) return 'Citizen';
  if (n.includes('seiko')) return 'Seiko';
  if (n.includes('forest')) return 'Forest';
  return 'Arab Times';
}

function determineCategory(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('casio') || n.includes('g-shock') || n.includes('edifice')) return 'Casio';
  if (n.includes('citizen')) return 'Citizen';
  if (n.includes('seiko')) return 'Seiko';
  if (n.includes('forest')) return 'Forest';
  if (n.includes('sports') || n.includes('shock') || n.includes('diver')) return 'Sports';
  return 'Premium Style';
}

/**
 * Fetches live products from the SmartBiz all-products page.
 * Extracts __NEXT_DATA__ JSON which contains full product catalog.
 */
export async function fetchLiveProducts(): Promise<LiveProduct[]> {
  try {
    const res = await fetch('https://www.arabtimes.in/all-products', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        Referer: 'https://www.arabtimes.in/',
      },
      next: { revalidate: 3600 }, // Re-fetch every hour
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();

    // Extract __NEXT_DATA__ JSON
    const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
    if (!match) throw new Error('__NEXT_DATA__ not found');

    const nextData = JSON.parse(match[1]);
    const products =
      nextData?.props?.pageProps?.products ||
      nextData?.props?.pageProps?.productList ||
      nextData?.props?.pageProps?.data?.products ||
      [];

    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('No products in __NEXT_DATA__');
    }

    return products
      .filter((p: Record<string, unknown>) => p && p.name)
      .map((p: Record<string, unknown>) => {
        const salePrice = (p.salePrice as number) || (p.discountedPrice as number) || (p.price as number) || 0;
        const mrpPrice  = (p.price as number) || (p.mrp as number) || salePrice;
        const saleInr   = salePrice > 10000 ? salePrice / 100 : salePrice; // handle paise vs rupees
        const mrpInr    = mrpPrice  > 10000 ? mrpPrice  / 100 : mrpPrice;
        const productId = (p.id as string) || (p._id as string) || '';
        const name      = (p.name as string) || '';

        // Image: try multiple fields
        const rawImages = (p.images as unknown[]) || [];
        const firstImg  = rawImages[0] as Record<string, unknown> | string | undefined;
        let imageUrl    = '';
        if (typeof firstImg === 'string') imageUrl = firstImg;
        else if (firstImg && typeof firstImg === 'object') {
          imageUrl = (firstImg.url as string) || (firstImg.src as string) || '';
        }
        if (!imageUrl) imageUrl = (p.image as string) || (p.thumbnail as string) || '';

        const inStock = p.inStock !== false && p.status !== 'inactive' && p.status !== 'soldOut';

        return {
          id: productId,
          name,
          brand: determineBrand(name),
          category: determineCategory(name),
          price: `₹${Math.round(saleInr).toLocaleString('en-IN')}`,
          mrp:   `₹${Math.round(mrpInr).toLocaleString('en-IN')}`,
          discount: calcDiscount(saleInr, mrpInr),
          image: imageUrl,
          storeUrl: `https://www.arabtimes.in/product/${productId}`,
          description: (p.description as string) || name,
          features: extractFeatures(p as Record<string, unknown>),
          inStock,
        } satisfies LiveProduct;
      });
  } catch (err) {
    console.warn('[Arab Times] Live product fetch failed, using static data:', err);
    return [];
  }
}

/**
 * Get products — tries live store first, falls back to static data.
 * The fallback ensures the site always works even if arabtimes.in is down.
 */
export async function getProducts(): Promise<Watch[]> {
  const live = await fetchLiveProducts();

  if (live.length > 0) {
    // Map live products to Watch type (same shape)
    return live.filter(p => p.inStock).map(p => ({
      ...p,
      // Keep existing category type safe
      category: (['Casio', 'Citizen', 'Forest', 'Seiko', 'Sports', 'Premium Style'].includes(p.category)
        ? p.category
        : 'Premium Style') as Watch['category'],
    }));
  }

  // Static fallback — always returns something
  return collections;
}
