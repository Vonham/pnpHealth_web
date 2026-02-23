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
  title: 'PNP Health Inc. | Prevention by Prediction',
  description:
    'US Clinical Leadership meets Korean Big Data Excellence. Predictive safety infrastructure for hospitals, powered by our proprietary CN Engine.',
  keywords: [
    'predictive healthcare',
    'clinical AI',
    'patient safety',
    'hospital technology',
    'CARMS',
    'CN Engine',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
