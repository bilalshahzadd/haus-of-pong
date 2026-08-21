import type { Metadata } from 'next'
import { Suspense } from 'react'
import PageHero from '@/components/PageHero'
import ContactBody from '@/components/ContactBody'

export const metadata: Metadata = {
  title: 'Request a Booking — Haus of Pong',
  description:
    'Reserve a table at Haus of Pong, Oklahoma City’s first fully automated ping pong lounge, or enquire about a private or corporate event.',
}

export default function ContactPage() {
  return (
    <div className="relative bg-wash-up">
      <div className="hairline" />
      <PageHero
        title="Request a Booking"
        subtitle="Tell us when you'd like to play and we'll confirm your table by email, with your access instructions and the waiver."
      />
      {/* ContactBody reads ?subject= to preselect the enquiry type, and
          useSearchParams needs a Suspense boundary to keep this page
          statically renderable. */}
      <Suspense fallback={null}>
        <ContactBody />
      </Suspense>
    </div>
  )
}
