// layout.tsx
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Walle Wallet - Your Everyday Payment Card',
  description: 'Tap. Pay. Done. Crypto Anywhere. Revolutionary NFC payment cards for seamless transactions in over 200 countries.',
  keywords: ['crypto', 'payment', 'NFC', 'card', 'wallet', 'blockchain', 'fintech'],
  authors: [{ name: 'Walle Wallet Team' }],
  creator: 'Walle Wallet',
  publisher: 'Walle Wallet',
  openGraph: {
    title: 'Walle Wallet - Revolutionary Payment Solution',
    description: 'Experience the future of payments with NFC-enabled crypto cards',
    url: 'https://wallewallet.com',
    siteName: 'Walle Wallet',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Walle Wallet',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Walle Wallet - Revolutionary Payment Solution',
    description: 'Experience the future of payments with NFC-enabled crypto cards',
    creator: '@wallewallet',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2196f3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* App Content */}
        {children}
      </body>
    </html>
  );
}