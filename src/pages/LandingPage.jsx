import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import Stats from '../components/landing/Stats'
import Services from '../components/landing/Services'
import WhyUs from '../components/landing/WhyUs'
import Process from '../components/landing/Process'
import About from '../components/landing/About'
import Pricing from '../components/landing/Pricing'
import Contact from '../components/landing/Contact'
import Footer from '../components/landing/Footer'

function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-0">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <Stats />
      <div className="accent-line max-w-6xl mx-auto" />
      <Services />
      <WhyUs />
      <Process />
      <About />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  )
}

export default LandingPage
