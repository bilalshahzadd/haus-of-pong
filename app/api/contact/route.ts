import { NextResponse } from 'next/server'

/**
 * Contact form -> HubSpot.
 *
 * Two modes, picked automatically from whichever env vars are present:
 *
 *   A. Forms API  (HUBSPOT_PORTAL_ID + HUBSPOT_FORM_GUID)
 *      No secret involved — both values are public identifiers. HubSpot creates
 *      or updates the contact AND keeps every submission in the form's history,
 *      so a repeat sender never overwrites their earlier message.
 *
 *   B. CRM API    (HUBSPOT_PRIVATE_APP_TOKEN)
 *      Upserts the contact by email, then attaches the message as a Note so
 *      each submission survives. Needs a private app token — server-side only,
 *      never prefixed NEXT_PUBLIC_.
 *
 * A wins if both are configured. With neither, the route 503s and the form
 * tells the visitor to email instead — it never silently swallows a message.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID
const FORM_GUID = process.env.HUBSPOT_FORM_GUID
const PRIVATE_APP_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN

/** HubSpot's own limits, so we reject oversized payloads before the round trip. */
const LIMITS = { name: 200, email: 254, subject: 200, message: 5000 }

/** Best-effort throttle. Serverless instances are per-region, so this thins
 *  floods rather than stopping a determined attacker — HubSpot dedupes the rest. */
const RATE = { windowMs: 60_000, max: 5 }
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE.windowMs)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5_000) hits.clear()
  return recent.length > RATE.max
}

type Payload = {
  name: string
  email: string
  subject: string
  message: string
  /** Honeypot — a real person never fills a field they cannot see. */
  company_website?: string
  /** HubSpot tracking cookie, present only if the tracking script is installed. */
  hutk?: string
  pageUri?: string
}

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function splitName(full: string) {
  const parts = full.split(/\s+/).filter(Boolean)
  return { firstname: parts[0] ?? '', lastname: parts.slice(1).join(' ') }
}

async function submitViaForms(p: Payload) {
  const { firstname, lastname } = splitName(p.name)

  // The subject also rides inside the message body. `enquiry_subject` is a
  // custom property, and HubSpot answers 200 even when a field it doesn't
  // recognise is dropped — so the inline copy is what guarantees it arrives.
  const body = p.subject ? `Subject: ${p.subject}\n\n${p.message}` : p.message

  const fields = [
    { name: 'email', value: p.email },
    { name: 'firstname', value: firstname },
    { name: 'lastname', value: lastname },
    { name: 'enquiry_subject', value: p.subject },
    { name: 'message', value: body },
  ]
    .filter((f) => f.value)
    .map((f) => ({ objectTypeId: '0-1', ...f }))

  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: p.pageUri || 'https://haus-of-pong.vercel.app/contact',
          pageName: 'Contact Us — Haus of Pong',
          ...(p.hutk ? { hutk: p.hutk } : {}),
        },
      }),
    },
  )

  if (!res.ok) throw new Error(`HubSpot Forms ${res.status}: ${await res.text()}`)
}

async function submitViaCrm(p: Payload) {
  const { firstname, lastname } = splitName(p.name)
  const auth = {
    Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
    'Content-Type': 'application/json',
  }

  // Upsert on email so a returning sender updates their record instead of 409ing.
  const upsert = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert', {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      inputs: [
        {
          idProperty: 'email',
          id: p.email,
          properties: { email: p.email, firstname, lastname },
        },
      ],
    }),
  })

  if (!upsert.ok) throw new Error(`HubSpot upsert ${upsert.status}: ${await upsert.text()}`)

  const contactId = (await upsert.json())?.results?.[0]?.id
  if (!contactId) throw new Error('HubSpot upsert returned no contact id')

  // A Note per submission — the contact's `message` property would otherwise be
  // overwritten every time and earlier enquiries would be lost.
  const note = await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      properties: {
        hs_timestamp: new Date().toISOString(),
        hs_note_body: `<p><strong>Subject:</strong> ${p.subject}</p><p>${p.message.replace(/\n/g, '<br>')}</p><p><em>Sent from the website contact form.</em></p>`,
      },
      associations: [
        {
          to: { id: contactId },
          // 202 = note_to_contact
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
        },
      ],
    }),
  })

  if (!note.ok) throw new Error(`HubSpot note ${note.status}: ${await note.text()}`)
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages in a short time. Please try again in a minute.' },
      { status: 429 },
    )
  }

  let body: Payload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  // Bot filled the hidden field — accept it so it never retries, but drop it.
  if (body.company_website) return NextResponse.json({ ok: true })

  const payload: Payload = {
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    subject: clean(body.subject, LIMITS.subject),
    message: clean(body.message, LIMITS.message),
    hutk: clean(body.hutk, 100),
    pageUri: clean(body.pageUri, 500),
  }

  if (!payload.name) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  // CRM first. This portal's form was built in HubSpot's new form editor, and
  // the legacy Forms API answers 200 for it without ever creating the contact —
  // a silent lead loss. Only fall back to Forms for a classic-editor form.
  const mode = PRIVATE_APP_TOKEN ? 'crm' : PORTAL_ID && FORM_GUID ? 'forms' : null

  if (!mode) {
    console.error('[contact] HubSpot is not configured — no credentials in env.')
    return NextResponse.json(
      { error: 'The form is not connected yet. Please email abc@domain.com in the meantime.' },
      { status: 503 },
    )
  }

  try {
    await (mode === 'forms' ? submitViaForms(payload) : submitViaCrm(payload))
    return NextResponse.json({ ok: true })
  } catch (err) {
    // The visitor never sees HubSpot's raw error; it goes to the Vercel logs.
    console.error('[contact] submission failed:', err)
    return NextResponse.json(
      { error: 'We could not send that just now. Please try again, or email abc@domain.com.' },
      { status: 502 },
    )
  }
}
