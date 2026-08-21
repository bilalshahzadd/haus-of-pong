'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../Reveal'
import { BookButton, Eyebrow } from '../ui'
import { ADDRESS, EMAIL, EMAIL_HREF } from '@/lib/site'

/**
 * FAQ — the client's own question list, run verbatim.
 *
 * Split into two columns of accordions so fifteen questions don't turn into a
 * wall of scrolling. Each panel is a real <button> toggling an aria-controlled
 * region, so it works on keyboard and reads correctly to a screen reader.
 */

type Item = { q: string; a: React.ReactNode }

const FAQS: Item[] = [
  {
    q: 'What is Haus of Pong?',
    a: 'Haus of Pong is a modern, self-serve ping pong lounge in Downtown OKC built for casual play, competition, date nights, groups, and events.',
  },
  {
    q: 'Where are you located?',
    a: `Inside the Aloft Hotel at ${ADDRESS.street} ${ADDRESS.suite}, ${ADDRESS.city}, ${ADDRESS.state} ${ADDRESS.zip}.`,
  },
  {
    q: 'What are your hours?',
    a: 'Haus of Pong is designed for 24/7 access.',
  },
  {
    q: 'Do I need a reservation?',
    a: 'Reservations are recommended to guarantee your table.',
  },
  {
    q: 'How do I book?',
    a: 'Choose your date, time, and session length through our website or app.',
  },
  {
    q: 'Do I have to download the app?',
    a: 'No. You can book through our website without downloading the app. The app is available for a faster, more convenient experience.',
  },
  {
    q: 'How do I get inside?',
    a: 'After booking, you’ll receive access instructions for your reservation.',
  },
  {
    q: 'Do you provide paddles and balls?',
    a: 'Yes. Equipment is provided, but you’re welcome to bring your own paddle.',
  },
  {
    q: 'Can beginners play?',
    a: 'Absolutely. Haus of Pong is for everyone from first-time players to competitive players.',
  },
  {
    q: 'Do you offer private events?',
    a: 'Yes. We offer options for birthdays, corporate events, team-building, and private groups.',
  },
  {
    q: 'Do you have leagues or tournaments?',
    a: 'Yes. Leagues, tournaments, and special events will be offered throughout the year.',
  },
  {
    q: 'Can I save replays or highlights?',
    a: 'Select gameplay may include replay and highlight features so you can save and share your best moments.',
  },
  {
    q: 'Do I need to sign a waiver?',
    a: 'Yes. Guests may be required to accept our waiver and facility rules before playing.',
  },
  {
    q: 'Can I extend my reservation?',
    a: 'If the table is available afterward, you may be able to book additional time through the website or app.',
  },
  {
    q: 'How do I stay updated?',
    a: 'Follow Haus of Pong on social media and join our VIP list for events, promotions, leagues, and updates.',
  },
]

function Accordion({ item, id }: { item: Item; id: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/[0.08]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`faq-panel-${id}`}
        id={`faq-trigger-${id}`}
        className="flex w-full items-center justify-between gap-s16 py-s24 text-left transition-colors duration-200 hover:text-orange"
      >
        <span className="font-display text-f18 font-bold leading-[1.4] text-white">{item.q}</span>
        <span
          aria-hidden
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/[0.16] transition-transform duration-300 ${
            open ? 'rotate-45 border-orange/60' : ''
          }`}
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-white" fill="none" aria-hidden>
            <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-trigger-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-s24 pr-s40 font-body text-f16 leading-[1.7] text-white/60">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const half = Math.ceil(FAQS.length / 2)
  const columns = [FAQS.slice(0, half), FAQS.slice(half)]

  return (
    <section id="faq" className="relative bg-wash-dim">
      <div className="hairline" />
      <div className="shell section-y">
        <div className="flex flex-col gap-s24">
          <Reveal>
            <Eyebrow>FAQ / 09</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h-display max-w-[720px]">
              Frequently asked
              <br />
              <span className="text-violet">questions</span>.
            </h2>
          </Reveal>
        </div>

        <div className="mt-s60 grid gap-x-s64 xl:grid-cols-2">
          {columns.map((column, colIndex) => (
            <div key={colIndex}>
              {column.map((item, i) => (
                <Accordion key={item.q} item={item} id={`${colIndex}-${i}`} />
              ))}
            </div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-s60 flex flex-col gap-s24 rounded-r32 border border-white/[0.08] bg-ink-600 p-s40 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h3 className="font-display text-f20 font-bold leading-[1.4] text-white">Still have a question?</h3>
              <p className="mt-s8 font-body text-f14 leading-[1.643] text-white/60">
                Email us at{' '}
                <a href={EMAIL_HREF} className="text-orange transition-colors hover:text-orange-300">
                  {EMAIL}
                </a>{' '}
                and we’ll get back to you.
              </p>
            </div>
            <div className="shrink-0">
              <BookButton />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
