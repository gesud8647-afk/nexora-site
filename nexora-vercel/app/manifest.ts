import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NEXORA | The Next Orbit', short_name: 'NEXORA',
    description: 'NEXORA community and Solana wallet dashboard',
    start_url: '/', display: 'standalone', background_color: '#050b21', theme_color: '#e22a43',
    icons: [{ src: '/nexora-logo.png', sizes: 'any', type: 'image/png' }],
  };
}
