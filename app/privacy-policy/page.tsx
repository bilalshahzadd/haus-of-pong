import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'

/**
 * Privacy Policy (node 2177:923) — pad 250/200/250, wash 180deg #332001 -> #070707.
 * Body is a single centred column 1337 wide set in Manrope 500 / 28 / lh 33 / #ffffff99.
 */

export const metadata: Metadata = {
  title: 'Privacy Policy — Haus of Pong',
  description: 'How Haus of Pong handles your information.',
}

const COPY = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset’s Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum. orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset’s Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum. orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset’s Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.`

export default function PrivacyPolicyPage() {
  return (
    <div className="relative bg-wash-up">
      <div className="hairline" />

      <PageHero title="Privacy Policy" />

      <div className="shell pb-s250 pt-s50">
        <Reveal>
          {/* Manrope 500 / 28 / lh 33, centred, 1337 wide */}
          <p className="mx-auto max-w-[1337px] text-center font-body text-f24 font-medium leading-[1.18] text-white/60">
            {COPY}
          </p>
        </Reveal>
      </div>
    </div>
  )
}
