import Image from 'next/image'
import Reveal from '../Reveal'
import { BookButton, Eyebrow, Icon } from '../ui'

/**
 * Replays & game clips.
 *
 * Promoted to a full section because it is the feature that separates the room
 * from a table in a bar, and because the client's note was that customers
 * currently have no idea it exists or how to get their footage. So the section
 * is built around the three questions a guest actually asks: what is captured,
 * how do I get it, and what can I do with it.
 */

const FLOW = [
  {
    icon: 'icon-replay',
    step: '01',
    title: 'It records while you play',
    copy: 'Select gameplay is captured at the table through your session — nothing to set up, nothing to press.',
  },
  {
    icon: 'about-video-highlights',
    step: '02',
    title: 'Your clips are tied to your booking',
    copy: 'Footage is matched to the reservation it belongs to, so what you get back is your session and nobody else’s.',
  },
  {
    icon: 'icon-share',
    step: '03',
    title: 'Save it, send it, post it',
    copy: 'Download the point you want and share it straight to Instagram, TikTok or your group chat.',
  },
]

export default function Replays() {
  return (
    <section id="replays" className="relative overflow-hidden bg-wash-dim">
      <div className="hairline" />
      <div className="pointer-events-none absolute right-[-12%] top-[-14%] aspect-square w-[26%] rounded-full bg-violet/[0.16] blur-[140px]" />

      <div className="shell section-y relative">
        <div className="grid items-center gap-s64 xl:grid-cols-[1fr_1fr]">
          {/* Copy column */}
          <div className="flex flex-col gap-s24">
            <Reveal>
              <Eyebrow>Replays / 03</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="h-display max-w-[640px]">
                That point you just won?
                <br />
                <span className="text-orange">We got it.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="body-lg max-w-[560px] pt-s8">
                Every table is set up to capture play, so the rally nobody would have believed is one you can
                actually show them. No camera to bring, no one to ask.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-s16 flex flex-col gap-s16">
                {FLOW.map((f) => (
                  <div
                    key={f.step}
                    className="group flex items-start gap-s20 rounded-r24 border border-white/[0.08] bg-ink-600 p-s24 transition-colors duration-300 hover:border-white/20"
                  >
                    <span className="icon-chip shrink-0">
                      <Icon name={f.icon} size="46%" />
                    </span>
                    <div>
                      <div className="flex items-center gap-s12">
                        <span className="font-body text-f12 uppercase leading-none tracking-[0.22em] text-white/40">
                          {f.step}
                        </span>
                        <h3 className="font-display text-f18 font-bold leading-[1.4] text-white">{f.title}</h3>
                      </div>
                      <p className="mt-s8 font-body text-f14 leading-[1.643] text-white/60">{f.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="pt-s16">
                <BookButton />
              </div>
            </Reveal>
          </div>

          {/* Visual column */}
          <Reveal delay={0.2}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-r32 border border-white/[0.08]">
              <Image
                src="/images/community-ball-eyes.jpg"
                alt="A player at Haus of Pong mid-rally"
                fill
                sizes="(max-width: 1280px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.1)_0%,rgba(5,5,5,0.75)_100%)]" />

              {/* A recording indicator rather than a fake play button — it
                  describes what the room is doing, not a video that isn't here. */}
              <span className="absolute left-s24 top-s24 inline-flex items-center gap-s8 rounded-pill border border-white/[0.16] bg-[#05050599] px-s16 py-s8 backdrop-blur-[12px]">
                <span className="h-[6px] w-[6px] shrink-0 animate-pulse rounded-full bg-[#ff4d4d]" />
                <span className="font-body text-f12 uppercase leading-none tracking-[0.22em] text-white">
                  Capturing
                </span>
              </span>

              <div className="absolute inset-x-s24 bottom-s24">
                <p className="font-display text-f20 font-bold leading-[1.3] text-white">
                  Match point, Table 3.
                </p>
                <p className="mt-s8 font-body text-f14 leading-[1.5] text-white/70">
                  Saved to your session and ready to share.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
