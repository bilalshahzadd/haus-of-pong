'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { CtaButton } from './ui'

/**
 * Header (node 2103:1458) — 1920x150, 200px gutters, fill #050505b2 with a
 * 24px backdrop blur and a #ffffff14 hairline underneath.
 * Logo 119x119. Nav links Manrope 400 / 20 / lh 20, active #fd991f,
 * resting #ffffff99, each with 8/16 padding and a 4px gap.
 */

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Experiences', href: '/#experiences' },
  { label: 'Locations', href: '/#locations' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Get the App', href: '/#app' },
  { label: 'Contact Us', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  const isActive = (item: (typeof NAV)[number]) =>
    item.href === '/' ? pathname === '/' : pathname === item.href

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#050505b2] backdrop-blur-[24px]">
      <div className="shell flex h-header items-center justify-between">
        <Link href="/" className="relative block h-logo w-logo shrink-0 overflow-hidden rounded-[18%]">
          <Image src="/images/logo.png" alt="Haus of Pong" fill sizes="119px" className="object-cover" priority />
        </Link>

        <nav className="hidden items-center gap-[4px] xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`px-s16 py-s8 font-body text-f20 leading-none transition-colors duration-200 hover:text-white ${
                isActive(item) ? 'text-orange-400' : 'text-white/60'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:block">
          <CtaButton href="/contact">Book your table</CtaButton>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white xl:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.08] bg-ink/95 backdrop-blur-xl xl:hidden">
          <nav className="shell flex flex-col py-6">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`py-3 font-body text-[15px] ${isActive(item) ? 'text-orange-400' : 'text-white/70'}`}
              >
                {item.label}
              </Link>
            ))}
            <CtaButton href="/contact" className="mt-4 w-fit">
              Book your table
            </CtaButton>
          </nav>
        </div>
      )}
    </header>
  )
}
