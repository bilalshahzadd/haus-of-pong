import Image from 'next/image'
import Link from 'next/link'
import { SocialLinks } from './ui'
import {
  ADDRESS,
  BOOKING,
  DELETION_HREF,
  EMAIL,
  EMAIL_HREF,
  HOURS,
  PHONE,
  PHONE_HREF,
  WAIVER,
} from '@/lib/site'

/**
 * Footer (node 2103:1410) — 1920x460, wash 90deg #050505 -> #332001, top hairline.
 * Container 1520, pad 64 top/bottom, gap 64. Columns 736 / 344 / 344 with 48px gutters.
 * Headings Manrope 400 / 10 / ls 2.4 uppercase #ffffff66; links Manrope 400 / 14 / lh 20.
 * Socials are 36x36 r999 with a #ffffff14 border and 14px glyphs.
 */

const QUICK = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Replays', href: '/#replays' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Private Events', href: '/#events' },
  { label: 'Location', href: '/#location' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'FAQ', href: '/#faq' },
]

const LEGAL = [
  { label: 'Waiver & Facility Rules', href: WAIVER.href },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Delete My Data', href: DELETION_HREF },
  { label: 'Venue Details', href: '/venue-details' },
  { label: 'Contact', href: '/contact' },
]

const linkClass = 'font-body text-f14 leading-[1.43] text-white/60 transition-colors hover:text-orange'
const headClass = 'font-body text-f10 uppercase leading-[1.5] tracking-[0.24em] text-white/40'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-wash-footer">
      <div className="shell py-s64">
        <div className="grid gap-s64 xl:grid-cols-[736fr_344fr_344fr] xl:gap-[3.125vw]">
          <div>
            <div className="relative h-logo w-logo overflow-hidden rounded-[18%]">
              <Image src="/images/logo.png" alt="Haus of Pong" fill sizes="119px" className="object-cover" />
            </div>

            {/* "Down town" was two words here. It is one. */}
            <p className="mt-s24 max-w-[460px] font-body text-f16 leading-[1.44] text-white/60">
              Oklahoma City’s first fully automated ping pong lounge — self-serve, reservation-only, and open
              around the clock in Downtown OKC.
            </p>

            <p className="mt-s24 max-w-[420px] font-body text-f16 leading-[1.44] text-white/60">
              {ADDRESS.building}
              <br />
              {ADDRESS.street} {ADDRESS.suite} · {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
              <br />
              {HOURS}
            </p>

            <p className="mt-s16 flex flex-col gap-s8">
              <a href={PHONE_HREF} className={`${linkClass} text-f16`}>
                {PHONE}
              </a>
              <a href={EMAIL_HREF} className={`${linkClass} text-f16`}>
                {EMAIL}
              </a>
            </p>

            <div className="mt-s24">
              <h4 className={headClass}>Follow</h4>
              <SocialLinks size={36} className="mt-s16" />
            </div>
          </div>

          <div>
            <h4 className={headClass}>Quick Links</h4>
            <ul className="mt-s20 flex flex-col gap-s12">
              {QUICK.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={headClass}>Visit</h4>
            <ul className="mt-s20 flex flex-col gap-s12">
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={BOOKING.href}
              className="mt-s24 inline-flex items-center gap-s8 rounded-pill bg-cta px-6 py-3 font-body text-f14 font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              {BOOKING.label}
            </Link>
          </div>
        </div>

        <div className="mt-s64 flex flex-col gap-3 border-t border-white/[0.08] pt-s32 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-f12 leading-[1.33] text-white/60">© 2026 Haus of Pong. All rights reserved.</p>
          <p className="font-body text-f12 uppercase leading-[1.33] tracking-[0.22em] text-white/40">
            Made for the rally.
          </p>
        </div>
      </div>
    </footer>
  )
}
