import type { Metadata } from 'next'
import { Space_Grotesk, Manrope, Playfair_Display, Montserrat, Plus_Jakarta_Sans } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
  title: 'Haus of Pong — Premium Ping Pong Lounge, Downtown OKC',
  description:
    'A premium ping pong lounge in Downtown Oklahoma City. Tournament tables, curated hospitality, and a members-grade room that stays open around the clock.',
  openGraph: {
    title: 'Haus of Pong — Serve. Spin. Repeat.',
    description: 'Premium ping pong lounge in Downtown Oklahoma City. Open 24/7 by reservation.',
    type: 'website',
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
