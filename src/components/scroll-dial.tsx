import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ScrollDial() {
  const dialRef = useRef<HTMLDivElement>(null)
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const percentageObj = { val: 0 }

    // Initial Loading Animation
    const introTl = gsap.timeline()

    // 1. Rotate Dial 360 -> 0
    introTl.fromTo(
      dialRef.current,
      { rotation: 360 },
      {
        rotation: 0,
        duration: 2,
        ease: "back.out(1.2)", // Satisfying ease
      }
    )

    // 2. Count up 0 -> 100
    gsap.to(percentageObj, {
      val: 100,
      duration: 2,
      ease: "circ.out",
      onUpdate: () => setPercentage(Math.round(percentageObj.val)),
      onComplete: () => {
        setPercentage(0)

        // 3. Enable Scroll Interaction
        // Rotate 0 -> 360 based on scroll
        gsap.to(dialRef.current, {
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5, // Slightly tighter scrub for more responsive feel
            onUpdate: (self) => {
              setPercentage(Math.round(self.progress * 100))
            },
          },
        })
      },
    })

    return () => {
      introTl.kill()
      ScrollTrigger.getAll().forEach((t) => {
        t.kill()
      })
    }
  }, [])

  return (
    <div className="fixed bottom-12 right-12 z-50 hidden md:flex items-center justify-center pointer-events-none mix-blend-difference">
      {/* Red Indicator Triangle */}
      <div className="absolute top-0 -translate-y-2 z-10">
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
      </div>

      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Rotating Container (Intro + Scroll) */}
        <div
          ref={dialRef}
          className="absolute inset-0 w-full h-full rounded-full border border-white/10 bg-black/90 backdrop-blur-md shadow-2xl"
        >
          <div className="w-full h-full">
            {/* Ticks generated via SVG */}
            <svg
              className="absolute inset-0 w-full h-full p-1"
              viewBox="0 0 100 100"
              aria-label="Scroll Progress Dial"
            >
              <title>Scroll Progress Dial</title>
              {[...Array(60)].map((_, i) => {
                const angle = (i / 60) * 360
                const isMajor = i % 5 === 0
                const isCardinal = i % 15 === 0
                return (
                  <line
                    key={`tick-${i}`}
                    x1="50"
                    y1="4"
                    x2="50"
                    y2={isCardinal ? "12" : isMajor ? "10" : "7"}
                    stroke={isCardinal ? "#dc2626" : "white"}
                    strokeWidth={isCardinal ? "2" : isMajor ? "1.5" : "0.5"}
                    strokeOpacity={isCardinal ? "1" : isMajor ? "0.8" : "0.3"}
                    transform={`rotate(${angle} 50 50)`}
                  />
                )
              })}
            </svg>

            {/* Inner Ring */}
            <div className="absolute inset-6 rounded-full border border-white/5"></div>
          </div>
        </div>

        {/* Static Center Text */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <span className="text-[8px] font-display tracking-[0.2em] text-white/40 mb-0.5">
            ZOOM
          </span>
          <span className="text-sm font-bold font-mono text-white tabular-nums tracking-tighter">
            {percentage}
            <span className="text-[10px] text-red-500 ml-0.5">%</span>
          </span>
        </div>
      </div>
    </div>
  )
}
