import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Lightbulb, PenTool, Film, Scissors, Palette, Rocket } from "lucide-react"

let gsapRegistered = false

if (typeof window !== "undefined" && !gsapRegistered) {
  gsap.registerPlugin(ScrollTrigger)
  gsapRegistered = true
}

const steps = [
  {
    id: 1,
    title: "Discovery",
    subtitle: "Vision mapping",
    description:
      "We sync on goals, tone, audience, and emotions so every later decision supports one clear story arc.",
    icon: Lightbulb,
    accent: "from-red-600 to-white/80",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    title: "Script & Boards",
    subtitle: "Narrative blueprint",
    description:
      "References, scripts, moodboards, and beat sheets define pacing before a single frame gets captured.",
    icon: PenTool,
    accent: "from-white to-red-500",
    image:
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    title: "Production Prep",
    subtitle: "Crew & camera",
    description:
      "Shot lists, locations, and production logistics snap into place to support a stress-free shoot day.",
    icon: Film,
    accent: "from-red-600 to-black",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 4,
    title: "Editorial",
    subtitle: "Cut & rhythm",
    description:
      "Assembly edits evolve through iterations, locking structure, pacing, and story clarity with clients.",
    icon: Scissors,
    accent: "from-black to-red-500",
    image:
      "https://images.unsplash.com/photo-1472437774355-71ab6752b434?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 5,
    title: "Color + Motion",
    subtitle: "Texture & mood",
    description:
      "Advanced grading, motion design, and FX add depth, guiding the viewer’s eye through every beat.",
    icon: Palette,
    accent: "from-red-500 to-white",
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 6,
    title: "Launch & Optimize",
    subtitle: "Delivery suite",
    description:
      "Masters export in every required format with custom thumbs, cutdowns, and a go-live optimization kit.",
    icon: Rocket,
    accent: "from-white to-red-500",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
  },
]

const btsImages = [
  {
    id: 1,
    label: "Color grading bay",
    location: "Los Angeles",
    src: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    label: "Grip & electric setup",
    location: "Brooklyn",
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    label: "Directing talent",
    location: "Toronto",
    src: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    label: "Rigging camera",
    location: "Berlin",
    src: "https://images.unsplash.com/photo-1520340356584-8f04cbd72d0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    label: "Sound design notes",
    location: "Remote",
    src: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    label: "Stage lighting",
    location: "Chicago",
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
  },
]

interface ProcessCardProps {
  step: (typeof steps)[number]
  variant: "desktop" | "mobile"
}

