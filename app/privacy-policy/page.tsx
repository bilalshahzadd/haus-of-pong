import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { DELETION_HREF, EMAIL, EMAIL_HREF } from '@/lib/site'

/**
 * Privacy Policy (node 2177:923) — pad 250/200/250, wash 180deg #332001 -> #070707.
 * Body is a single centred column 1337 wide set in Manrope 500 / 28 / lh 33 / #ffffff99.
 */

export const metadata: Metadata = {
  title: 'Privacy Policy — Haus of Pong',
  description: 'How Haus of Pong handles your information.',
}

const COPY = [
  `Haus of Pong collects only what's needed to run your reservation: your name and email when you book a table, join the VIP list, or send us a message. We use this information to confirm bookings, send your access instructions, and reach you about your visit — nothing else.`,
  `We don't sell your information. It's shared only with the tools that keep the lounge running, like our booking and CRM systems, and only as far as needed to serve you.`,
  `Our site uses essential cookies to keep the booking flow working, and analytics cookies to understand how the site is used. You can control cookies through your browser at any time.`,
  `The lounge is under video surveillance for security, and select gameplay is captured so guests can save and share replays. Footage is tied to the reservation it belongs to and is kept only as long as it is needed for security and for making your clips available.`,
  `You can ask us to delete your account and the data we hold about you — including any recorded footage — at any time, and we'll take care of it.`,
]

export default function PrivacyPolicyPage() {
  return (
    <div className="relative bg-wash-up">
      <div className="hairline" />

      <PageHero title="Privacy Policy" />

      <div className="shell pb-s250 pt-s50">
        <Reveal>
          <div className="mx-auto flex max-w-[720px] flex-col gap-s24 font-body text-f16 leading-[1.7] text-white/60">
            {COPY.map((paragraph) => (
              <p key={paragraph.slice(0, 20)}>{paragraph}</p>
            ))}
          </div>

          {/* Deletion gets its own block with a real route. App stores require a
              published way to delete an account, and this is the page people
              come to looking for it. */}
          <div className="mx-auto mt-s40 max-w-[720px] rounded-r24 border border-white/[0.08] bg-ink-600 p-s32">
            <h2 className="font-display text-f20 font-bold leading-[1.4] text-white">
              Delete your account or data
            </h2>
            <p className="mt-s12 font-body text-f16 leading-[1.7] text-white/60">
              Send the request and we’ll confirm once it’s done. You can also email{' '}
              <a href={EMAIL_HREF} className="text-orange underline-offset-4 hover:underline">
                {EMAIL}
              </a>
              .
            </p>
            <Link
              href={DELETION_HREF}
              className="mt-s24 inline-flex items-center gap-s8 rounded-pill bg-cta px-6 py-s16 font-body text-f16 font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              Request account / data deletion
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
