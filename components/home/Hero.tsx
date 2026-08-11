'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CtaButton, GhostButton, StatusPill } from '../ui'

/**
 * Hero (node 2103:979) — 1920x1200, 200px gutters, content padded 150 top/bottom.
 * Left column 943 wide (copy block 896x520, V gap 30), paddle 412x412 at x=1299.
 * Stats sit under a #ffffff14 top border with 30px of padding and a 50px gap.
 * Two blurred orbs: 384 #ff6a1f33 blur 120 top-left, 448 #8b3fff40 blur 140 bottom-right.
 */

const STATS = [
  { value: '04', label: 'Premium Tables' },
  { value: '24/7', label: 'Booking via App' },
  { value: '1', label: 'Iconic Address' },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/hero-venue.png"
        alt="Haus of Pong venue interior"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.5)_0%,rgba(5,5,5,0)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.75)_0%,rgba(5,5,5,0.05)_38%,rgba(5,5,5,0.85)_100%)]" />

      {/* Overlay+Blur orbs */}
      <div className="pointer-events-none absolute left-[-9.7%] top-[-8%] aspect-square w-[20%] rounded-full bg-[#ff6a1f]/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-8%] right-[-6%] aspect-square w-[23.3%] rounded-full bg-violet/25 blur-[140px]" />

      {/* 1200 tall on a 1920 artboard = 62.5% of the width, so the hero scales
          with the viewport instead of pinning to 1200 on every desktop. */}
      <div className="shell relative flex min-h-[clamp(640px,62.5vw,1200px)] flex-col justify-center py-s150">
        <div className="flex items-center max-xl:flex-col max-xl:items-start">
          {/* Copy column — client asked to drop the juggling paddle animation, so
              this now runs full width instead of sharing the row with it. */}
          <div className="w-full max-w-[820px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="flex flex-wrap items-center gap-s16"
            >
              <StatusPill />
              <span className="font-body text-f12 uppercase leading-none tracking-[0.12em] text-white/60 xl:text-[20px]">
                Downtown OKC
              </span>
            </motion.div>

            {/* Space Grotesk 700 / 48 / lh 80 / ls 2.16 — three stacked lines */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease }}
              className="mt-s30 font-display text-f48 font-bold leading-[1.667] tracking-[0.045em]"
            >
              <span className="block text-white">Serve.</span>
              <span className="block text-violet">Spin.</span>
              <span className="block text-orange-400">Repeat.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mt-s30 max-w-[576px] font-body text-f16 leading-[1.8] text-white/60"
            >
              A premium ping pong lounge in Downtown Oklahoma City. Tournament tables, curated hospitality, and a
              members-grade room that stays open around the clock.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mt-s30 flex flex-wrap gap-s30"
            >
              <CtaButton href="/contact">Book your table</CtaButton>
              <GhostButton href="/venue-details">Explore the Haus</GhostButton>
            </motion.div>

            {/* Stats — 64px above, then a hairline with 30px padding and a 50px gap */}
            <motion.dl
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease }}
              className="mt-s64 flex flex-wrap gap-x-s50 gap-y-s24 border-t border-white/[0.08] pt-s30"
            >
              {STATS.map((s) => (
                <div key={s.label} className="min-w-[120px]">
                  <dt className="font-display text-f24 font-bold leading-none text-white">{s.value}</dt>
                  <dd className="mt-s12 font-body text-f12 uppercase leading-none tracking-[0.22em] text-white/50">
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </div>

      {/* Scroll cue — Manrope 400 / 10 / ls 3.0 + a 1x40 fading rule */}
      <div className="absolute inset-x-0 bottom-[3%] flex flex-col items-center gap-s8">
        <span className="font-body text-f10 uppercase leading-[1.5] tracking-[0.3em] text-white/60">Scroll</span>
        <span className="relative h-[40px] w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_100%)]">
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 animate-scroll-dot rounded-full bg-orange" />
        </span>
      </div>
    </section>
  )
}
