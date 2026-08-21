import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Experiences from '@/components/home/Experiences'
import Replays from '@/components/home/Replays'
import HowItWorks from '@/components/home/HowItWorks'
import Pricing from '@/components/home/Pricing'
import Location from '@/components/home/Location'
import Events from '@/components/home/Events'
import Gallery from '@/components/home/Gallery'
import FAQ from '@/components/home/FAQ'
import AppSection from '@/components/home/AppSection'
import VisitVip from '@/components/home/VisitVip'

/**
 * Section order follows the questions a first-time visitor asks, in order:
 * what is this (Hero/About) → what would I come for (Experiences) → what makes
 * it different (Replays) → how do I actually do it (HowItWorks) → what does it
 * cost (Pricing) → where is it (Location) → can I bring a group (Events) →
 * what does it look like (Gallery) → everything else (FAQ).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experiences />
      <Replays />
      <HowItWorks />
      <Pricing />
      <Location />
      <Events />
      <Gallery />
      <FAQ />
      <AppSection />
      <VisitVip />
    </>
  )
}
