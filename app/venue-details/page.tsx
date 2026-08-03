import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { Icon } from '@/components/ui'

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
  description: 'Find a Pod near you. Address, hours and amenities for the Haus of Pong lounge.',
}

const AMENITIES = [
  '2 table open pod',
  'Paddles and balls',
  'Video replays',
  'Beverages and light snacks',
  'Water fountain',
  'WiFi',
]

const cardClass =
  'rounded-[30px] border border-white/[0.08] bg-[linear-gradient(90deg,#050505_0%,#332001_100%)] p-s50'
const serifHead =
  'font-serif text-f48 font-normal leading-[1.333] tracking-[-0.04em] text-white'

export default function VenueDetailsPage() {
  return (
    <div className="relative bg-wash-up">
      <div className="hairline" />

      <PageHero title="Venue Details" subtitle="Find a Pod near you! If there isn’t one available, let us know." />

      <div className="shell relative pb-s140 pt-s50">
        {/* 1520x829 photograph, r30 */}
        <Reveal>
          <div className="relative aspect-[1520/829] w-full overflow-hidden rounded-[30px] max-md:aspect-[4/3]">
            <Image
              src="/images/venue-hero.png"
              alt="Table tennis hall at Haus of Pong"
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
                <h2 className={serifHead}>Down Town Brooklyn</h2>

                <p className="mt-s30 font-body text-f18 leading-[1.611] text-white/60">
                  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry&apos;s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the
                  librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to
                  make dummy text for Letraset&apos;s Body Type sheets. It has survived not only many decades, but also
                  the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to
                  these sheets and more recently with desktop publishing software like
                </p>

                <h3 className={`${serifHead} mt-s40`}>Venue</h3>
                <div className="mt-s20 flex items-center gap-s20 border-t border-white/[0.08] pt-s24">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.16]">
                    <Icon name="contact-visit" size={16} />
                  </span>
                  <p className="font-display text-f18 leading-[1.556] text-white">
                    221 Underground Ave New York, NY 10013
                  </p>
                </div>

                <h3 className={`${serifHead} mt-s40`}>Hours</h3>
                <div className="mt-s20 flex items-start gap-s20 border-t border-white/[0.08] pt-s24">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.16]">
                    <Icon name="contact-hours" size={16} />
                  </span>
                  <p className="font-display text-f18 leading-[1.556] text-white">
                    Mon — Thu · 5pm — 1am
                    <br />
                    Fri — Sat · 5pm — 3am
                    <br />
                    Sun · 3pm — 12am
                  </p>
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
              </section>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex justify-center pt-s40">
                <Link
                  href="/contact"
                  className="inline-flex w-full max-w-[693px] items-center justify-center rounded-pill bg-cta py-s16 font-body text-f18 font-semibold text-[#301e01] transition-transform duration-300 hover:scale-[1.02]"
                >
                  Book Now
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}
