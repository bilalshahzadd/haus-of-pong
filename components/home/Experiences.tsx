import Reveal from '../Reveal'
import { Eyebrow, Icon } from '../ui'

/**
 * Experiences (node 2112:339) — pad 140/200, wash 180deg #101010 -> #130c02,
 * heading block then a 60px gap to a 3-up grid (1520 wide, 16px gutters).
 * Card 496x302: r32, fill #050505, 1px #ffffff14, pad 40, with a
 * RADIAL #ff6a1f22 -> transparent bloom laid over it.
 * Title Space Grotesk 700 / 29.8 / lh 36 / ls -0.6. Copy Manrope 400 / 14 / lh 23.
 * Footer row sits 32px below the copy: counter on the left, 16px arrow on the right.
 */

const CARDS = [
  {
    icon: 'exp-casual-play',
    title: 'Casual Play',
    // Was "Walk-ins welcome. Grab a paddle, grab a drink." — the room is
    // reservation-only and unstaffed, so both halves of that were wrong.
    copy: 'Book a table, let yourself in, and play. Paddles and balls are waiting.',
  },
  {
    icon: 'exp-corporate-events',
    title: 'Corporate Events',
    copy: 'Offsites and team-builders with a competitive edge.',
  },
  {
    icon: 'exp-birthday',
    title: 'Birthday Parties',
    // Was "Private booths, bottles and bragging rights." — there are no booths
    // and no bottle service here.
    copy: 'Reserve the room, bring the group, and keep the replays.',
  },
  {
    icon: 'exp-date-night',
    title: 'Date Night',
    copy: 'Serve up love, laughter, and a little friendly competition.',
  },
  { icon: 'exp-friends-night', title: 'Friends Night Out', copy: 'The best-dressed rally in the city — at any hour.' },
  { icon: 'exp-league-nights', title: 'League Nights', copy: 'Weekly ladders with prizes and permanent glory.' },
]

export default function Experiences() {
  return (
    <section id="experiences" className="relative bg-wash-dim">
      <div className="hairline" />
      <div className="shell section-y">
        <div className="flex flex-col gap-s24">
          <Reveal>
            <Eyebrow>Experiences / 02</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h-display max-w-[626px]">
              Every night is a
              <br />
              different <span className="text-orange">occasion</span>.
            </h2>
          </Reveal>
        </div>

        <div className="mt-s60 grid gap-s16 md:grid-cols-2 xl:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={0.06 * i}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-r32 border border-white/[0.08] bg-ink p-s40">
                <span className="pointer-events-none absolute inset-0 bg-exp-bloom transition-opacity duration-500 group-hover:opacity-150" />

                <div className="relative">
                  <span className="icon-chip">
                    <Icon name={c.icon} size="42%" />
                  </span>

                  <h3 className="mt-s20 font-display text-f30 font-bold leading-[1.208] tracking-[-0.02em] text-white">
                    {c.title}
                  </h3>
                  <p className="mt-s12 max-w-[320px] font-body text-f14 leading-[1.643] text-white/60">{c.copy}</p>
                </div>

                <div className="relative mt-s32 flex items-center justify-between pt-s8">
                  <span className="font-body text-f12 uppercase leading-none tracking-[0.22em] text-white/40">
                    {String(i + 1).padStart(2, '0')} / 06
                  </span>
                  <svg viewBox="0 0 16 16" className="h-4 w-4 text-white/45" fill="none" aria-hidden>
                    <path d="M4.5 11.5 11.5 4.5" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" />
                    <path
                      d="M6 4.5h5.5V10"
                      stroke="currentColor"
                      strokeWidth="1.333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
