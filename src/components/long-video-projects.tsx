import { motion } from "motion/react"
import { Magnetic } from "./ui/magnetic"
import { useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const longFormProjects = [
  {
    id: 1,
    title: "THE ART OF EDITING",
    category: "DOCUMENTARY",
    duration: "12:45",
    image: "https://images.unsplash.com/photo-1579165466741-7f35e4755652?w=800&h=600&fit=crop",
    description:
      "A deep dive into the psychology of film editing and how it shapes the narrative structure.",
  },
  {
    id: 2,
    title: "URBAN EXPLORATION",
    category: "VLOG SERIES",
    duration: "08:20",
    image: "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?w=800&h=600&fit=crop",
    description: "Exploring the abandoned spaces of the city, uncovering stories lost to time.",
  },
  {
    id: 3,
    title: "CULINARY JOURNEY",
    category: "LIFESTYLE",
    duration: "15:30",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=800&h=600&fit=crop",
    description:
      "Following a master chef through the chaotic yet beautiful process of creating a signature dish.",
  },
]

const shortFormProjects = [
  {
    id: 1,
    title: "NIKE COMMERCIAL",
    category: "AD",
    views: "1.2M",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: 2,
    title: "TRAVEL REEL",
    category: "LIFESTYLE",
    views: "850K",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
  {
    id: 3,
    title: "FITNESS MOTIVATION",
    category: "SPORTS",
    views: "2.5M",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
]

export function LongVideoProjects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shortCardsRef = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // Mobile Animation - Full screen cards sliding over each other
        "(max-width: 767px)": () => {
          shortCardsRef.current.forEach((card, index) => {
            if (!card) return
            const nextCard = shortCardsRef.current[index + 1]

            if (nextCard) {
              gsap.to(card, {
                scale: 0.85,
                opacity: 0.3,
                ease: "none",
                scrollTrigger: {
                  trigger: nextCard,
                  start: "top bottom",
                  end: "top top",
                  scrub: 0.5,
                },
              })
            }
          })
        },
        // Desktop - No animation
        "(min-width: 768px)": () => {
          shortCardsRef.current.forEach((card) => {
            if (card) gsap.set(card, { clearProps: "all" })
          })
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="pt-0 pb-32 bg-black text-white relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6">
        {/* Long Form Section */}
        <div className="mb-20 pt-20">
          <h2 className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            LONG FORM
            <br />
            <span className="text-red-600">STORIES</span>
          </h2>
          <div className="h-1 w-20 bg-red-600"></div>
        </div>

        <div className="flex flex-col gap-32 mb-40">
          {longFormProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center`}
            >
              {/* Video Thumbnail / Preview */}
              <div className="w-full md:w-3/5 relative group cursor-pointer">
                <div className="relative overflow-hidden aspect-video bg-neutral-900 border border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 bg-black/20">
                      <div className="w-0 h-0 border-t-10 border-t-transparent border-l-18 border-l-white border-b-10 border-b-transparent ml-1"></div>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono">
                    {project.duration}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-2/5">
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-px w-10 bg-red-600"></span>
                  <span className="text-xs font-bold tracking-widest uppercase text-red-500">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-display text-4xl md:text-5xl font-bold mb-6 group-hover:text-red-500 transition-colors">
                  {project.title}
                </h3>

                <p className="text-white/60 text-lg leading-relaxed mb-8">{project.description}</p>

                <Magnetic>
                  <button
                    type="button"
                    className="text-sm uppercase tracking-widest border-b border-white/30 pb-1 hover:text-red-500 hover:border-red-500 transition-colors"
                  >
                    Watch Video
                  </button>
                </Magnetic>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Short Form Section */}
        <div className="mb-10 md:mb-20">
          <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter mb-6 text-right">
            SHORT FORM
            <br />
            <span className="text-red-600">CONTENT</span>
          </h2>
          <div className="h-1 w-20 bg-red-600 ml-auto"></div>
        </div>

        <div className="md:grid md:grid-cols-3 md:gap-8">
          {shortFormProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                shortCardsRef.current[index] = el
              }}
              className="sticky top-0 md:static h-dvh md:h-auto flex items-center justify-center md:block"
            >
              <div className="relative overflow-hidden w-full h-full md:aspect-9/16 bg-neutral-900 md:border md:border-white/10 md:shadow-2xl">
                <video
                  src={project.videoUrl}
                  className="w-full h-full object-cover md:opacity-80 md:group-hover:opacity-100 md:transition-transform md:duration-700 md:group-hover:scale-110"
                  autoPlay
                  muted
                  loop
                  playsInline
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-6">
                  <div className="flex items-center justify-between mb-3 md:mb-2">
                    <span className="text-sm md:text-xs font-bold tracking-widest uppercase text-red-500">
                      {project.category}
                    </span>
                    <span className="text-sm md:text-xs font-mono text-white/60 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-label="Views"
                      >
                        <title>Views</title>
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {project.views}
                    </span>
                  </div>
                  <h3 className="font-display text-4xl md:text-2xl font-bold text-white mb-1">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
