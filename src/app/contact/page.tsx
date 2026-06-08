import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Arab Times — Premium Watches',
  description:
    'Contact Arab Times. Call, WhatsApp, or visit our official store. Located at 30/1F Main Road, Colachel - 629251.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Arab Times',
    description: 'Get in touch with Arab Times. Call, WhatsApp, or shop online.',
    url: 'https://arabtimes.in/contact',
    images: [{ url: '/images/watch_hero.png', alt: 'Arab Times Contact' }],
  },
};

export { default } from './ContactClient';
