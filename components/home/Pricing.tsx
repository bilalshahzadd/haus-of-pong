import Reveal from '../Reveal'
import { BookButton, Eyebrow, Icon } from '../ui'
import { PEAK_WINDOWS, PRICING, formatRate } from '@/lib/site'

/**
 * Pricing — 30 vs 60 minute sessions, each split Peak / Off-Peak.
 *
 * Rates live in lib/site.ts and are still `null` pending the client's numbers;
 * formatRate renders those as a muted "TBA" so the section is complete and
 * correct now, and filling the four values in is the only change needed later.
 */

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-wash-about">
      <div className="hairline" />
      <div className="pointer-events-none absolute left-[-12%] bottom-[-16%] aspect-square w-[24%] rounded-full bg-[#ff6a1f]/[0.13] blur-[140px]" />

      <div className="shell section-y relative">
        <div className="flex flex-col gap-s24">
          <Reveal>
            <Eyebrow>Pricing / 05</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h-display max-w-[720px]">
              Pay for the table,
              <br />
              by the <span className="text-orange">half hour</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="body-lg max-w-[560px] pt-s8">
              One rate for the table, however many of you play. Off-peak is the cheaper way in; peak covers the
              hours everyone wants.
            </p>
          </Reveal>
        </div>

        <div className="mt-s60 grid gap-s24 md:grid-cols-2">
          {PRICING.map((tier, i) => (
            <Reveal key={tier.duration} delay={0.08 * i}>
              <article
                className={`relative flex h-full flex-col overflow-hidden rounded-r32 border p-s40 transition-colors duration-300 ${
                  tier.featured
                    ? 'border-orange/40 bg-ink-600'
                    : 'border-white/[0.08] bg-ink-600 hover:border-white/20'
                }`}
              >
                {tier.featured && (
                  <span className="absolute right-s24 top-s24 rounded-pill bg-cta px-s16 py-[4px] font-body text-f10 uppercase leading-[1.5] tracking-[0.22em] text-white">
                    Most booked
                  </span>
                )}

                <span className="icon-chip">
                  <Icon name="icon-price-tag" size="46%" />
                </span>

                <h3 className="mt-s20 font-display text-f30 font-bold leading-[1.208] tracking-[-0.02em] text-white">
                  {tier.duration}
                </h3>
                <p className="mt-s12 max-w-[360px] font-body text-f14 leading-[1.643] text-white/60">{tier.blurb}</p>

                <dl className="mt-s32 grid gap-s16 border-t border-white/[0.08] pt-s24 sm:grid-cols-2">
                  <div>
                    <dt className="font-body text-f12 uppercase leading-none tracking-[0.22em] text-white/45">
                      Off-Peak
                    </dt>
                    <dd className="mt-s12 font-display text-f32 font-bold leading-none text-white">
                      {formatRate(tier.offPeak)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-body text-f12 uppercase leading-none tracking-[0.22em] text-orange">
                      Peak
                    </dt>
                    <dd className="mt-s12 font-display text-f32 font-bold leading-none text-white">
                      {formatRate(tier.peak)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-s32 pt-s8">
                  <BookButton />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* What actually counts as peak — otherwise the two columns above are
            just two numbers with no way to tell which one you'll be charged. */}
        <Reveal delay={0.24}>
          <div className="mt-s24 grid gap-s16 rounded-r32 border border-white/[0.08] bg-ink p-s40 md:grid-cols-2">
            <div className="flex items-start gap-s20">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.16]">
                <Icon name="contact-hours" size={16} />
              </span>
              <div>
                <h3 className="font-body text-f12 uppercase leading-none tracking-[0.22em] text-white/45">
                  Off-Peak
                </h3>
                <p className="mt-s12 font-display text-f18 leading-[1.4] text-white">{PEAK_WINDOWS.offPeak}</p>
              </div>
            </div>
            <div className="flex items-start gap-s20">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-orange/40">
                <Icon name="contact-hours" size={16} />
              </span>
              <div>
                <h3 className="font-body text-f12 uppercase leading-none tracking-[0.22em] text-orange">Peak</h3>
                <p className="mt-s12 font-display text-f18 leading-[1.4] text-white">{PEAK_WINDOWS.peak}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-s24 font-body text-f14 leading-[1.643] text-white/45">
            Paddles and balls are included with every session. Need longer? Book back-to-back slots, or extend from
            your booking if the table is still free afterwards.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
