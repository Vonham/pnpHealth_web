import type { Metadata, Viewport } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const viewport: Viewport = {
  themeColor: '#002D62',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pnphealth.ai'),
  title: 'PnP Health Inc. | Prevention by Prediction',
  description:
    'US Clinical Leadership meets Korean Big Data Excellence. Predictive safety infrastructure for hospitals, powered by our proprietary CN Engine.',
  keywords: [
    'predictive healthcare',
    'clinical AI',
    'patient safety',
    'hospital technology',
    'predictive solution',
    'CN Engine',
  ],
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'PnP Health Inc.',
              url: 'https://www.pnphealth.ai',
              logo: 'https://www.pnphealth.ai/icon.png',
              description: 'Predictive safety infrastructure for hospitals, powered by our proprietary CN Engine.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'USA',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@pnphealth.ai',
                contactType: 'customer support',
              },
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
