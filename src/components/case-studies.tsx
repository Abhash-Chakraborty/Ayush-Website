import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ScrollAnimationWrapper } from "./scroll-animation-wrapper"
import { motion, AnimatePresence } from "motion/react"

const caseStudies = [
  {
    id: 1,
    title: "Case Study 1",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    client: "Volkswagen",
    category: "Automotive",
  },
  {
    id: 2,
    title: "Case Study 2",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    client: "Adventure Co.",
    category: "Travel",
  },
  {
    id: 3,
    title: "Case Study 3",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    client: "Auto Guide",
    category: "Review",
  },
]

export function CaseStudies() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="relative py-32 bg-[#050505] text-white">
      <div className="container mx-auto px-6">
        <ScrollAnimationWrapper>
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center mb-20">
              <p className="text-red-500 uppercase tracking-[0.5em] text-sm mb-4">
                Behind the Scenes
              </p>
              <h2 className="handwriting text-6xl md:text-8xl text-white mb-6">Case Studies</h2>
              <p className="text-white/60 text-lg">Deep dives into successful projects</p>
            </div>

            {/* Carousel */}
            <div className="relative flex items-center gap-8">
              {/* Left Arrow */}
              <motion.button
                type="button"
                onClick={handlePrev}
                className="shrink-0 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all z-10"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-8 h-8" />
              </motion.button>

              {/* Video Player */}
              <div className="flex-1 bg-neutral-900 rounded-4xl overflow-hidden shadow-2xl relative ring-1 ring-white/10">
                <div className="aspect-video relative">
                  <AnimatePresence initial={false} mode="wait" custom={direction}>
                    <motion.video
                      key={caseStudies[currentIndex].id}
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="w-full h-full object-cover absolute inset-0"
                      controls
                      preload="metadata"
                    >
                      <source src={caseStudies[currentIndex].videoUrl} type="video/mp4" />
                      <track kind="captions" />
                    </motion.video>
                  </AnimatePresence>
                </div>

                {/* Case Study Info */}
                <motion.div
                  key={caseStudies[currentIndex].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-8 md:p-12"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-1.5 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                      {caseStudies[currentIndex].category}
                    </span>
                    <span className="text-white/80 text-sm uppercase tracking-widest border-l border-white/20 pl-4">
                      {caseStudies[currentIndex].client}
                    </span>
                  </div>
                  <h3 className="handwriting text-white text-5xl md:text-6xl">
                    {caseStudies[currentIndex].title}
                  </h3>
                </motion.div>
              </div>

              {/* Right Arrow */}
              <motion.button
                type="button"
                onClick={handleNext}
                className="shrink-0 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all z-10"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-8 h-8" />
              </motion.button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-3 mt-12">
              {caseStudies.map((study, index) => (
                <button
                  type="button"
                  key={study.id}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentIndex ? "w-12 bg-red-600" : "w-3 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  )
}
