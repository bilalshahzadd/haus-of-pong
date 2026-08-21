'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Reveal from './Reveal'
import { Icon, SocialLinks } from './ui'
import { ADDRESS, DIRECTIONS_URL, EMAIL, EMAIL_HREF, HOURS, WAIVER } from '@/lib/site'

/**
 * Contact body (node 2167:267) — 1520 band, H gap 60: a 673 copy column and a
 * 750x598 form panel (r24, #111111b2, 1px #ffffff33, backdrop blur 20, pad 40).
 * Detail rows: #ffffff14 top border, 24px padding, 20px gap, 44x44 outlined circle,
 * label Manrope 400 / 12 / ls 2.64 / #ffffff66, value Space Grotesk 400 / 18 / lh 28.
 * Fields: r8, #35353480, 1px #ffffff1a, 56 tall. Submit 668x60 gradient, label #301e01.
 */

const DETAILS: { icon: string; label: string; value: string[]; href?: string }[] = [
  { icon: 'contact-visit', label: 'Visit', value: ADDRESS.lines, href: DIRECTIONS_URL },
  // No phone row: the lounge is unstaffed, so the +1 234 567 8901 placeholder
  // that used to sit here had no real number behind it to replace.
  { icon: 'contact-email', label: 'Email', value: [EMAIL], href: EMAIL_HREF },
  { icon: 'contact-hours', label: 'Hours', value: [HOURS] },
  { icon: 'icon-waiver', label: 'Waiver', value: ['Accepted at booking'], href: WAIVER.href },
]

const SUBJECTS = [
  'Table Booking',
  'Private & Corporate Events',
  'League Enquiry',
  'Replays & Game Clips',
  'Something Else',
]

/* Geist 600 / 12 / lh 12 / ls 1.20 / uppercase / #dac2ad */
const fieldLabel = 'font-geist text-f12 font-semibold uppercase leading-none tracking-[0.1em] text-[#dac2ad]'
const field =
  'mt-s20 w-full rounded-lg border border-white/[0.1] bg-[#35353480] px-s16 py-s12 font-jakarta text-f16 leading-[1.5] text-white placeholder:text-white/35 focus:border-orange/60 focus:outline-none transition-colors'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Present only when the HubSpot tracking script is installed; links the
 *  submission to the visitor's browsing history instead of creating an
 *  anonymous contact. Absent is fine — the route just omits it. */
function readHubspotCookie() {
  return document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]*)/)?.[1] ?? ''
}

export default function ContactBody() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  /**
   * Booking CTAs across the site link here as ?subject=Table+Booking, so the
   * form opens already set to what the visitor clicked rather than making them
   * find it in the dropdown. Matching is case-insensitive and falls back to the
   * first subject, so an unknown value can never leave the select empty.
   */
  const searchParams = useSearchParams()
  const requested = searchParams.get('subject')
  const matched = SUBJECTS.find((s) => s.toLowerCase() === requested?.trim().toLowerCase())
  const [subject, setSubject] = useState(SUBJECTS[0])

  useEffect(() => {
    if (matched) setSubject(matched)
  }, [matched])

  const sending = status === 'sending'

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return

    const form = event.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          hp_field: data.get('hp_field'),
          hutk: readHubspotCookie(),
          pageUri: window.location.href,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? 'Something went wrong. Please try again.')
      }

      form.reset()
      setStatus('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="shell relative pb-s140 pt-s50">
      <div className="flex gap-s60 max-xl:flex-col">
        {/* Copy column — 673/1520 */}
        <div className="flex flex-col gap-s50 xl:w-[44.28%]">
          <div className="flex flex-col gap-s24">
            <Reveal>
              <p className="font-body text-f12 uppercase leading-[1.33] tracking-[0.28em] text-orange">
                Contact us
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              {/* Space Grotesk 400 / 64 / lh 64 / ls -1.92 */}
              <h2 className="font-display text-f64 font-normal leading-none tracking-[-0.03em] text-white">
                Request a booking,
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
                        <a
                          href={href}
                          {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="block transition-colors hover:text-orange"
                        >
                          {value.map((l) => (
                            <span key={l} className="block">
                              {l}
                            </span>
                          ))}
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
            <div className="pt-s16">
              <p className="font-body text-f12 uppercase leading-[1.33] tracking-[0.22em] text-white/40">Follow</p>
              <SocialLinks className="mt-s16" />
            </div>
          </Reveal>
        </div>

        {/* Form panel — 750/1520 */}
        <Reveal delay={0.18} className="xl:w-[49.34%] xl:self-start xl:pt-[6%]">
          <form
            id="booking-form"
            onSubmit={handleSubmit}
            noValidate
            className="scroll-mt-header rounded-r24 border border-white/20 bg-[#111111b2] p-s40 backdrop-blur-[20px]"
          >
            <p className="mb-s30 font-body text-f14 leading-[1.643] text-white/60">
              Tell us the date, time and session length you want and we’ll confirm your table by email, along with
              the access instructions and the waiver.
            </p>
            {/* Honeypot — off-screen rather than display:none, which some bots skip.
                Field name avoids "company"/"website"/"url" on purpose: those words make
                browser autofill (Chrome/Safari saved profiles) silently fill this even
                though it's invisible, which drops the real submission as a false bot hit. */}
            <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
              <label htmlFor="hp_field">Leave this field blank</label>
              <input id="hp_field" name="hp_field" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col gap-s30">
              <div className="grid gap-s24 sm:grid-cols-2">
                <div className="pt-s8">
                  <label htmlFor="name" className={fieldLabel}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    required
                    disabled={sending}
                    autoComplete="name"
                    className={field}
                  />
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
                    disabled={sending}
                    autoComplete="email"
                    className={field}
                  />
                </div>
              </div>

              <div className="pt-s8">
                <label htmlFor="subject" className={fieldLabel}>
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={sending}
                  className={`${field} appearance-none`}
                >
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
                  required
                  disabled={sending}
                  className={`${field} resize-none`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-s50 w-full rounded-pill bg-cta py-s16 font-body text-f18 font-semibold text-[#301e01] transition-transform duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {sending ? 'Sending…' : status === 'sent' ? 'Message sent' : 'Send Message'}
            </button>

            {/* aria-live so screen readers announce the result without a focus jump */}
            <p aria-live="polite" className="min-h-[1.5em] pt-s16 text-center font-body text-f14 leading-[1.4]">
              {status === 'sent' && (
                <span className="text-[#7ee0a8]">Thanks — we’ve got it. We’ll be in touch shortly.</span>
              )}
              {status === 'error' && <span className="text-[#ff8f7a]">{error}</span>}
            </p>
          </form>
        </Reveal>
      </div>
    </div>
  )
}
