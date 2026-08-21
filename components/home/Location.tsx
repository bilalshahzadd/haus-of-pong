import Image from 'next/image'
import Reveal from '../Reveal'
import { BookButton, Eyebrow, GhostButton, Icon, StatusPill } from '../ui'
import { ADDRESS, ARRIVAL, DIRECTIONS_URL, HOURS } from '@/lib/site'

/**
 * Location (node 2103:1110) — pad 140/200, gap 50, wash 180deg #332001 -> #070707.
 *
 * Singular: there is one lounge, and "Locations" implied a picker. The section
 * now also has to do the job a host would otherwise do — telling a first-time
 * visitor which building, where to park and which door to walk through — since
 * there is nobody inside to ask.
 */

export default function Location() {
  return (
    <section id="location" className="relative bg-wash-up">
      <div className="hairline" />
      <div className="shell section-y">
        <div className="flex flex-col gap-s16">
          <Reveal>
            <Eyebrow>Location / 06</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="h-display max-w-[803px]">
              Find us in <span className="text-orange">Downtown OKC</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="body-lg max-w-[600px] pt-s8">
              One lounge, inside the Aloft Hotel, open around the clock. Reserve a table online and your access
              instructions do the rest.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.24}>
          <div className="relative mt-s50 aspect-[1520/853] w-full overflow-hidden rounded-r24 border border-white/[0.05] bg-ink-500 max-md:aspect-[3/4]">
            <Image
              src="/images/location-lounge.png"
              alt="Haus of Pong lounge, Downtown OKC"
              fill
              sizes="(max-width: 1520px) 100vw, 1520px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.1)_0%,rgba(5,5,5,0.45)_100%)]" />

            <span className="absolute right-[3.36%] top-[6.4%] rounded-pill bg-orange-300 px-s16 py-[3px] font-body text-f12 uppercase leading-[1.4] tracking-[0.02em] text-orange-deep xl:text-[20px]">
              Open 24/7
            </span>

            {/* 928/1520 = 61.05% wide, centred, 34.3% down */}
            <div className="absolute left-1/2 top-[30%] w-[61.05%] -translate-x-1/2 rounded-r12 border border-white/[0.1] bg-[#111111cc] px-s40 py-s24 backdrop-blur-[20px] max-md:w-[86%]">
              <div className="flex flex-col gap-s16">
                <StatusPill />
                {/* Montserrat 500 / 48 / lh 42 */}
                <h3 className="font-title text-f48 font-medium leading-[0.875] text-white">
                  Haus of Pong — Downtown OKC
                </h3>
              </div>

              <div className="mt-s30 flex items-center gap-s20 border-t border-white/[0.08] pt-s24">
                <span className="grid aspect-square w-[4.74%] min-w-[36px] max-w-[44px] shrink-0 place-items-center rounded-full border border-white/[0.16]">
                  <Icon name="contact-visit" size="40%" />
                </span>
                <p className="font-body text-f16 leading-[1.45] text-white/80">
                  {ADDRESS.building} · {ADDRESS.street} {ADDRESS.suite}
                  <br />
                  {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip} · {HOURS}
                </p>
              </div>

              <div className="mt-s30 flex flex-wrap gap-s16">
                <BookButton />
                <GhostButton href={DIRECTIONS_URL}>Get Directions</GhostButton>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Arrival guide — the lounge is unstaffed, so "which door?" has to be
            answered here rather than by someone at a desk. */}
        <div className="mt-s24 grid gap-s16 md:grid-cols-3">
          {ARRIVAL.map((a, i) => (
            <Reveal key={a.title} delay={0.08 * i}>
              <article className="h-full rounded-r24 border border-white/[0.08] bg-ink-600 p-s32">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.16]">
                  <Icon name={a.icon} size={16} />
                </span>
                <h3 className="mt-s16 font-display text-f18 font-bold leading-[1.4] text-white">{a.title}</h3>
                <p className="mt-s8 font-body text-f14 leading-[1.643] text-white/60">{a.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
