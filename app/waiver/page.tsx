import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { Icon } from '@/components/ui'
import { BOOKING, EMAIL, EMAIL_HREF } from '@/lib/site'

/**
 * Waiver & facility rules.
 *
 * An unstaffed room has nobody to hand a clipboard to, so the terms a guest
 * accepts at booking have to be readable in full somewhere before they book.
 * This is that page — linked from the booking flow, the footer and the FAQ.
 */

export const metadata: Metadata = {
  title: 'Waiver & Facility Rules — Haus of Pong',
  description:
    'The liability waiver and facility rules every Haus of Pong guest accepts before play, stated in full.',
}

const RULES = [
  {
    icon: 'icon-waiver',
    title: 'Accepted at booking',
    copy: 'Every guest accepts the waiver and facility rules as part of the booking flow. There is no paperwork at the door — but play is only covered once it has been accepted.',
  },
  {
    icon: 'about-private-bookings',
    title: 'The booker covers their group',
    copy: 'Whoever makes the reservation is responsible for everyone who comes with them, and confirms each guest has been made aware of these terms.',
  },
  {
    icon: 'about-date-night',
    title: 'Minors play with an adult',
    copy: 'Guests under 18 are welcome, and must be accompanied by a parent or guardian who accepts the waiver on their behalf.',
  },
  {
    icon: 'exp-casual-play',
    title: 'Play at your own risk',
    copy: 'Ping pong involves movement, hard floors and a fast ball. You accept the ordinary risk of injury that comes with playing, and confirm you are fit to play.',
  },
  {
    icon: 'about-automated-entry',
    title: 'Your access is yours alone',
    copy: 'Access instructions are issued for your reservation. Don’t share them, don’t prop the door, and don’t admit anyone who isn’t part of your booking.',
  },
  {
    icon: 'about-video-highlights',
    title: 'The room is monitored and recorded',
    copy: 'The lounge is under video surveillance for security, and select gameplay is captured for replays and highlights. Being in the room means you consent to that recording.',
  },
  {
    icon: 'about-lounge-seating',
    title: 'Leave it as you found it',
    copy: 'Return paddles and balls, take your rubbish with you, and report anything damaged. Damage beyond normal play may be charged to the booking.',
  },
  {
    icon: 'exp-friends-night',
    title: 'Respect the room',
    copy: 'No smoking or vaping, no outside alcohol, no climbing or sitting on the tables, and nothing that would spoil the session for the group booked in after you.',
  },
]

export default function WaiverPage() {
  return (
    <div className="relative bg-wash-up">
      <div className="hairline" />

      <PageHero
        title="Waiver & Facility Rules"
        subtitle="What every guest accepts before playing. It takes a moment during booking — there is no paperwork at the door."
      />

      <div className="shell pb-s140 pt-s50">
        <div className="mx-auto max-w-[980px]">
          <Reveal>
            <div className="rounded-r32 border border-orange/25 bg-ink-600 p-s40">
              <p className="font-body text-f16 leading-[1.7] text-white/70">
                Haus of Pong is a self-serve, unstaffed lounge. Because there is nobody on site to brief you, these
                terms are set out in full here and accepted as part of your booking. Reading them before you book is
                the point of this page.
              </p>
            </div>
          </Reveal>

          <div className="mt-s40 grid gap-s16 md:grid-cols-2">
            {RULES.map((rule, i) => (
              <Reveal key={rule.title} delay={0.05 * i}>
                <article className="h-full rounded-r24 border border-white/[0.08] bg-ink-600 p-s32">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.16]">
                    <Icon name={rule.icon} size={16} />
                  </span>
                  <h2 className="mt-s16 font-display text-f18 font-bold leading-[1.4] text-white">{rule.title}</h2>
                  <p className="mt-s8 font-body text-f14 leading-[1.643] text-white/60">{rule.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-s40 rounded-r32 border border-white/[0.08] bg-ink p-s40">
              <h2 className="font-display text-f20 font-bold leading-[1.4] text-white">Questions about the waiver</h2>
              <p className="mt-s12 font-body text-f14 leading-[1.643] text-white/60">
                Email{' '}
                <a href={EMAIL_HREF} className="text-orange transition-colors hover:text-orange-300">
                  {EMAIL}
                </a>{' '}
                before you book and we’ll answer it. These terms may be updated; the version you accept at booking is
                the one that applies to that visit.
              </p>

              <Link
                href={BOOKING.href}
                className="mt-s30 inline-flex items-center gap-s8 rounded-pill bg-cta px-6 py-s16 font-body text-f16 font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
              >
                {BOOKING.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
