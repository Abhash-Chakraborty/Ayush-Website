import { useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "COMMERCIAL REEL",
    category: "ADVERTISING",
    image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "BRAND STORY",
    category: "DOCUMENTARY",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "MUSIC VIDEO",
    category: "CREATIVE",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "FASHION EDIT",
    category: "EDITORIAL",
    image:
      "https://images.unsplash.com/photo-1642072130544-7cb9796534fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
]

export function HorizontalProjects() {
  const componentRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slider = sliderRef.current
      if (!slider) return

      // Calculate the total width of the slider minus the viewport width
      // This gives us the distance we need to scroll horizontally
      const totalWidth = slider.scrollWidth
      const windowWidth = window.innerWidth
      const scrollDistance = totalWidth - windowWidth

      gsap.to(slider, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top top", // Ensure it starts pinning exactly when it hits the top
          pin: true,
          scrub: 1,
          // The scroll duration (height) is proportional to the horizontal width
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
          refreshPriority: 5,
        },
      })
    }, componentRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={componentRef} className="relative bg-black overflow-hidden min-h-screen">
      <div
        ref={sliderRef}
        className="flex h-screen items-center w-fit px-20 gap-20 will-change-transform"
      >
        {/* Intro Card */}
        <div className="h-[70vh] w-[40vw] shrink-0 flex flex-col justify-center">
          <h2 className="font-display text-8xl font-bold text-white mb-8">
            SELECTED
            <br />
            <span className="text-red-600">WORKS</span>
          </h2>
          <p className="text-white/60 text-xl max-w-md">
            A curated collection of projects that define my visual style and storytelling approach.
          </p>
        </div>

        {/* Project Cards */}
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative h-[70vh] w-[50vw] shrink-0 overflow-hidden bg-neutral-900"
          >
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-10 w-full">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-10 bg-red-600"></span>
                <span className="text-xs font-bold tracking-widest uppercase text-red-500">
                  {project.category}
                </span>
              </div>
              <h3 className="font-display text-6xl font-bold text-white group-hover:text-red-500 transition-colors">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
