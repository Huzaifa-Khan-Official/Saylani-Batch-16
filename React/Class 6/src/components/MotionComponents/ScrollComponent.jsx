import { motion } from "motion/react"

export default function ScrollComponent() {
  return (
    <motion.div
      className="h-40 bg-emerald-300"
      initial={{
        translateY: 100
      }}
      whileInView={{
        translateY: 0,
        transition: {
          duration: 2
        }
      }}
      
    >ScrollComponent

      <div>
        <motion.h1
          className="py-5"
          initial={{
            translateX: 200
          }}
          whileInView={{
            translateX: 0,
            transition: {
              duration: 1.5
            }
          }}
        >Heading 1</motion.h1>
        <motion.h1
          className="py-5"
          initial={{
            translateX: -200
          }}
          whileInView={{
            translateX: 0,
            transition: {
              duration: 1.5
            }
          }}
        >Heading 2</motion.h1>
      </div>
    </motion.div>
  )
}