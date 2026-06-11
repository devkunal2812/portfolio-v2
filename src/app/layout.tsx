import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import CustomCursor from '@/components/ui/CustomCursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://kunalbuilds.me'),
  title: { default: 'Kunal | Full Stack Developer', template: '%s | Kunal' },
  description: 'Full Stack Developer specializing in React, Next.js, Node.js, and AI-powered applications.',
  keywords: ['Full Stack Developer', 'React Developer', 'Next.js', 'Node.js', 'TypeScript', 'AI Developer'],
  authors: [{ name: 'Kunal', url: 'https://kunalbuilds.me' }],
  openGraph: {
    type: 'website', locale: 'en_US', url: 'https://kunalbuilds.me',
    title: 'Kunal | Full Stack Developer',
    description: 'Building intelligent digital experiences.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Kunal | Full Stack Developer', images: ['/og-image.png'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="bg-cream text-ink antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
