import Reveal from '../Reveal'
import { BookButton, Eyebrow, GhostButton, Icon } from '../ui'
import { WAIVER } from '@/lib/site'

/**
 * How it works (node 2208:593) — pad 140/200, gap 60, wash 180deg #101010 -> #130c02.
 *
 * Heading block is ONE 434-wide left column (V gap 24): eyebrow, "How it works.",
 * then the uppercase paragraph — the source has no right-hand column here.
 *
 * Each item is a 665x415 group: a 130x130 ring centred exactly on the card's
 * top-left corner, and a 600x350 card offset by 65/65.
 *   card      r32, LINEAR 180deg #a74ae56b -> #ff9d0059
 *   ring      120px ellipse, 16px stroke, LINEAR 130deg #f49133 -> #ab4edb, hollow
 *   number    Montserrat 600 / 32 / lh 39 / #ffffffb0
 *   chip      108x108 r999, LINEAR 129deg #a74ae5 -> #ff9d00, 1px #ffffff29
 *   title     Space Grotesk 700 / 29.8 / lh 36
 *   copy      Manrope 400 / 20 / lh 23
 * Content starts 50 below the card top (81 left underneath), items 20 apart.
 * Grid gaps measured off the artboard: 169 across, 91 down.
 */

const STEPS = [
  {
    n: '01',
    icon: 'step-book-table',
    title: 'Book',
    copy: 'Choose your date, time and session length online. Takes about a minute.',
  },
  {
    n: '02',
    icon: 'step-access-code',
    title: 'Get Access',
    copy: 'Your access instructions arrive automatically as soon as the booking is confirmed.',
  },
  {
    n: '03',
    icon: 'step-unlock',
    title: 'Unlock',
    copy: 'Arrive at Suite 102 and let yourself in. No host, no check-in, no waiting.',
  },
  {
    n: '04',
    icon: 'step-serve',
    title: 'Play',
    copy: 'Head straight to your table. Paddles and balls are already there.',
  },
]

/**
 * Ellipse 2 — 120x120, strokeAlign INSIDE, strokeWeight 16, fill hidden.
 * INSIDE alignment means the band runs r 44..60, so in SVG that is r=52 with a
 * 16 stroke. Gradient handles come straight from the file: (0.117,0.198) ->
 * (0.904,0.85). Drawn as SVG rather than a CSS mask so it renders identically
 * in Safari, where `mask-composite` is unsupported and the ring fills solid.
 */
function Ring({ id }: { id: string }) {
  const gradientId = `stepRing-${id}`
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0.117" y1="0.198" x2="0.904" y2="0.85">
          <stop offset="0" stopColor="#f49133" />
          <stop offset="1" stopColor="#ab4edb" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="52" fill="none" stroke={`url(#${gradientId})`} strokeWidth="16" />
    </svg>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-wash-dim">
      <div className="hairline" />
      <div className="shell section-y">
        {/* Single 434-wide column, V gap 24 */}
        <div className="flex max-w-[560px] flex-col gap-s24">
          <Reveal>
            <Eyebrow>How it works / 04</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h-display">How it works.</h2>
          </Reveal>
          <Reveal delay={0.16}>
            {/* Manrope 400 / 16 / lh 33 / ls 3.36 / uppercase */}
            <p className="font-body text-f16 uppercase leading-[2.06] tracking-[0.21em] text-white">
              Book → Get Access → Unlock → Play. Four steps, start to finish, with nobody to wait on.
            </p>
          </Reveal>
        </div>

        <div className="mt-s60 grid gap-x-s169 gap-y-s91 md:grid-cols-2">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.08 * i}>
              {/* Capped narrower than the Figma 665px group — client asked for
                  smaller cards here specifically. The ring is sized in fixed px
                  (not %) and the card offset is exactly half that size, so the
                  ring is guaranteed to sit centred on the card's corner — with
                  a %-based offset it inherits the grid cell's width instead of
                  the ring's, and the two only overlapped by a sliver. */}
              <article className="relative max-w-[480px] pl-[36px] pt-[36px]">
                <div className="absolute left-0 top-0 z-10 grid h-[72px] w-[72px] place-items-center">
                  <Ring id={s.n} />
                  <span className="absolute font-title text-f20 font-semibold leading-none text-white/70">{s.n}</span>
                </div>

                <div className="flex flex-col items-center rounded-r24 bg-step pb-[9%] pt-[6.5%] text-center transition-transform duration-500 hover:-translate-y-1.5">
                  <span className="grid aspect-square w-[15%] place-items-center rounded-full border border-white/[0.16] bg-chip">
                    <Icon name={s.icon} size="37%" />
                  </span>

                  <div className="mt-[3.333%] flex flex-col items-center gap-[3.333%]">
                    <h3 className="max-w-[92%] py-s8 font-display text-f24 font-bold leading-[1.25] text-white">
                      {s.title}
                    </h3>
                    <p className="max-w-[72%] font-body text-f16 leading-[1.3] text-white/80">{s.copy}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Booking is the action this whole section exists to prompt, and the
            waiver is stated here rather than sprung on a guest at the door. */}
        <Reveal delay={0.3}>
          <div className="mt-s60 flex flex-col gap-s24 rounded-r32 border border-white/[0.08] bg-ink-600 p-s40 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-start gap-s20">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.16]">
                <Icon name="icon-waiver" size={16} />
              </span>
              <div>
                <h3 className="font-display text-f18 font-bold leading-[1.4] text-white">Before your first serve</h3>
                <p className="mt-s8 max-w-[560px] font-body text-f14 leading-[1.643] text-white/60">
                  {WAIVER.summary}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-s16">
              <BookButton />
              <GhostButton href={WAIVER.href}>Read the waiver</GhostButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
