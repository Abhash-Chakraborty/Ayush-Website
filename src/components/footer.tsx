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
      ref={footerRef}
      className="bg-black text-white py-20 border-t border-white/10 overflow-hidden"
    >
      <div className="footer-content container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <h2 className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-6">
              LET'S CREATE
              <br />
              <span className="text-red-600">TOGETHER</span>
            </h2>
            <a
              href="mailto:hello@ayushmanu.studio"
              className="text-xl md:text-2xl text-white/60 hover:text-white transition-colors border-b border-white/20 pb-1"
            >
              hello@ayushmanu.studio
            </a>
          </div>

          <div className="flex flex-col gap-4 text-right">
            {["Instagram", "Twitter", "YouTube", "LinkedIn"].map((social) => (
              <a
                key={social}
                href={`https://${social.toLowerCase()}.com`}
                className="text-sm uppercase tracking-widest text-white/40 hover:text-red-500 transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center text-xs text-white/20 uppercase tracking-widest">
          <p>© 2025 AYUSH MANU</p>
          <p>ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  )
}