const ProcessCard = ({ step, variant }: ProcessCardProps) => {
  const sizing =
    variant === "desktop"
      ? "h-[65dvh] min-h-[420px] w-[60vw] min-w-[520px] max-w-[780px]"
      : "h-auto w-[80vw] min-w-[260px] max-w-[360px]"
  const snapClass = variant === "mobile" ? "snap-center" : ""

  return (
    <article
      className={`group relative shrink-0 overflow-hidden rounded-[40px] border border-white/10 bg-black text-white shadow-[0_35px_120px_-45px_rgba(0,0,0,1)] transition-transform duration-500 ${sizing} ${snapClass}`}
    >
      <img
        src={step.image}
        alt={step.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3), transparent 45%), radial-gradient(circle at 80% 10%, rgba(239,68,68,0.3), transparent 60%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-6 p-6 sm:p-8 md:p-10">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/60">
          <span>{step.subtitle}</span>
          <span className="rounded-full border border-white/30 px-3 py-1 text-[0.65rem] tracking-[0.2em]">
            {step.id.toString().padStart(2, "0")}
          </span>
        </div>

        <div>
          <div
            className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${step.accent} text-black shadow-2xl`}
          >
            <step.icon className="h-6 w-6" />
          </div>
          <h3 className="handwriting text-4xl leading-tight md:text-5xl">{step.title}</h3>
          <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
            {step.description}
          </p>
        </div>

        <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-white/20">
          <div
            className={`absolute inset-y-0 left-0 w-full origin-left scale-x-100 rounded-full bg-linear-to-r ${step.accent} transition-transform duration-500 group-hover:scale-x-110`}
          />
        </div>
      </div>
    </article>
  )
}

interface BtsImageCardProps {
  image: (typeof btsImages)[number]
  variant: "desktop" | "mobile"
}

const BtsImageCard = ({ image, variant }: BtsImageCardProps) => {
  const sizing = variant === "desktop" ? "aspect-[4/3] w-full" : "h-44 w-56 snap-center"
  return (
    <figure
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 text-white shadow-[0_20px_60px_-40px_rgba(0,0,0,1)] ${sizing}`}
    >
      <img
        src={image.src}
        alt={image.label}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80">
        <div className="flex items-center justify-between text-[0.6rem]">
          <span>{image.label}</span>
          <span className="text-white/50">{image.location}</span>
        </div>
      </figcaption>
    </figure>
  )
}

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  )

  useEffect(() => {
    if (typeof window === "undefined") return
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !isDesktop) return
    if (!containerRef.current || !trackRef.current || !progressRef.current) return

    const ctx = gsap.context(() => {
      const section = containerRef.current
      const track = trackRef.current
      const progress = progressRef.current
      if (!section || !track || !progress) return

      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" })

      gsap.to(track, {
        x: () => `-${Math.max(0, track.scrollWidth - window.innerWidth)}`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => {
            const distance = Math.max(0, track.scrollWidth - window.innerWidth)
            return `+=${distance + window.innerHeight}`
          },
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.to(progress, {
              scaleX: self.progress,
              ease: "none",
              duration: 0,
            })
          },
        },
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())
    }, containerRef)

    return () => ctx.revert()
  }, [isDesktop])

  if (!isDesktop) {
    return (
      <section
        ref={containerRef}
        className="relative overflow-hidden bg-[#040404] py-20 text-white"
      >
        <div className="absolute inset-0 bg-linear-to-b from-black via-black/90 to-black/60" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "140px 140px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-screen-sm space-y-4 px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-red-300">Process</p>
          <h2 className="handwriting text-5xl leading-tight">How the films come together</h2>
          <p className="text-white/70">
            Swipe horizontally to peek at every stage from discovery through delivery.
          </p>
        </div>

        <div className="relative mt-10 pl-4 sm:pl-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-[#040404] via-[#040404]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-[#040404] via-[#040404]/80 to-transparent" />
          <div className="flex gap-5 overflow-x-auto pb-10 pr-10 snap-x snap-mandatory">
            {steps.map((step) => (
              <ProcessCard key={step.id} step={step} variant="mobile" />
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-16 px-4 sm:px-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/50">
            <span>Behind the scenes</span>
            <span>Swipe to peek</span>
          </div>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-6 pr-6">
            {btsImages.map((image) => (
              <BtsImageCard key={image.id} image={image} variant="mobile" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh overflow-hidden bg-[#020202] text-white"
    >
      <div className="absolute inset-0 bg-linear-to-b from-black via-black/90 to-[#050505]" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(239,68,68,0.2), transparent 40%), radial-gradient(circle at 70% 0%, rgba(255,255,255,0.15), transparent 45%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "220px 220px",
        }}
      />

      <div className="relative z-10 flex h-dvh flex-col">
        <header className="mx-auto w-full max-w-screen-2xl px-6 pt-16 pb-12 md:px-12 lg:px-24">
          <p className="text-xs uppercase tracking-[0.5em] text-red-400">Process</p>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:gap-12">
            <h2 className="handwriting text-5xl leading-tight md:text-6xl lg:text-[4.5rem]">
              Scroll to move behind the scenes
            </h2>
            <p className="max-w-2xl text-base text-white/70">
              The section pins itself once it fills the viewport, then the timeline glides sideways
              revealing every milestone with luxurious pacing. Keep scrolling to resume the page
              once you pass delivery.
            </p>
          </div>
        </header>

        <div className="mx-auto w-full max-w-screen-2xl px-6 pb-10 md:px-12 lg:px-24">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/50">
            <span>Behind the scenes gallery</span>
            <span className="hidden md:inline">Snapshots from recent sets</span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {btsImages.map((image) => (
              <BtsImageCard key={image.id} image={image} variant="desktop" />
            ))}
          </div>
        </div>

        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-linear-to-r from-[#020202] via-[#020202]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-linear-to-l from-[#020202] via-[#020202]/80 to-transparent" />

          <div
            ref={trackRef}
            className="flex h-full items-center gap-12 px-6 md:px-12 lg:px-24 pr-[65vw] will-change-transform"
          >
            {steps.map((step) => (
              <ProcessCard key={step.id} step={step} variant="desktop" />
            ))}
          </div>

          <div className="absolute bottom-10 left-6 right-6 h-1.5 rounded-full bg-white/10 md:left-12 md:right-12">
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-0 rounded-full bg-linear-to-r from-red-600 via-white to-red-500"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
