import type { Metadata } from 'next'
import { Space_Grotesk, Manrope, Playfair_Display, Montserrat, Plus_Jakarta_Sans } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-playfair',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Haus of Pong — Oklahoma City’s First Fully Automated Ping Pong Lounge',
  description:
    'Oklahoma City’s first fully automated ping pong lounge. Four tournament tables inside the Aloft Hotel in Downtown OKC — self-serve, reservation-only, open 24/7. Book online, the door unlocks for you.',
  keywords: [
    'ping pong Oklahoma City',
    'table tennis OKC',
    'automated ping pong lounge',
    'Downtown OKC things to do',
    'private events OKC',
  ],
  openGraph: {
    title: 'Haus of Pong — Serve. Spin. Repeat.',
    description:
      'Oklahoma City’s first fully automated ping pong lounge. Self-serve, reservation-only, open 24/7 in Downtown OKC.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Haus of Pong',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haus of Pong — Serve. Spin. Repeat.',
    description: 'Oklahoma City’s first fully automated ping pong lounge. Open 24/7 by reservation.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${playfair.variable} ${montserrat.variable} ${jakarta.variable} ${GeistSans.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
