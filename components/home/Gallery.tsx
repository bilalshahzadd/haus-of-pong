import Image from 'next/image'
import Reveal from '../Reveal'
import { Eyebrow } from '../ui'

/**
 * Measured off the Figma "Gallery / 05" grid (node 2212:575, 1520x976).
 * It is a masonry of three independent columns, not a row-aligned grid:
 *
 *   col 1  x=0     w=429   Venue 429x640            -> gap 34 -> Events 429x300
 *   col 2  x=512   w=429   Players 429x300          -> gap 36 -> Ball 429x640
 *   col 3  x=1024  w=496   Vending 496x658 (single, does NOT run full height)
 *
 * Column gaps are 83px (5.46% of the 1520 shell); the third column is wider.
 * Every tile: radius 32, #161616 base, and a bottom-up scrim
 * (rgba(5,5,5,.8) -> .1 @50% -> 0) drawn at 70% layer opacity.
 */

const SIZES = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 30vw'

type TileProps = {
  src: string
  alt: string
  label: string
  aspect: string
  /** Second raster composited at 70% — the vending tile is layered over the bar shot in Figma. */
  overlaySrc?: string
  /** The vending tile's caption sits on a #262626 @57% bar. */
  tintedBar?: boolean
  priority?: boolean
}

function Tile({ src, alt, label, aspect, overlaySrc, tintedBar, priority }: TileProps) {
  return (
    <figure className={`group relative w-full overflow-hidden rounded-r32 bg-ink-600 ${aspect}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={SIZES}
        priority={priority}
        className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
      />

      {overlaySrc && (
        <Image
          src={overlaySrc}
          alt=""
          fill
          sizes={SIZES}
          className="object-cover opacity-70 transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.8)_0%,rgba(5,5,5,0.1)_50%,rgba(5,5,5,0)_100%)] opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

      <figcaption
        className={`absolute inset-x-0 bottom-0 flex h-[3.6842%] min-h-[44px] items-center px-5 ${
          tintedBar ? 'bg-[rgba(38,38,38,0.57)] backdrop-blur-sm' : ''
        }`}
      >
        <span className="font-body text-f12 font-normal uppercase tracking-[0.22em] text-white">{label}</span>
      </figcaption>
    </figure>
  )
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-wash-about">
      <div className="hairline" />
      <div className="shell section-y">
        <Reveal>
          <Eyebrow>Gallery / 05</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          {/* Space Grotesk 64 / lh 68 / ls -2.04 */}
          <h2 className="mt-s24 font-display text-f64 font-normal leading-[1.06] tracking-[-0.032em] text-white">
            Inside the <span className="text-violet">Haus</span>.
          </h2>
        </Reveal>

        {/* 208px from the heading block to the grid in the source file */}
        <div className="mt-s60 grid grid-cols-1 items-start gap-s24 md:grid-cols-2 xl:mt-[100px] xl:grid-cols-[28.2237%_28.2237%_32.6316%] xl:justify-between xl:gap-0">
          {/* Column 1 */}
          <div className="flex flex-col gap-s24 xl:gap-[34px]">
            <Reveal>
              <Tile
                src="/images/gallery-venue.png"
                alt="Neon-lit tournament tables inside the Haus"
                label="Venue"
                aspect="aspect-[429/640]"
                priority
              />
            </Reveal>
            <Reveal delay={0.08}>
              <Tile
                src="/images/gallery-events.png"
                alt="Crowd at a Haus of Pong league night"
                label="Events"
                aspect="aspect-[429/300]"
              />
            </Reveal>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-s24 xl:gap-[36px]">
            <Reveal delay={0.06}>
              <Tile
                src="/images/gallery-players.png"
                alt="Players sharing drinks across the table"
                label="Players"
                aspect="aspect-[429/300]"
              />
            </Reveal>
            <Reveal delay={0.14}>
              <Tile
                src="/images/gallery-ball.png"
                alt="Orange ping pong ball under a spotlight"
                label="Players"
                aspect="aspect-[429/640]"
              />
            </Reveal>
          </div>

          {/* Column 3 — one tile only, wider and shorter than a full column */}
          <div>
            <Reveal delay={0.12}>
              <Tile
                src="/images/gallery-drinks.png"
                overlaySrc="/images/gallery-vending.png"
                alt="On-site vending machine at the lounge"
                label="Vending Machine"
                aspect="aspect-[496/658]"
                tintedBar
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
