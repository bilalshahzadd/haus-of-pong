import Image from 'next/image'
import Link from 'next/link'
import { Icon } from './ui'

/**
 * Footer (node 2103:1410) — 1920x460, wash 90deg #050505 -> #332001, top hairline.
 * Container 1520, pad 64 top/bottom, gap 64. Columns 736 / 344 / 344 with 48px gutters.
 * Headings Manrope 400 / 10 / ls 2.4 uppercase #ffffff66; links Manrope 400 / 14 / lh 20.
 * Socials are 36x36 r999 with a #ffffff14 border and 14px glyphs.
 * Bottom bar: 32px above a #ffffff14 rule, both labels Manrope 400 / 12.
 */

const QUICK = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experiences' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Download App', href: '/#app' },
  { label: 'Contact', href: '/contact' },
]

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/privacy-policy' },
  { label: 'Cookies', href: '/privacy-policy' },
  { label: 'Contact', href: '/contact' },
]

const SOCIALS = [
  { icon: 'social-instagram', label: 'Instagram' },
  { icon: 'social-twitter', label: 'Twitter' },
  { icon: 'social-facebook', label: 'Facebook' },
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
            <p className="mt-s24 max-w-[426px] font-body text-f16 leading-[1.44] text-white/60">
              A premium ping pong lounge in Down town Oklahoma City.
              <br />
              Come for the rally. Stay for the night.
            </p>
            <p className="mt-s24 max-w-[420px] font-body text-f16 leading-[1.44] text-white/60">
              209 N. Walnut Ave. Suite 102 · Oklahoma City, OK 73104
            </p>
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
            <h4 className={headClass}>Legal</h4>
            <ul className="mt-s20 flex flex-col gap-s12">
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-s24 flex gap-s8 pt-s12">
              {SOCIALS.map((s) => (
                <Link
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] transition-colors hover:border-orange/50"
                >
                  <Icon name={s.icon} size={14} />
                </Link>
              ))}
            </div>
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
