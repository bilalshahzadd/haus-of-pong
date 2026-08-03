'use client'

import { useState } from 'react'
import Link from 'next/link'
import Reveal from './Reveal'
import { Icon } from './ui'

/**
 * Contact body (node 2167:267) — 1520 band, H gap 60: a 673 copy column and a
 * 750x598 form panel (r24, #111111b2, 1px #ffffff33, backdrop blur 20, pad 40).
 * Detail rows: #ffffff14 top border, 24px padding, 20px gap, 44x44 outlined circle,
 * label Manrope 400 / 12 / ls 2.64 / #ffffff66, value Space Grotesk 400 / 18 / lh 28.
 * Fields: r8, #35353480, 1px #ffffff1a, 56 tall. Submit 668x60 gradient, label #301e01.
 */

const DETAILS = [
  { icon: 'contact-visit', label: 'Visit', value: ['221 Underground Ave', 'New York, NY 10013'] },
  { icon: 'contact-call', label: 'Call', value: ['+1 234 567 8901'], href: 'tel:+12345678901' },
  { icon: 'contact-email', label: 'Email', value: ['abc@domain.com'], href: 'mailto:abc@domain.com' },
  {
    icon: 'contact-hours',
    label: 'Hours',
    value: ['Mon — Thu · 5pm — 1am', 'Fri — Sat · 5pm — 3am', 'Sun · 3pm — 12am'],
  },
]

const SUBJECTS = ['Table Booking', 'Corporate Event', 'Private Hire', 'League Enquiry', 'Something Else']

/* Geist 600 / 12 / lh 12 / ls 1.20 / uppercase / #dac2ad */
const fieldLabel = 'font-geist text-f12 font-semibold uppercase leading-none tracking-[0.1em] text-[#dac2ad]'
const field =
  'mt-s20 w-full rounded-lg border border-white/[0.1] bg-[#35353480] px-s16 py-s12 font-jakarta text-f16 leading-[1.5] text-white placeholder:text-white/35 focus:border-orange/60 focus:outline-none transition-colors'

export default function ContactBody() {
  const [sent, setSent] = useState(false)

  return (
    <div className="shell relative pb-s140 pt-s50">
      <div className="flex gap-s60 max-xl:flex-col">
        {/* Copy column — 673/1520 */}
        <div className="flex flex-col gap-s50 xl:w-[44.28%]">
          <div className="flex flex-col gap-s24">
            <Reveal>
              <p className="font-body text-f12 uppercase leading-[1.33] tracking-[0.28em] text-orange">
                Contact us / 06
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              {/* Space Grotesk 400 / 64 / lh 64 / ls -1.92 */}
              <h2 className="font-display text-f64 font-normal leading-none tracking-[-0.03em] text-white">
                Say hello, book a table,
                <br />
                or <span className="text-orange">plan the takeover.</span>
              </h2>
            </Reveal>
          </div>

          <dl className="flex max-w-[540px] flex-col gap-s30">
            {DETAILS.map(({ icon, label, value, href }, i) => (
              <Reveal key={label} delay={0.1 + i * 0.05}>
                <div className="flex items-start gap-s20 border-t border-white/[0.08] pt-s24">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.16]">
                    <Icon name={icon} size={16} />
                  </span>
                  <div>
                    <dt className="font-body text-f12 uppercase leading-[1.33] tracking-[0.22em] text-white/40">
                      {label}
                    </dt>
                    <dd className="mt-s8 font-display text-f18 leading-[1.556] text-white">
                      {href ? (
                        <a href={href} className="transition-colors hover:text-orange">
                          {value[0]}
                        </a>
                      ) : (
                        value.map((l) => (
                          <span key={l} className="block">
                            {l}
                          </span>
                        ))
                      )}
                    </dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.36}>
            <div className="flex gap-s12 pt-s16">
              {['social-instagram', 'social-twitter', 'social-facebook'].map((s) => (
                <Link
                  key={s}
                  href="#"
                  aria-label="Social profile"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.16] transition-colors hover:border-orange/60"
                >
                  <Icon name={s} size={16} />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Form panel — 750/1520 */}
        <Reveal delay={0.18} className="xl:w-[49.34%] xl:self-start xl:pt-[6%]">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="rounded-r24 border border-white/20 bg-[#111111b2] p-s40 backdrop-blur-[20px]"
          >
            <div className="flex flex-col gap-s30">
              <div className="grid gap-s24 sm:grid-cols-2">
                <div className="pt-s8">
                  <label htmlFor="name" className={fieldLabel}>
                    Name
                  </label>
                  <input id="name" name="name" placeholder="Your Name" required className={field} />
                </div>
                <div className="pt-s8">
                  <label htmlFor="email" className={fieldLabel}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@address.com"
                    required
                    className={field}
                  />
                </div>
              </div>

              <div className="pt-s8">
                <label htmlFor="subject" className={fieldLabel}>
                  Subject
                </label>
                <select id="subject" name="subject" className={`${field} appearance-none`}>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s} className="bg-ink-700">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-s8">
                <label htmlFor="message" className={fieldLabel}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="How can we help you?"
                  className={`${field} resize-none`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-s50 w-full rounded-pill bg-cta py-s16 font-body text-f18 font-semibold text-[#301e01] transition-transform duration-300 hover:scale-[1.01]"
            >
              {sent ? 'Message sent — we’ll be in touch' : 'Send Message'}
            </button>
          </form>
        </Reveal>
      </div>
    </div>
  )
}
