import type { ReactNode } from 'react'

/**
 * Shared head for the three inner pages. In Figma each of those sections is
 * padded 250 from the top (150 header + 100 of air) with a 50px gap to the body,
 * and the title/subtitle block is centred on the 1520 shell.
 * Title Montserrat 400 / 64 / lh 80 / ls 2.16. Subtitle Manrope 400 / 18.
 */
export default function PageHero({ title, subtitle }: { title: string; subtitle?: ReactNode }) {
  return (
    <div className="shell flex flex-col items-center gap-s16 pt-s250 text-center">
      <h1 className="h-page">{title}</h1>
      {subtitle && (
        <p className="max-w-[803px] font-body text-f18 leading-[1.4] text-white/60">{subtitle}</p>
      )}
    </div>
  )
}
