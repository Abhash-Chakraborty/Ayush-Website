import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-content",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="bg-black text-white py-20 border-t border-white/10 overflow-hidden"
    >
      <div className="footer-content container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 md:gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.9]">
              LET'S CREATE
              <br />
              <span className="text-red-600">TOGETHER</span>
            </h2>
            <a
              href="mailto:ayushhmanu.works@gmail.com"
              className="text-lg md:text-2xl text-white/60 hover:text-white transition-colors border-b border-white/20 pb-1 hover:border-red-500"
            >
              ayushhmanu.works@gmail.com
            </a>
          </div>

          <div className="flex flex-row md:flex-col gap-4 md:gap-4 items-center md:items-end flex-wrap justify-center">
            {[
              { name: "Instagram", url: "https://www.instagram.com/ayushhmanu/" },
              { name: "YouTube", url: "https://www.youtube.com/@ayushhmanu" },
              { name: "LinkedIn", url: "https://www.linkedin.com/in/ayushhmanu/" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/40 hover:text-red-500 transition-colors border border-white/10 md:border-0 px-6 py-3 md:p-0 rounded-full md:rounded-none bg-white/5 md:bg-transparent hover:bg-white/10"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-white/20 uppercase tracking-[0.2em]">
          <p>© 2025 AYUSH MANU</p>
          <p>ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  )
}
