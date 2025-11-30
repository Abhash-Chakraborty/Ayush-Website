import { HeroSection } from "./components/hero-section"
import { HorizontalProjects } from "./components/horizontal-projects"
import { LongVideoProjects } from "./components/long-video-projects"
import { ClientsSection } from "./components/clients-section"
import { Footer } from "./components/footer"
import { Header } from "./components/header"
import { SmoothScroll } from "./components/smooth-scroll"
import { ScrollDial } from "./components/scroll-dial"

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-dvh bg-black text-white overflow-x-hidden font-sans">
        <Header />
        <ScrollDial />
        <main>
          <HeroSection />
          <HorizontalProjects />
          <LongVideoProjects />
          <ClientsSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
