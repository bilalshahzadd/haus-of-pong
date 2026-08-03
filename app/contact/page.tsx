import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import ContactBody from '@/components/ContactBody'

export const metadata: Metadata = {
  title: 'Contact Us — Haus of Pong',
  description: 'Say hello, book a table, or plan the takeover. Reach the Haus of Pong team.',
}

export default function ContactPage() {
  return (
    <div className="relative bg-wash-up">
      <div className="hairline" />
      <PageHero
        title="Contact Us"
        subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
      />
      <ContactBody />
    </div>
  )
}
