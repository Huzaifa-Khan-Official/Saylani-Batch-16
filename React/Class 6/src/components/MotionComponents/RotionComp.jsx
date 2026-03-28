import { motion } from "motion/react"


export default function RotionComp() {
  return (
    <motion.div className="bg-green-600 hover:bg-green-500 w-20 h-20 p-5"
      initial={{ scale: 0 }}
      animate={{
        rotate: 360,
        transition: { duration: 2 },
        scale: 1
      }}
      whileHover={{
        scale: 2,
        transition: { duration: 2 },

      }}
    >

    </motion.div>
  )
}