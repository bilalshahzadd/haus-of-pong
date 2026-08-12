import Image from 'next/image'
import Reveal from '../Reveal'
import { Eyebrow, Icon } from '../ui'

/**
 * About (node 2212:410) — pad 140/200, gap 60, wash 180deg #101010 -> #332001.
 * Inner grid 1520 wide, 64px gap: copy column 596, card column 860.
 * Cards 422x200 in a 2-up grid with a 16px gutter; r32, #161616, 1px #ffffff14,
 * pad 16/31.67, 48x48 gradient chip (r24, 1px #ffffff29).
 */

const FEATURES = [
  {
    icon: 'about-automated-entry',
    title: 'Automated Entry',
    copy: 'Skip the front desk — your code unlocks the door and your table.',
  },
  {
    icon: 'about-lounge-seating',
    title: 'Lounge Seating',
    copy: 'Comfortable seating for your group, courtside to every table.',
  },
  {
    icon: 'about-league-play',
    title: 'League Play',
    copy: 'Weekly ladders with real stakes, for regulars and first-timers alike.',
  },
  {
    icon: 'about-corporate-events',
    title: 'Corporate Events',
    copy: 'Offsites and team-builders with a competitive edge.',
  },
  {
    icon: 'about-private-bookings',
    title: 'Private Bookings',
    copy: 'Reserve the whole room for a birthday, a launch, or a night out.',
  },
  {
    icon: 'about-date-night',
    title: 'Date Night',
    copy: 'Serve up love, laughter, and a little friendly competition.',
  },
]

const CARD =
  'relative h-full overflow-hidden rounded-r32 border border-white/[0.08] bg-ink-600 px-[7.5%] py-s16'

export default function About() {
  return (
    <section id="about" className="relative bg-wash-about">
      <div className="hairline" />
      <div className="shell section-y">
        <div className="grid gap-s64 xl:grid-cols-[596fr_860fr]">
          {/* Copy column — V gap 24 */}
          <div className="flex flex-col gap-s24">
            <Reveal>
              <Eyebrow>About / 01</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="h-display">
                The home of competitive
                <br />
                <span className="text-violet">social play.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="body-lg max-w-[541px] pt-s8">
                Tournament-grade tables, a members-grade room, and a door that unlocks with your phone. This is
                ping pong built for a night out — not a rec room.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              {/* The source photo is portrait (768x1024). The old 596:420 landscape
                  box forced a heavy crop that read as zoomed way into her face —
                  this box is close to the photo's own ratio so it shows almost
                  the whole frame instead. */}
              <div className="relative mt-s16 aspect-[4/5] w-full overflow-hidden rounded-r32">
                <Image
                  src="/images/community-tableside.jpg"
                  alt="A player resting by the net, paddle in hand, at Haus of Pong"
                  fill
                  sizes="(max-width: 1280px) 100vw, 596px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Card column — 2 columns, 16px gutters, 422x200 tiles */}
          <div className="grid gap-s16 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={0.04 * i}>
                <article className={`${CARD} group transition-colors duration-300 hover:border-white/20`}>
                  {/* 160px blur that sits off the card's top-right corner */}
                  <span className="pointer-events-none absolute -right-[18%] -top-[32%] aspect-square w-[38%] rounded-full bg-orange/[0.13] opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="icon-chip">
                    <Icon name={f.icon} size="46%" />
                  </span>
                  <h3 className="mt-s16 font-display text-f20 font-bold leading-[1.4] text-white">{f.title}</h3>
                  <p className="mt-s8 font-body text-f14 leading-[1.643] text-white/60">{f.copy}</p>
                </article>
              </Reveal>
            ))}

            {/* Card 10 — the store-badge tile that closes the grid */}
            <Reveal delay={0.4}>
              <article className={`${CARD} flex flex-col justify-center gap-s32`}>
                <h3 className="font-display text-f20 font-bold leading-[1.4] text-white">
                  Book faster with the app.
                </h3>
                <div className="flex flex-wrap items-center gap-s16">
                  <a
                    href="#app"
                    className="inline-flex items-center gap-2 rounded-pill bg-white px-4 py-2 font-body text-f12 font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
                  >
                    <Icon name="brand-apple" size={14} /> App Store
                  </a>
                  <a
                    href="#app"
                    className="inline-flex items-center gap-2 rounded-pill bg-white px-4 py-2 font-body text-f12 font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
                  >
                    <Icon name="brand-playstore" size={14} /> Google Play
                  </a>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
