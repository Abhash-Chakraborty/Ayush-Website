import { motion } from "motion/react"
import { useState, useEffect } from "react"
import { Magnetic } from "./ui/magnetic"

const BRAND_NAME = "AYUSH MANU"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 mix-blend-difference ${
        isScrolled ? "py-4" : "py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          <span className="font-display text-xl font-bold tracking-tighter text-white">
            {BRAND_NAME}
          </span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          {["Work", "About", "Contact"].map((item) => (
            <button
              key={item}
              type="button"
              className="text-sm uppercase tracking-widest text-white/70 hover:text-red-500 transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        <Magnetic>
          <button
            type="button"
            className="hidden md:block px-6 py-2 border border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Let's Talk
          </button>
        </Magnetic>
      </div>
    </motion.header>
  )
}
