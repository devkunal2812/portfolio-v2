import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import CustomCursor from '@/components/ui/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kunalbuilds.me'),
  title: {
    default: 'Kunal | Full Stack Developer — Building Intelligent Digital Experiences',
    template: '%s | Kunal',
  },
  description:
    'Full Stack Developer specializing in React, Next.js, Node.js, and AI-powered applications. Building intelligent digital experiences that push the boundaries of web technology.',
  keywords: [
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js',
    'TypeScript',
    'AI Developer',
    'Web Developer India',
    'Freelance Developer',
    'Open Source',
    'Hackathon',
  ],
  authors: [{ name: 'Kunal', url: 'https://kunalbuilds.me' }],
  creator: 'Kunal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kunalbuilds.me',
    siteName: 'Kunal — Full Stack Developer',
    title: 'Kunal | Building Intelligent Digital Experiences',
    description:
      'Full Stack Developer specializing in React, Next.js, Node.js, and AI-powered applications.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kunal | Full Stack Developer',
    description: 'Building Intelligent Digital Experiences',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-void text-text-primary antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
