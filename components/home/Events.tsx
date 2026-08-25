import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../Reveal'
import { Eyebrow, GhostButton, Icon } from '../ui'
import { EVENTS_BOOKING_HREF, EVENTS_EMAIL, TABLE_COUNT } from '@/lib/site'

/**
 * Private & corporate events.
 *
 * Groups were the one audience with no route of their own — they had to guess
 * that the general contact form was the way in. This gives them a direct CTA
 * that arrives pre-tagged as an events enquiry, so it sorts on the way in.
 */

const FORMATS = [
  {
    icon: 'exp-corporate-events',
    title: 'Corporate & Team Building',
    copy: 'Offsites, client nights and team-builders with a competitive edge — and no bar tab to babysit.',
  },
  {
    icon: 'exp-birthday',
    title: 'Birthdays & Celebrations',
    copy: 'Take the room for the night. Bragging rights included, replays to prove it.',
  },
  {
    icon: 'exp-league-nights',
    title: 'Leagues & Tournaments',
    copy: `Run a bracket across all ${TABLE_COUNT} tables, or join a ladder we’re already running.`,
  },
]

export default function Events() {
  return (
    <section id="events" className="relative overflow-hidden bg-wash-up">
      <div className="hairline" />

      <div className="shell section-y relative">
        <div className="relative overflow-hidden rounded-r32 border border-white/[0.08] bg-ink-600">
          {/* The room itself, not a group photo — the gallery already runs the
              huddle shot, and repeating a photograph on one page is exactly the
              thing the client called out. This also suits "take the whole
              Haus" better: it shows the space you'd be booking. */}
          <Image
            src="/images/about-interior.png"
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 1520px) 100vw, 1520px"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.85)_0%,rgba(5,5,5,0.95)_100%)]" />

          <div className="relative p-s50">
            <div className="flex flex-col gap-s24">
              <Reveal>
                <Eyebrow>Private Events / 07</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="h-display max-w-[760px]">
                  Take the whole
                  <br />
                  <span className="text-orange">Haus</span>.
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="body-lg max-w-[600px] pt-s8">
                  All {TABLE_COUNT} tables, the lounge and the room to yourselves — for birthdays, corporate
                  offsites, team-building and private groups. Tell us the date and the headcount and we’ll take it
                  from there.
                </p>
              </Reveal>
            </div>

            <div className="mt-s50 grid gap-s16 md:grid-cols-3">
              {FORMATS.map((f, i) => (
                <Reveal key={f.title} delay={0.08 * i}>
                  <article className="h-full rounded-r24 border border-white/[0.08] bg-ink/70 p-s32 backdrop-blur-[8px]">
                    <span className="icon-chip">
                      <Icon name={f.icon} size="46%" />
                    </span>
                    <h3 className="mt-s16 font-display text-f18 font-bold leading-[1.4] text-white">{f.title}</h3>
                    <p className="mt-s8 font-body text-f14 leading-[1.643] text-white/60">{f.copy}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.32}>
              <div className="mt-s50 flex flex-wrap items-center gap-s24">
                <Link
                  href={EVENTS_BOOKING_HREF}
                  className="group inline-flex items-center gap-s8 rounded-pill bg-cta px-[1.4583vw] py-s16 font-body text-f16 font-semibold leading-[1.25] text-white transition-transform duration-300 hover:scale-[1.03] max-xl:px-6"
                >
                  Enquire about an event
                  <svg viewBox="0 0 16 16" className="h-[1em] w-[1em]" fill="none" aria-hidden>
                    <path d="M4.5 11.5 11.5 4.5" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" />
                    <path
                      d="M6 4.5h5.5V10"
                      stroke="currentColor"
                      strokeWidth="1.333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                <GhostButton href={`mailto:${EVENTS_EMAIL}?subject=Private%20event%20enquiry`}>
                  Email the events team
                </GhostButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
