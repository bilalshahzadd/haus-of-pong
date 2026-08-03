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
  { icon: 'about-automated-entry', title: 'Automated Entry' },
  { icon: 'about-vending', title: 'Vending and Merchandise' },
  { icon: 'about-lounge-seating', title: 'Lounge Seating' },
  { icon: 'about-online-reservations', title: 'Online Reservations' },
  { icon: 'about-league-play', title: 'League Play' },
  { icon: 'about-corporate-events', title: 'Corporate Events' },
  { icon: 'about-private-bookings', title: 'Private Bookings' },
  { icon: 'about-date-night', title: 'Open Play And Date Night' },
  { icon: 'about-video-highlights', title: 'Video Highlights Or Replays' },
]

const BLURB = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'

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
                The Home of
                <br />
                Competitive
                <br />
                <span className="text-violet">Social Play.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="body-lg max-w-[541px] pt-s8">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry&apos;s standard dummy text ever since 1966, when designers at Letraset and James
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="relative mt-s16 aspect-[596/420] w-full overflow-hidden rounded-r32">
                <Image
                  src="/images/about-interior.png"
                  alt="Haus of Pong interior with neon-lit tables"
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
                  <p className="mt-s8 font-body text-f14 leading-[1.643] text-white/60">{BLURB}</p>
                </article>
              </Reveal>
            ))}

            {/* Card 10 — the store-badge tile that closes the grid */}
            <Reveal delay={0.4}>
              <article className={`${CARD} flex flex-col justify-center gap-s32`}>
                <h3 className="font-display text-f20 font-bold leading-[1.4] text-white">
                  Check Out For More Information...
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
