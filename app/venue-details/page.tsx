import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { GhostButton, Icon } from '@/components/ui'
import { ADDRESS, AMENITIES, ARRIVAL, BOOKING, DIRECTIONS_URL, HOURS, TABLE_COUNT, WAIVER } from '@/lib/site'

/**
 * Venue details (node 2167:570) — pad 250/200/200, wash 180deg #332001 -> #070707.
 * Body group 1520x2314: a 1520x829 r30 photograph, then a 1406x1745 r50 #12100d
 * panel that starts 569px down so it overlaps the image by 260.
 * Inside, two 1175-wide r30 cards (wash 90deg #050505 -> #332001, 1px #ffffff14,
 * pad 50, V gap 30) with a 40px gap, then a 693x60 gradient "Book Now" pill
 * whose label is Manrope 600 / 18 / #301e01.
 * Headings are Playfair Display 400 / 48 / lh 64 / ls -1.92.
 */

export const metadata: Metadata = {
  title: 'Venue Details — Haus of Pong',
  description:
    'Address, parking, entrance, hours and amenities for Haus of Pong — Oklahoma City’s first fully automated ping pong lounge.',
}

const cardClass =
  'rounded-[30px] border border-white/[0.08] bg-[linear-gradient(90deg,#050505_0%,#332001_100%)] p-s50'
const serifHead =
  'font-serif text-f48 font-normal leading-[1.333] tracking-[-0.04em] text-white'

export default function VenueDetailsPage() {
  return (
    <div className="relative bg-wash-up">
      <div className="hairline" />

      <PageHero
        title="Venue Details"
        subtitle="Everything you need to find us, get in, and play — parking, entrance, hours and what's in the room."
      />

      <div className="shell relative pb-s140 pt-s50">
        {/* 1520x829 photograph, r30 */}
        <Reveal>
          <div className="relative aspect-[1520/829] w-full overflow-hidden rounded-[30px] max-md:aspect-[4/3]">
            <Image
              src="/images/community-underground.jpg"
              alt="A player with a Haus of Pong paddle and ball in the underground lounge"
              fill
              priority
              sizes="(max-width: 1520px) 100vw, 1520px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* 1406-wide panel pulled up so it laps the photo by 260 */}
        <div className="relative z-10 mx-auto -mt-[17.1%] w-[92.5%] rounded-[50px] bg-[#12100d] px-[8.24%] pb-[5%] pt-[5.76%]">
          <div className="flex flex-col gap-s40">
            <Reveal delay={0.08}>
              <section className={cardClass}>
                <h2 className={serifHead}>Downtown Oklahoma City</h2>

                <p className="mt-s30 font-body text-f18 leading-[1.611] text-white/60">
                  {TABLE_COUNT} tournament-grade tables in the heart of Downtown OKC, inside the Aloft Hotel. The
                  lounge is fully automated and entirely self-serve — no staff, no front desk, and a door that
                  unlocks for you the moment your reservation starts.
                </p>

                <h3 className={`${serifHead} mt-s40`}>Venue</h3>
                <div className="mt-s20 flex items-center gap-s20 border-t border-white/[0.08] pt-s24">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.16]">
                    <Icon name="contact-visit" size={16} />
                  </span>
                  <p className="font-display text-f18 leading-[1.556] text-white">
                    {ADDRESS.building}
                    <br />
                    {ADDRESS.street} {ADDRESS.suite}, {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
                  </p>
                </div>

                <h3 className={`${serifHead} mt-s40`}>Hours</h3>
                <div className="mt-s20 flex items-start gap-s20 border-t border-white/[0.08] pt-s24">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.16]">
                    <Icon name="contact-hours" size={16} />
                  </span>
                  <p className="font-display text-f18 leading-[1.556] text-white">{HOURS}</p>
                </div>

                <h3 className={`${serifHead} mt-s40`}>Getting here</h3>
                <ul className="mt-s20 flex flex-col gap-s24 border-t border-white/[0.08] pt-s24">
                  {ARRIVAL.map((a) => (
                    <li key={a.title} className="flex items-start gap-s20">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.16]">
                        <Icon name={a.icon} size={16} />
                      </span>
                      <div>
                        <p className="font-display text-f18 leading-[1.4] text-white">{a.title}</p>
                        <p className="mt-s8 font-body text-f16 leading-[1.6] text-white/60">{a.copy}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-s30">
                  <GhostButton href={DIRECTIONS_URL}>Get Directions</GhostButton>
                </div>
              </section>
            </Reveal>

            <Reveal delay={0.16}>
              <section className={cardClass}>
                <h2 className={serifHead}>Amenities</h2>
                <ul className="mt-s30 flex flex-col gap-s20">
                  {AMENITIES.map((a) => (
                    <li key={a} className="flex items-center gap-s16 font-display text-f18 leading-[1.556] text-white">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                      {a}
                    </li>
                  ))}
                </ul>

                <h3 className={`${serifHead} mt-s40`}>Waiver</h3>
                <div className="mt-s20 flex items-start gap-s20 border-t border-white/[0.08] pt-s24">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.16]">
                    <Icon name="icon-waiver" size={16} />
                  </span>
                  <div>
                    <p className="font-body text-f16 leading-[1.6] text-white/60">{WAIVER.summary}</p>
                    <Link
                      href={WAIVER.href}
                      className="mt-s16 inline-block font-display text-f18 leading-[1.4] text-orange transition-colors hover:text-orange-300"
                    >
                      Read the waiver and facility rules →
                    </Link>
                  </div>
                </div>
              </section>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex justify-center pt-s40">
                <Link
                  href={BOOKING.href}
                  className="inline-flex w-full max-w-[693px] items-center justify-center rounded-pill bg-cta py-s16 font-body text-f18 font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                >
                  {BOOKING.label}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}
