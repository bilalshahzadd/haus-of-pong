import Image from 'next/image'
import Reveal from '../Reveal'
import { Eyebrow, Icon } from '../ui'

/**
 * App (node 2103:1271) — 1920x846, fill #101010, content 1520 wide, H gap 64.
 * Left column 1030: eyebrow (Manrope 400/12/ls 3.36), Space Grotesk 400/64/lh 71/ls -2.16,
 * copy Manrope 400/16/lh 26 capped at 448, then a 512-wide 2x2 perk grid (12px gutters,
 * items 250x49, r24, #050505, 1px #ffffff14, 24px #ff6a1f26 check chip).
 * Store row: Apple 202x61 and Play 162x61 on white r999 pills, then a 176x62
 * QR panel (#05050580, 1px #ffffff29, blur 12). Phones 221x461 and 308x461, r48.
 */

const PERKS = ['Book tables in seconds', 'Join events & leagues', 'Manage reservations', 'Exclusive member offers']

export default function AppSection() {
  return (
    <section id="app" className="relative overflow-hidden bg-ink-800">
      <div className="hairline" />

      {/* Overlay+Blur 512 #ff6a1f26 */}
      <div className="pointer-events-none absolute left-[-14.4%] top-[-20%] aspect-square w-[26.7%] rounded-full bg-[#ff6a1f]/[0.15] blur-[140px]" />

      <div className="shell section-y relative">
        <div className="flex items-center gap-s64 max-xl:flex-col max-xl:items-start">
          <div className="flex w-full flex-col gap-s22 xl:w-[67.8%]">
            <Reveal>
              {/* 12px here, not the usual 16 */}
              <p className="font-body text-f12 uppercase leading-[1.33] tracking-[0.28em] text-orange">App / 06</p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="max-w-[667px] font-display text-f64 font-normal leading-[1.11] tracking-[-0.0338em] text-white">
                Book your table
                <br />
                through our <span className="text-orange">app</span>.
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="max-w-[448px] pt-s8 font-body text-f16 leading-[1.625] text-white/60">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry&apos;s standard dummy text ever since 1966s
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="grid max-w-[512px] gap-s12 pt-s16 sm:grid-cols-2">
                {PERKS.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-s12 rounded-r24 border border-white/[0.08] bg-ink px-s16 py-s12"
                  >
                    <span className="grid aspect-square w-[24px] shrink-0 place-items-center rounded-full bg-[#ff6a1f]/[0.15]">
                      <Icon name="icon-check" size={12} />
                    </span>
                    <span className="font-body text-f14 leading-[1.43] text-white">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="flex flex-wrap items-center gap-s12 py-s20">
                <a
                  href="#"
                  className="inline-flex items-center gap-s12 rounded-pill bg-white px-s24 py-[0.7292vw] text-ink transition-transform duration-300 hover:scale-[1.03] max-xl:py-3.5"
                >
                  <Icon name="brand-apple" size={21} className="h-[1.35em] w-auto" />
                  <span className="leading-tight">
                    <span className="block font-body text-f10 uppercase tracking-[0.08em] text-ink/60">
                      Download on the
                    </span>
                    <span className="block font-display text-f16 font-bold">App Store</span>
                  </span>
                </a>

                <a
                  href="#"
                  className="inline-flex items-center gap-s12 rounded-pill bg-white px-s24 py-[0.7292vw] text-ink transition-transform duration-300 hover:scale-[1.03] max-xl:py-3.5"
                >
                  <Icon name="brand-playstore" size={24} className="h-[1.35em] w-auto" />
                  <span className="leading-tight">
                    <span className="block font-body text-f10 uppercase tracking-[0.08em] text-ink/60">Get it on</span>
                    <span className="block font-display text-f16 font-bold">Google Play</span>
                  </span>
                </a>

                <div className="inline-flex items-center gap-s12 rounded-pill border border-white/[0.16] bg-[#05050580] px-s20 py-[0.7292vw] backdrop-blur-[12px] max-xl:py-3.5">
                  <Icon name="icon-qr" size={32} className="h-[1.7em] w-auto" />
                  <span className="leading-tight">
                    <span className="block font-body text-f10 uppercase tracking-[0.08em] text-white/50">Scan to</span>
                    <span className="block font-display text-f16 font-bold text-white">Download</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Phone pair — 490x492 group, second phone offset 182/32 at 80% opacity */}
          <Reveal delay={0.2}>
            <div className="relative mx-auto aspect-[490/492] w-full max-w-[490px] xl:w-[32.2%]">
              <div className="absolute left-0 top-0 w-[45.1%] overflow-hidden rounded-r48 border-[6px] border-black bg-black shadow-[0_30px_50px_-18px_rgba(0,0,0,0.9)]">
                <Image
                  src="/images/app-phone-1.png"
                  alt="Haus of Pong app booking screen"
                  width={205}
                  height={445}
                  className="h-auto w-full"
                />
              </div>
              <div className="absolute left-[37.1%] top-[6.5%] w-[62.9%] overflow-hidden rounded-r48 border-[6px] border-black bg-black opacity-80 shadow-[0_30px_50px_-18px_rgba(0,0,0,0.9)]">
                <Image
                  src="/images/app-phone-2.png"
                  alt="Haus of Pong app menu screen"
                  width={288}
                  height={441}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
