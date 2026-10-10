import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'NEXORA | The Next Orbit',
  description: 'NEXORA on Solana: explore the token, connect your wallet and follow Devnet staking development. No promised returns.',
  icons: { icon: '/nexora-logo.png', apple: '/nexora-logo.png' },
  openGraph: { title: 'NEXORA | The Next Orbit', description: 'Explore NEXORA on Solana.', images: ['/nexora-logo.png'], type: 'website' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#050b21' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
