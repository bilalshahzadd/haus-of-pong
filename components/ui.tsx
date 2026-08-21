import Link from 'next/link'
import type { ReactNode } from 'react'
import { APP, BOOKING, SOCIALS } from '@/lib/site'

/** Figma exports every glyph to /public/icons; they already carry their own colours. */
export function Icon({
  name,
  size = 16,
  className = '',
  alt = '',
}: {
  name: string
  size?: number | string
  className?: string
  alt?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/icons/${name}.svg`}
      alt={alt}
      aria-hidden={alt === '' || undefined}
      width={typeof size === 'number' ? size : undefined}
      height={typeof size === 'number' ? size : undefined}
      style={typeof size === 'string' ? { width: size, height: size } : undefined}
      className={className}
    />
  )
}

/** The north-east arrow that trails the CTAs (VECTOR pair, 16x16, 1.33 stroke). */
function ArrowNE({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M4.5 11.5 11.5 4.5" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" />
      <path d="M6 4.5h5.5V10" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Primary pill — 198x52, r999, LINEAR 90deg #a74ae5 -> #fd991f,
 * pad 16/28, gap 8, label Manrope 600 / 16 / lh 20.
 */
export function CtaButton({
  children,
  href = '/contact',
  className = '',
}: {
  children: ReactNode
  href?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-s8 rounded-pill bg-cta px-[1.4583vw] py-s16 font-body text-f16 font-semibold leading-[1.25] text-white transition-transform duration-300 hover:scale-[1.03] max-xl:px-6 ${className}`}
    >
      {children}
      <ArrowNE className="h-[1em] w-[1em] transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  )
}

/**
 * Ghost pill — r999, fill #0505054d, 1px gradient border, backdrop blur 12.
 */
export function GhostButton({
  children,
  href = '#',
  className = '',
}: {
  children: ReactNode
  href?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-s8 rounded-pill bg-[#0505054d] px-[1.4583vw] py-s16 font-body text-f16 font-semibold leading-[1.25] text-white backdrop-blur-[12px] transition-colors duration-300 max-xl:px-6 ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-pill p-px [background:linear-gradient(90deg,rgba(167,74,229,0.65),rgba(255,157,0,0.55))] [mask-composite:exclude] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]" />
      {children}
      <ArrowNE className="h-[1em] w-[1em] transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  )
}

/**
 * Green availability pill — r999, fill #6aff1f0f, border #6aff1f29,
 * 6px dot, label Manrope 400 / 20 / ls 2.4 / uppercase / #6aff1f.
 */
export function StatusPill({ label = 'Open 24/7 by Reservation' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-s8 rounded-pill border border-neon/[0.16] bg-neon/[0.06] px-s16 py-[0.3125vw] backdrop-blur-[12px] max-xl:py-1.5">
      <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-neon" />
      <span className="font-body text-f12 uppercase leading-none tracking-[0.132em] text-neon xl:text-[20px]">
        {label}
      </span>
    </span>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

/** 44x44 outlined circle used for the contact / location rows. */
export function CircleIcon({ name, size = 16 }: { name: string; size?: number }) {
  return (
    <span className="grid h-[2.2917vw] max-h-[44px] min-h-[36px] w-[2.2917vw] min-w-[36px] max-w-[44px] shrink-0 place-items-center rounded-full border border-white/[0.16]">
      <Icon name={name} size={size} className="h-[36%] w-[36%]" />
    </span>
  )
}

/**
 * The primary booking CTA. Every "book a table" affordance on the site routes
 * through this one component, so the day a real booking system exists only
 * BOOKING in lib/site.ts changes — no hunting for stray hrefs.
 */
export function BookButton({ className = '', children }: { className?: string; children?: ReactNode }) {
  return (
    <CtaButton href={BOOKING.href} className={className}>
      {children ?? BOOKING.label}
    </CtaButton>
  )
}

/**
 * Instagram / TikTok / Facebook row. `size` is the circle diameter in px.
 * Real profile links open in a new tab; nothing here is ever a dead `#`.
 */
export function SocialLinks({ size = 44, className = '' }: { size?: number; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-s12 ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${s.label} — Haus of Pong`}
          style={{ width: size, height: size }}
          className="grid shrink-0 place-items-center rounded-full border border-white/[0.16] transition-colors duration-300 hover:border-orange/60"
        >
          <Icon name={s.icon} size={Math.round(size * 0.36)} />
        </a>
      ))}
    </div>
  )
}

/**
 * App Store / Google Play badge.
 *
 * The store listings do not exist yet, so a badge is only a link when its
 * platform is actually published. Until then it renders as a visibly inert
 * "Coming soon" chip — dimmed, not white, `aria-disabled`, no hover lift and
 * no href — so nobody taps a badge that leads nowhere. Flip the platform's
 * `live` flag in lib/site.ts on launch and it becomes a real link.
 */
export function StoreBadge({ platform, className = '' }: { platform: 'ios' | 'android'; className?: string }) {
  const config = APP[platform]
  const meta =
    platform === 'ios'
      ? { icon: 'brand-apple', kicker: 'Download on the', name: 'App Store', size: 21 }
      : { icon: 'brand-playstore', kicker: 'Get it on', name: 'Google Play', size: 24 }

  const inner = (
    <>
      <Icon name={meta.icon} size={meta.size} className="h-[1.35em] w-auto" />
      <span className="leading-tight">
        <span
          className={`block font-body text-f10 uppercase tracking-[0.08em] ${
            config.live ? 'text-ink/60' : 'text-white/40'
          }`}
        >
          {config.live ? meta.kicker : 'Coming soon'}
        </span>
        <span className={`block font-display text-f16 font-bold ${config.live ? 'text-ink' : 'text-white/70'}`}>
          {meta.name}
        </span>
      </span>
    </>
  )

  const shared = `inline-flex items-center gap-s12 rounded-pill px-s24 py-[0.7292vw] max-xl:py-3.5 ${className}`

  if (!config.live) {
    return (
      <span
        aria-disabled="true"
        className={`${shared} cursor-default border border-white/[0.12] bg-white/[0.04] opacity-70 grayscale`}
      >
        {inner}
      </span>
    )
  }

  return (
    <a
      href={config.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${shared} bg-white text-ink transition-transform duration-300 hover:scale-[1.03]`}
    >
      {inner}
    </a>
  )
}
