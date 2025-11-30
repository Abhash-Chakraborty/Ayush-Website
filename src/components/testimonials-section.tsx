import { motion } from "motion/react"
import { ScrollAnimationWrapper } from "./scroll-animation-wrapper"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    text: "Amazing work! The video quality exceeded our expectations. Professional and timely delivery.",
    author: "John Doe",
    role: "CEO, TechCorp",
    rating: 5,
  },
  {
    id: 2,
    text: "Professional and creative. Highly recommended for any video editing project!",
    author: "Jane Smith",
    role: "Marketing Director",
    rating: 5,
  },
  {
    id: 3,
    text: "Delivered on time and with incredible attention to detail. A true professional.",
    author: "Mike Johnson",
    role: "Content Creator",
    rating: 5,
  },
  {
    id: 4,
    text: "The best video editor I've worked with! Exceptional quality and creativity.",
    author: "Sarah Williams",
    role: "Brand Manager",
    rating: 5,
  },
  {
    id: 5,
    text: "Creative storytelling at its finest. Will definitely work together again.",
    author: "David Brown",
    role: "Film Producer",
    rating: 5,
  },
  {
    id: 6,
    text: "Professional service and great communication throughout the entire process.",
    author: "Emily Davis",
    role: "Startup Founder",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollAnimationWrapper>
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="handwriting text-5xl md:text-6xl bg-linear-to-r from-red-500 via-red-700 to-black bg-clip-text text-transparent mb-4">
              What Clients Say
            </h2>
            <p className="text-gray-600 text-lg">Real feedback from real people</p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-linear-to-br from-white to-red-50 rounded-2xl p-6 shadow-lg border border-red-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(220, 38, 38, 0.25)",
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={`star-${testimonial.id}-${i}`}
                      className="w-5 h-5 fill-red-500 text-red-500"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-red-200">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-red-500 via-red-700 to-black flex items-center justify-center text-white">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  )
}
