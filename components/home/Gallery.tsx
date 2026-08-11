import Image from 'next/image'
import Reveal from '../Reveal'
import { Eyebrow } from '../ui'

/**
 * Two columns of paired tiles (was three — the Vending Machine column carried
 * a generic stock photo the client asked dropped, so its width folded back
 * into an even 2-up split instead of leaving an orphaned narrow gap):
 *
 *   col 1   Venue 429x640     -> gap 34 -> Events 429x300
 *   col 2   Players 429x300   -> gap 36 -> Ball 429x640
 *
 * Every tile: radius 32, #161616 base, and a bottom-up scrim
 * (rgba(5,5,5,.8) -> .1 @50% -> 0) drawn at 70% layer opacity.
 */

const SIZES = '(max-width: 768px) 100vw, 50vw'

type TileProps = {
  src: string
  alt: string
  label: string
  aspect: string
  priority?: boolean
}

function Tile({ src, alt, label, aspect, priority }: TileProps) {
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

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.8)_0%,rgba(5,5,5,0.1)_50%,rgba(5,5,5,0)_100%)] opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

      <figcaption className="absolute inset-x-0 bottom-0 flex h-[3.6842%] min-h-[44px] items-center px-5">
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

        {/* Two columns now that the Vending Machine tile is gone — was a 3rd,
            narrower column carrying a generic stock photo the client asked to drop. */}
        <div className="mt-s60 grid grid-cols-1 items-start gap-s24 md:grid-cols-2 xl:mt-[60px] xl:gap-s24">
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
                src="/images/community-capitol-toss.jpg"
                alt="Regulars celebrating outside with Haus of Pong balls in the air"
                label="Events"
                aspect="aspect-[429/300]"
              />
            </Reveal>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-s24 xl:gap-[36px]">
            <Reveal delay={0.06}>
              <Tile
                src="/images/community-huddle.jpg"
                alt="Regulars huddled together holding Haus of Pong paddles"
                label="Players"
                aspect="aspect-[429/300]"
              />
            </Reveal>
            <Reveal delay={0.14}>
              <Tile
                src="/images/community-ball-eyes.jpg"
                alt="A player holding two Haus of Pong balls up to her eyes"
                label="Ball"
                aspect="aspect-[429/640]"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
