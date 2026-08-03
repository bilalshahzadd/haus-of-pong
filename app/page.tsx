import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import HowItWorks from '@/components/home/HowItWorks'
import Experiences from '@/components/home/Experiences'
import Locations from '@/components/home/Locations'
import Gallery from '@/components/home/Gallery'
import AppSection from '@/components/home/AppSection'
import VisitVip from '@/components/home/VisitVip'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Experiences />
      <Locations />
      <Gallery />
      <AppSection />
      <VisitVip />
    </>
  )
}
