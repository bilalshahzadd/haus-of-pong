'use client'

import { useState } from 'react'
import Reveal from '../Reveal'
import { BookButton, GhostButton, Icon, SocialLinks, StatusPill } from '../ui'
import { ADDRESS, DIRECTIONS_URL, EMAIL, EMAIL_HREF, HOURS, PHONE, PHONE_HREF } from '@/lib/site'

/**
 * Visit / VIP (node 2296:1339) — content band 1540 wide (830 + 30 gap + 680).
 * Panels are r32 with a RADIAL #a74ae51f -> #a74ae51c wash.
 * Left: status row, an 80x80 r999 gradient chip with the 40px pin, a 680x362 r24
 * map (a live Google Maps embed replaces Figma's static screenshot), then the CTA row. Right: a 680x332 contact panel with #ffffff14 dividers
 * and 44x44 outlined circles, then a 680x432 VIP panel
 * (title Space Grotesk 700 / 29.9 / lh 36, fields on 32px rhythm).
 */

type VipStatus = 'idle' | 'sending' | 'joined' | 'error'

export default function VisitVip() {
  const [status, setStatus] = useState<VipStatus>('idle')
  const [vipError, setVipError] = useState('')
  const [vipOffline, setVipOffline] = useState(false)

  /**
   * The VIP sign-up posts to the same route the contact form uses, tagged with
   * its own subject so the two are told apart in the CRM. Before this it only
   * set a "You're on the list" label locally and never sent the name or email
   * anywhere, so every sign-up was silently discarded.
   */
  async function handleVipSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('vip-name') ?? '').trim()
    const email = String(data.get('vip-email') ?? '').trim()

    if (!name || !email) {
      setVipError('Please add your name and email.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setVipError('')
    setVipOffline(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: 'VIP List',
          message: 'Joined the VIP list from the website.',
          pageUri: window.location.href,
        }),
      })

      if (res.status === 503) {
        setVipOffline(true)
        setStatus('error')
        return
      }

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? 'Could not join just now. Please try again.')
      }

      form.reset()
      setStatus('joined')
    } catch (err) {
      setVipError(err instanceof Error ? err.message : 'Could not join just now. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="visit" className="relative overflow-hidden bg-ink">
      <div className="hairline" />
      <div className="pointer-events-none absolute left-[-14.4%] top-[-16%] aspect-square w-[26.7%] rounded-full bg-[#ff6a1f]/[0.15] blur-[140px]" />

      <div className="shell-vip section-y relative">
        <div className="flex gap-s30 max-xl:flex-col">
          {/* Left panel — 830/1540 */}
          <Reveal className="xl:w-[53.9%]">
            <div className="flex h-full flex-col justify-between rounded-r32 bg-vip-panel p-s50">
              <div className="flex flex-wrap items-center gap-s16">
                <StatusPill />
                <span className="font-body text-f12 uppercase leading-none tracking-[0.12em] text-[#9d9c9b] xl:text-[20px]">
                  Downtown OKC
                </span>
              </div>

              {/* Live Google Maps embed in place of the 680x362 static map from Figma.
                  The address/heading block that used to sit above this was dropped —
                  it repeated what the Location section already shows in full. */}
              <div className="relative mt-s30 min-h-[260px] w-full max-h-[520px] flex-1 overflow-hidden rounded-r24 border border-white/[0.07] max-xl:aspect-[680/362] max-xl:flex-none">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3249.408375138811!2d-97.50972159999999!3d35.4694386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b217aa3c6b8ef3%3A0x9741f49689538779!2sHaus%20of%20Pong!5e0!3m2!1sen!2s!4v1785477291626!5m2!1sen!2s"
                  title="Haus of Pong on Google Maps"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              <div className="mt-s30 flex flex-wrap gap-s16">
                <BookButton />
                <GhostButton href={DIRECTIONS_URL}>Get Directions</GhostButton>
              </div>
            </div>
          </Reveal>

          {/* Right column — 680/1540, two stacked panels with a 23px gap */}
          <div className="flex flex-col gap-[1.4948vw] max-xl:gap-6 xl:w-[44.16%]">
            <Reveal delay={0.1}>
              <div className="rounded-r32 bg-vip-panel px-s50 py-s30">
                <div className="flex items-start gap-s20 pt-s24">
                  <span className="grid aspect-square w-[8.1%] min-w-[36px] max-w-[44px] shrink-0 place-items-center rounded-full border border-white/[0.16]">
                    <Icon name="contact-call" size="40%" />
                  </span>
                  <div>
                    <p className="font-body text-f12 uppercase leading-none tracking-[0.22em] text-white/45">Call</p>
                    <a
                      href={PHONE_HREF}
                      className="mt-s8 block font-body text-f20 leading-tight text-white transition-colors hover:text-orange"
                    >
                      {PHONE}
                    </a>
                  </div>
                </div>

                <div className="mt-s30 flex items-start gap-s20 border-t border-white/[0.08] pt-s24">
                  <span className="grid aspect-square w-[8.1%] min-w-[36px] max-w-[44px] shrink-0 place-items-center rounded-full border border-white/[0.16]">
                    <Icon name="contact-email" size="40%" />
                  </span>
                  <div>
                    <p className="font-body text-f12 uppercase leading-none tracking-[0.22em] text-white/45">Email</p>
                    <a
                      href={EMAIL_HREF}
                      className="mt-s8 block break-all font-body text-f20 leading-tight text-white transition-colors hover:text-orange"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </div>

                <div className="mt-s30 flex items-start gap-s20 border-t border-white/[0.08] pt-s24">
                  <span className="grid aspect-square w-[8.1%] min-w-[36px] max-w-[44px] shrink-0 place-items-center rounded-full border border-white/[0.16]">
                    <Icon name="contact-visit" size="40%" />
                  </span>
                  <div>
                    <p className="font-body text-f12 uppercase leading-none tracking-[0.22em] text-white/45">Visit</p>
                    <p className="mt-s8 font-body text-f16 leading-[1.5] text-white">
                      {ADDRESS.building}
                      <br />
                      {ADDRESS.street} {ADDRESS.suite}, {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
                    </p>
                  </div>
                </div>

                <div className="mt-s30 flex items-start gap-s20 border-t border-white/[0.08] pt-s24">
                  <span className="grid aspect-square w-[8.1%] min-w-[36px] max-w-[44px] shrink-0 place-items-center rounded-full border border-white/[0.16]">
                    <Icon name="contact-hours" size="40%" />
                  </span>
                  <div>
                    <p className="font-body text-f12 uppercase leading-none tracking-[0.22em] text-white/45">Hours</p>
                    <p className="mt-s8 font-body text-f16 leading-[1.5] text-white">{HOURS}</p>
                  </div>
                </div>

                <div className="mt-s30 border-t border-white/[0.08] pt-s24">
                  <p className="font-body text-f12 uppercase leading-none tracking-[0.22em] text-white/45">Follow</p>
                  <SocialLinks size={40} className="mt-s16" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="rounded-r32 bg-vip-panel px-s50 pb-s30 pt-s50">
                <h3 className="font-display text-f30 font-bold leading-[1.208] tracking-[-0.02em] text-white">
                  Join The VIP List
                </h3>

                <form className="mt-s30 flex flex-col gap-s32" onSubmit={handleVipSubmit} noValidate>
                  <div className="border-t border-white/[0.08] pt-s16">
                    <label htmlFor="vip-name" className="font-body text-f12 uppercase tracking-[0.22em] text-white/45">
                      Name
                    </label>
                    <input
                      id="vip-name"
                      name="vip-name"
                      autoComplete="name"
                      required
                      disabled={status === 'sending'}
                      placeholder="Your Full Name"
                      className="mt-s12 w-full bg-transparent font-body text-f16 text-white placeholder:text-white/30 focus:outline-none"
                    />
                  </div>

                  <div className="border-t border-white/[0.08] pt-s16">
                    <label htmlFor="vip-email" className="font-body text-f12 uppercase tracking-[0.22em] text-white/45">
                      Email
                    </label>
                    <input
                      id="vip-email"
                      name="vip-email"
                      type="email"
                      autoComplete="email"
                      required
                      disabled={status === 'sending'}
                      placeholder="you@email.com"
                      className="mt-s12 w-full bg-transparent font-body text-f16 text-white placeholder:text-white/30 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex w-fit items-center gap-s8 rounded-pill bg-cta px-[1.4583vw] py-s16 font-body text-f16 font-semibold text-white transition-transform duration-300 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 max-xl:px-6"
                  >
                    {status === 'sending' ? 'Joining…' : status === 'joined' ? 'You’re on the list' : 'Join The VIP List'}
                    <svg viewBox="0 0 16 16" className="h-[1em] w-[1em]" fill="none" aria-hidden>
                      <path d="M4.5 11.5 11.5 4.5" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" />
                      <path
                        d="M6 4.5h5.5V10"
                        stroke="currentColor"
                        strokeWidth="1.333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <p aria-live="polite" className="min-h-[1.4em] font-body text-f14 leading-[1.5]">
                    {status === 'joined' && (
                      <span className="text-[#7ee0a8]">You’re on the list — we’ll be in touch.</span>
                    )}
                    {status === 'error' &&
                      (vipOffline ? (
                        <span className="text-white/70">
                          Sign-ups aren’t connected yet — email us to join:{' '}
                          <a href={EMAIL_HREF} className="text-orange underline-offset-4 hover:underline">
                            {EMAIL}
                          </a>
                        </span>
                      ) : (
                        <span className="text-[#ff8f7a]">{vipError}</span>
                      ))}
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
