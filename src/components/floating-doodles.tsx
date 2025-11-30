import { motion } from "motion/react"
import { Camera, Video, Film } from "lucide-react"

interface ArtifactProps {
  x: number
  y: number
  delay: number
  rotation?: number
  size?: number
}

// Film strip artifact
const FILM_STRIP_ITEMS = Array.from({ length: 8 }, (_, i) => i)

const FilmStrip = ({ x, y, rotation = 0, delay }: ArtifactProps) => (
  <motion.div
    className="absolute"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, rotate: rotation }}
    animate={{
      opacity: [0.03, 0.08, 0.03],
      rotate: [rotation, rotation + 10, rotation],
      y: [0, -30, 0],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
  >
    <div className="flex gap-1">
      {FILM_STRIP_ITEMS.map((i) => (
        <div
          key={`film-strip-${i}`}
          className="w-3 h-5 border border-red-500/30 bg-red-500/10"
        ></div>
      ))}
    </div>
  </motion.div>
)

// Circle artifact
const CircleArtifact = ({ x, y, size, delay }: ArtifactProps) => (
  <motion.div
    className="absolute rounded-full border-2 border-red-500/20"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size}px`,
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.3, 0.1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 25,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
  />
)

// Plus sign
const PlusSign = ({ x, y, delay }: ArtifactProps) => (
  <motion.div
    className="absolute text-red-500/20"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      opacity: [0.2, 0.5, 0.2],
      rotate: [0, 90, 180, 270, 360],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
  >
    <div className="text-6xl">+</div>
  </motion.div>
)

export function FloatingDoodles() {
  const doodles = [
    { Icon: Camera, x: 10, y: 15, delay: 0, id: "camera-1" },
    { Icon: Film, x: 85, y: 25, delay: 0.5, id: "film-1" },
    { Icon: Video, x: 20, y: 70, delay: 1, id: "video-1" },
    { Icon: Camera, x: 90, y: 80, delay: 1.5, id: "camera-2" },
    { Icon: Film, x: 50, y: 10, delay: 2, id: "film-2" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated icons */}
      {doodles.map((doodle) => (
        <motion.div
          key={doodle.id}
          className="absolute opacity-20"
          style={{
            left: `${doodle.x}%`,
            top: `${doodle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 8,
            delay: doodle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <doodle.Icon className="w-12 h-12 text-red-600" strokeWidth={1} />
        </motion.div>
      ))}

      {/* Film strip artifact */}
      <FilmStrip x={5} y={40} delay={0} />
      <FilmStrip x={92} y={60} delay={1} />

      {/* Circle artifacts */}
      <CircleArtifact x={15} y={85} size={60} delay={0.5} />
      <CircleArtifact x={80} y={15} size={80} delay={1.5} />
      <CircleArtifact x={45} y={90} size={50} delay={2} />

      {/* Plus signs */}
      <PlusSign x={25} y={20} delay={0} />
      <PlusSign x={70} y={75} delay={1} />
      <PlusSign x={60} y={35} delay={2} />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
