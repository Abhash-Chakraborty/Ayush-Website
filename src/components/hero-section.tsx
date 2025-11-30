import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const LOADING_FONTS = [
  "Times New Roman",
  "Courier New",
  "Brush Script MT",
  "Arial",
  "Impact",
  "Georgia",
  "Verdana",
  "Trebuchet MS",
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLSpanElement>(null)
  const [currentFont, setCurrentFont] = useState("var(--font-display)")

  // Font Roulette Effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    let timeout: NodeJS.Timeout

    const startRoulette = () => {
      let counter = 0
      interval = setInterval(() => {
        setCurrentFont(LOADING_FONTS[counter % LOADING_FONTS.length])
        counter++
      }, 50) // Rapid change every 50ms

      // Stop after 1.5 seconds
      timeout = setTimeout(() => {
        clearInterval(interval)
        setCurrentFont("var(--font-display)")

        // Elastic Pop Effect & Transition
        const tl = gsap.timeline()

        // 1. Pop up slightly
        tl.to([".hero-element-title-1", ".hero-element-title-2", ".hero-element-subtitle"], {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.05,
        })
          // 2. Snap back elastically
          .to(
            [".hero-element-title-1", ".hero-element-title-2", ".hero-element-subtitle"],
            {
              scale: 1,
              duration: 1.5,
              ease: "elastic.out(1, 0.3)",
              stagger: 0.05,
            },
            "-=0.15"
          )
          // 3. Fade out the cover smoothly once the text has settled
          .to(
            ".hero-solid-cover",
            {
              opacity: 0,
              duration: 1.5,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(".hero-solid-cover", { pointerEvents: "none" })
              },
            },
            "-=0.5"
          )
          // 4. Reveal other elements
          .to(
            ".hero-fade-elements",
            {
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            "<"
          )
      }, 1500)
    }

    startRoulette()

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    let ctx: gsap.Context

    const initAnimation = () => {
      ctx = gsap.context(() => {
        // Calculate dynamic origin based on the target letter position
        const getOrigin = () => {
          if (!targetRef.current || !maskRef.current) return "59% 48%" // fallback
          const targetRect = targetRef.current.getBoundingClientRect()
          const maskRect = maskRef.current.getBoundingClientRect()

          // Calculate center of target relative to the mask container
          const x = targetRect.left + targetRect.width / 2 - maskRect.left
          // Target the crossbar of the A (approx 52% down from top) to ensure we hit the white part
          const y = targetRect.top + targetRect.height * 0.65 - maskRect.top

          return `${x}px ${y}px`
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%", // Reduced from 400% back to 300%
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 10, // Higher priority to calculate first
          },
        })

        // Fade out the white overlay
        tl.to(
          ".hero-video-overlay",
          {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out",
          },
          0
        )

        // Scale the mask to zoom into the text
        tl.to(
          maskRef.current,
          {
            scale: 1500,
            duration: 0.85, // Finish zoom at 85% of scroll, leaving 15% for full video
            ease: "power2.in",
            transformOrigin: getOrigin(),
          },
          0
        )

        // Fade out elements early
        tl.fromTo(
          ".hero-fade-elements",
          { opacity: 1 },
          {
            opacity: 0,
            duration: 0.15,
          },
          0
        )
      }, containerRef)
    }

    initAnimation()

    // Re-calculate on resize to ensure perfect centering
    const handleResize = () => {
      if (ctx) ctx.revert()
      initAnimation()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (ctx) ctx.revert()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Layer 0: Fixed Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-80 mix-blend-overlay"
            autoPlay
            muted
            loop
            playsInline
            src="/bg-video.mp4"
          />
          <div className="hero-video-overlay absolute inset-0 bg-white/50 pointer-events-none" />
        </div>

        {/* Layer 1: The Mask (Black BG + White Text) */}
        {/* mix-blend-multiply: White Text reveals Video, Black BG hides Video */}
        <div
          ref={maskRef}
          className="absolute inset-0 z-10 bg-black mix-blend-multiply flex flex-col items-center justify-center"
        >
          <div className="hero-content-wrapper relative flex flex-col items-center">
            <div className="relative">
              <p className="hero-element-subtitle absolute -top-8 -left-4 md:-left-12 text-sm md:text-base font-display italic font-medium text-white/90 tracking-[0.2em] whitespace-nowrap">
                ( NOT JUST A )
              </p>
              <h1 className="hero-element-title-1 font-display text-[18vw] md:text-[15vw] leading-[0.8] font-bold text-white tracking-tighter text-center whitespace-nowrap select-none">
                VID<span ref={targetRef}>E</span>O
              </h1>
            </div>
            <h1 className="hero-element-title-2 font-display text-[18vw] md:text-[15vw] leading-[0.8] font-bold text-black tracking-tighter text-center whitespace-nowrap select-none -mt-2 md:-mt-6">
              <span
                className="text-transparent hover:text-red-600 transition-colors duration-500 cursor-default"
                style={{ WebkitTextStroke: "2px white" }}
              >
                EDITOR
              </span>
            </h1>
          </div>
        </div>

        {/* Layer 2: Loading Overlay (Solid Black + White/Outline Text) - Fades out after load */}
        <div className="hero-solid-cover absolute inset-0 z-50 bg-black flex flex-col items-center justify-center">
          <div className="hero-content-wrapper relative flex flex-col items-center">
            <div className="relative">
              <p
                className="hero-element-subtitle absolute -top-8 -left-4 md:-left-12 text-sm md:text-base font-display italic font-medium text-white/90 tracking-[0.2em] whitespace-nowrap transition-all duration-300"
                style={{ fontFamily: currentFont }}
              >
                ( NOT JUST A )
              </p>
              <h1
                className="hero-element-title-1 text-[18vw] md:text-[15vw] leading-[0.8] font-bold text-white tracking-tighter text-center whitespace-nowrap select-none transition-all duration-300"
                style={{ fontFamily: currentFont }}
              >
                VIDEO
              </h1>
            </div>
            <h1
              className="hero-element-title-2 text-[18vw] md:text-[15vw] leading-[0.8] font-bold text-black tracking-tighter text-center whitespace-nowrap select-none -mt-2 md:-mt-6 transition-all duration-300"
              style={{ fontFamily: currentFont, WebkitTextStroke: "2px white" }}
            >
              EDITOR
            </h1>
          </div>
        </div>

        {/* Subtitle and Line - Fade out on scroll */}
        <div className="hero-fade-elements opacity-0 absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center gap-4 pointer-events-none">
          <p className="text-white/60 text-sm md:text-base max-w-lg font-light tracking-wide text-center mix-blend-difference px-4">
            Crafting cinematic experiences through precise editing and motion design.
          </p>
          <div className="h-12 w-px bg-linear-to-b from-red-600 to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="hero-fade-elements opacity-0 absolute bottom-7 left-4 md:left-10 z-30">
          <p className="font-display text-[10px] md:text-xs text-white/40 -rotate-90 origin-bottom-left tracking-widest mix-blend-difference">
            EST. 2024
          </p>
        </div>

        <div className="hero-fade-elements opacity-0 absolute bottom-7 right-4 md:right-10 hidden md:block z-30">
          <p className="font-display text-[10px] md:text-xs text-white/40 tracking-widest mix-blend-difference">
            SCROLL TO EXPLORE
          </p>
        </div>
      </div>
    </section>
  )
}
