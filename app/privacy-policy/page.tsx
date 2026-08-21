import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { EMAIL } from '@/lib/site'

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
  `If you'd like your information or your recorded footage updated or removed, email us at ${EMAIL} and we'll take care of it.`,
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
        </Reveal>
      </div>
    </div>
  )
}
