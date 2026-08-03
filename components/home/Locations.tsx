import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../Reveal'
import { Eyebrow, Icon, StatusPill } from '../ui'

/**
 * Locations (node 2103:1110) — pad 140/200, gap 50, wash 180deg #332001 -> #070707.
 * Heading column 803 wide, V gap 16. Card 1520x853, r24, #201f1f, 1px #ffffff0d.
 * "OPEN NOW" pill 157x40 r999 #ff9d00 with #663c00 label, inset 51 right / 55 top.
 * Detail panel 928x516 centred, 34.3% down: r12, #111111cc, 1px #ffffff1a,
 * backdrop blur 20, pad 24/40, V gap 30. Title Montserrat 500 / 48 / lh 42.
 * CTA 774x70 r999 #0505054d with a gradient border, label Plus Jakarta Sans 700 / 20.
 */

export default function Locations() {
  return (
    <section id="locations" className="relative bg-wash-up">
      <div className="hairline" />
      <div className="shell section-y">
        <div className="flex flex-col gap-s16">
          <Reveal>
            <Eyebrow>Location / 04</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            {/* Figma sets this one in Playfair Display; matched to the other
                section headings (Space Grotesk) for consistency. */}
            <h2 className="h-display max-w-[803px]">
              Find a <span className="text-orange">Haus of Pong</span>
              <br />
              Near You
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="body-lg max-w-[541px] pt-s8">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever since 1966, when designers at Letraset and James
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
              Open Now
            </span>

            {/* 928/1520 = 61.05% wide, centred, 34.3% down */}
            <div className="absolute left-1/2 top-[34.3%] w-[61.05%] -translate-x-1/2 rounded-r12 border border-white/[0.1] bg-[#111111cc] px-s40 py-s24 backdrop-blur-[20px] max-md:w-[86%]">
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
                  209 N. Walnut Ave. Suite 102 Oklahoma City, OK 73104
                </p>
              </div>

              <Link
                href="/venue-details"
                className="group relative mt-s30 flex w-full items-center justify-center gap-s16 rounded-pill bg-[#0505054d] py-s16 font-jakarta text-f20 font-bold text-white backdrop-blur-[12px]"
              >
                <span className="pointer-events-none absolute inset-0 rounded-pill p-px [background:linear-gradient(90deg,rgba(167,74,229,0.7),rgba(255,157,0,0.6))] [mask-composite:exclude] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]" />
                Explore Location
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
