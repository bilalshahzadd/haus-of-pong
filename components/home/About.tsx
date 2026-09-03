import Image from 'next/image'
import Reveal from '../Reveal'
import { Eyebrow, Icon, StoreBadge } from '../ui'
import { APP_LIVE, TABLE_COUNT } from '@/lib/site'

/**
 * About (node 2212:410) — pad 140/200, gap 60, wash 180deg #101010 -> #332001.
 * Inner grid 1520 wide, 64px gap: copy column 596, card column 860.
 * Cards 422x200 in a 2-up grid with a 16px gutter; r32, #161616, 1px #ffffff14.
 *
 * The feature set was re-cut around what "fully automated" actually means for a
 * guest — entry, replays, and booking all happening without a person involved —
 * because that is the promise the rest of the page rests on.
 */

const FEATURES = [
  {
    icon: 'about-automated-entry',
    title: 'Fully Automated Entry',
    copy: 'No staff, no front desk. Your booking unlocks the door at your reserved time.',
  },
  {
    icon: 'about-online-reservations',
    title: 'Self-Serve Booking',
    copy: 'Pick your date, time and session length online in under a minute.',
  },
  {
    icon: 'about-video-highlights',
    title: 'Replays & Game Clips',
    copy: 'Select gameplay is captured so you can save and share your best points.',
  },
  {
    icon: 'about-lounge-seating',
    title: 'Lounge Seating',
    copy: 'Comfortable seating for your group, courtside to every table.',
  },
  {
    icon: 'about-league-play',
    title: 'Leagues & Tournaments',
    copy: 'Ladders and events run through the year, for regulars and first-timers alike.',
  },
  {
    icon: 'about-corporate-events',
    title: 'Private & Corporate',
    copy: 'Birthdays, offsites and team-building, with the room to yourselves.',
  },
]

const CARD =
  'relative flex h-full flex-col overflow-hidden rounded-r32 border border-white/[0.08] bg-ink-600 px-[7.5%] py-s24'

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
                Oklahoma City’s first
                <br />
                <span className="text-violet">fully automated</span>
                <br />
                ping pong lounge.
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="body-lg max-w-[541px] pt-s8">
                {TABLE_COUNT} tournament-grade tables in Downtown OKC, running entirely on their own. There is no
                host to check in with and no closing time to beat — you book, the door opens for you, and the room
                is yours. Casual play, competition, date nights and groups, at any hour.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              {/* A square crop rather than the source photo's 3:4. The taller
                  box pushed this column well past the cards beside it, which is
                  what left the blank block of page on the right. */}
              <div className="relative mt-s16 aspect-square w-full overflow-hidden rounded-r32">
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

          {/* Card column.
              Two separate grids on purpose. The six feature tiles share one
              `auto-rows-fr` grid so every row is the height of the tallest and
              they all match exactly. The store tile is kept out of it: it spans
              both columns and is naturally taller, and while it sat inside the
              same grid its height propagated to every row, which is what left
              each feature card with a block of dead space under its text.

              The column fills the row height and the store tile takes the
              slack, so it finishes level with the photo column instead of
              stopping short. The slack lands in that one tile rather than
              being shared across the feature rows, which is what used to
              leave every card's text stranded at the top. */}
          <div className="flex flex-col gap-s16">
            <div className="grid auto-rows-fr gap-s16 sm:grid-cols-2">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={0.04 * i} className="h-full">
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
            </div>

            {/* Closing tile — the store badges. While the app is unreleased this
                states plainly that booking needs no download, so nobody stalls
                waiting for an app that isn't there yet. */}
            <Reveal delay={0.4} className="flex-1 xl:max-h-[320px]">
              <article className={`${CARD} h-full justify-center gap-s16`}>
                <h3 className="font-display text-f20 font-bold leading-[1.4] text-white">
                  {APP_LIVE ? 'Book faster with the app.' : 'No app required — book on the web.'}
                </h3>
                <p className="font-body text-f14 leading-[1.643] text-white/60">
                  {APP_LIVE
                    ? 'Reserve, get your access instructions and manage bookings from your phone.'
                    : 'Everything works from this site today. The Haus of Pong app is on the way.'}
                </p>
                <div className="flex flex-wrap items-center gap-s12">
                  <StoreBadge platform="ios" />
                  <StoreBadge platform="android" />
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
