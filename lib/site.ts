/**
 * Single source of truth for every fact the site states about the business.
 *
 * Copy that names a price, an address, a handle, a phone number or a store
 * link reads it from here — so the values below are the only place any of it
 * has to be corrected, and nothing can drift out of sync between the footer,
 * the contact page and the venue page.
 *
 * The values still awaiting the client are flagged TODO(client) and are the
 * only edits needed before launch.
 */

/* ── Contact ──────────────────────────────────────────────────────────────
 * Both values confirmed by the client. The phone number was withheld for a
 * while because the lounge is unstaffed and the only number on file was a
 * placeholder; there is now a real line, so it runs everywhere the email does.
 * ------------------------------------------------------------------------ */

/** Confirmed by the client. */
export const EMAIL = 'info@hausofpong.com'
export const EMAIL_HREF = `mailto:${EMAIL}`

/** Confirmed by the client. Display form and the E.164 dial form — a `tel:`
 *  href must carry no spaces, brackets or dashes for iOS and Android to
 *  hand it to the dialler cleanly. */
export const PHONE = '+1 (405) 446-9400'
export const PHONE_HREF = 'tel:+14054469400'

/** Group and corporate enquiries route to the same inbox with a subject line
 *  that sorts them, rather than to a second address nobody monitors. */
export const EVENTS_EMAIL = EMAIL

/* ── Location ─────────────────────────────────────────────────────────── */

export const ADDRESS = {
  building: 'Inside the Aloft Hotel',
  street: '209 N. Walnut Ave.',
  suite: 'Suite 102',
  city: 'Oklahoma City',
  state: 'OK',
  zip: '73104',
  /** Two-line form for the contact / venue detail rows. */
  lines: ['Inside the Aloft Hotel', '209 N. Walnut Ave. Suite 102, Oklahoma City, OK 73104'],
}

/** Deep link that hands the address straight to the user's maps app. Uses the
 *  universal Google Maps search endpoint, which iOS resolves to Apple Maps or
 *  the Google Maps app when either is installed. */
export const DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=' +
  encodeURIComponent('Haus of Pong, 209 N Walnut Ave Suite 102, Oklahoma City, OK 73104')

/** First-visit orientation. The lounge has no host to ask, so this has to
 *  answer "where do I actually walk in?" without a human in the loop. */
export const ARRIVAL = [
  {
    icon: 'icon-location-pin',
    title: 'Find the building',
    copy: 'We’re inside the Aloft Hotel at 209 N. Walnut Ave., on the ground floor in Suite 102.',
  },
  {
    icon: 'icon-parking',
    title: 'Parking',
    copy: 'Street parking runs along N. Walnut Ave., and the Aloft lot is right at the building.',
  },
  {
    icon: 'about-automated-entry',
    title: 'The entrance',
    copy: 'Head to the Suite 102 door and unlock it with the access instructions from your booking.',
  },
]

export const HOURS = 'Open 24/7 by reservation'

/* ── Booking ──────────────────────────────────────────────────────────────
 * There is no external booking system connected yet, so every CTA lands on the
 * booking request form with its subject already selected — one destination,
 * one label, changed in one place the day a real booking URL exists.
 *
 * To switch to a live booking system: set BOOKING.href to that URL and
 * BOOKING.label back to 'Book your table'. Nothing else needs to change.
 * ------------------------------------------------------------------------ */

export const BOOKING = {
  href: '/contact?subject=Table+Booking#booking-form',
  label: 'Request a booking',
}

export const EVENTS_BOOKING_HREF = '/contact?subject=Private+%26+Corporate+Events#booking-form'

/* ── Pricing ──────────────────────────────────────────────────────────────
 * TODO(client): drop the four rates in below. `null` renders as "TBA" in a
 * muted style rather than a broken empty cell, so the section ships and reads
 * correctly with or without the numbers.
 * ------------------------------------------------------------------------ */

export type Rate = number | null

export const PRICING: {
  duration: string
  minutes: number
  blurb: string
  offPeak: Rate
  peak: Rate
  featured?: boolean
}[] = [
  {
    duration: '30 minutes',
    minutes: 30,
    blurb: 'A quick rally — right for a warm-up, a lunch break, or a first visit.',
    offPeak: null,
    peak: null,
  },
  {
    duration: '60 minutes',
    minutes: 60,
    blurb: 'A full session — enough for a real match, a group, or a date night.',
    offPeak: null,
    peak: null,
    featured: true,
  },
]

/** TODO(client): confirm the exact peak window. */
export const PEAK_WINDOWS = {
  peak: 'Evenings and weekends',
  offPeak: 'Weekday daytime and overnight',
}

/** Renders a rate for display. Keeps the "TBA" fallback in one place so every
 *  price on the site falls back identically. */
export function formatRate(rate: Rate) {
  return rate === null ? 'TBA' : `$${rate}`
}

/* ── App ──────────────────────────────────────────────────────────────────
 * The store badges must never look tappable before the app exists. APP_LIVE
 * gates that: while false, every badge renders as a non-interactive
 * "Coming soon" chip. Flip the per-platform flag and paste the URL on launch.
 * ------------------------------------------------------------------------ */

export const APP = {
  ios: { live: false, url: '' },
  android: { live: false, url: '' },
}

/** True only when at least one store listing is actually published. */
export const APP_LIVE = APP.ios.live || APP.android.live

/* ── Social ───────────────────────────────────────────────────────────────
 * TODO(client): confirm the handles. These follow the brand name; correct any
 * that differ. Twitter/X was dropped — the client asked for IG, TikTok and FB.
 * ------------------------------------------------------------------------ */

export const SOCIALS = [
  { icon: 'social-instagram', label: 'Instagram', href: 'https://www.instagram.com/hausofpong' },
  { icon: 'social-tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@hausofpong' },
  { icon: 'social-facebook', label: 'Facebook', href: 'https://www.facebook.com/hausofpong' },
]

/* ── Venue ────────────────────────────────────────────────────────────── */

export const TABLE_COUNT = 4

export const AMENITIES = [
  `${TABLE_COUNT} tournament-grade tables`,
  'Paddles and balls provided',
  'Video replays and game clips',
  'Beverages and light snacks',
  'Water fountain',
  'WiFi',
]

/** Waiver terms, stated in full on /waiver and summarised wherever a guest is
 *  about to book. */
export const WAIVER = {
  href: '/waiver',
  summary:
    'Every guest accepts our liability waiver and facility rules before play. It takes a moment during booking — no paperwork at the door.',
}
