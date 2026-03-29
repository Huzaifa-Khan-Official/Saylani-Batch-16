import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function ScrollComponent() {

  useEffect(() => {
    const boxes = gsap.utils.toArray(".box")

    const mm = gsap.matchMedia()

    boxes.forEach((box) => {
      gsap.fromTo(box,
        {
          opacity: 0,
          scale: 0,
          y: 10
        },
        {
          opacity: 1,
          scale: 1.5,
          duration: 2,
          borderRadius: 100,
          y: 0,
          scrollTrigger: {
            trigger: box,
            markers: true,
            start: "top 80%",
            end: "top 30%",
            scrub: true
          }
          // scrollTrigger: {
          //   trigger: box,
          //   start: "top 80%",
          //   end: "top 50%",
          //   scrub: true,
          //   markers: true // remove in production
          // }
        }
      )
    })

    mm.add("(min-width: 800px)", () => {
      boxes.forEach((box) => {
        gsap.fromTo(box,
          {
            opacity: 0,
            scale: 0,
            y: 10
          },
          {
            opacity: 1,
            scale: 1.5,
            duration: 2,
            borderRadius: 50,
            y: 0,
            ease: "elastic",
            scrollTrigger: {
              trigger: box,
              markers: true,
              start: "top 80%",
              end: "top 30%",
              scrub: true
            }
          }
        )
      })
    })
  }, [])

  return (
    <div>
      <div className="bg-blue-200 h-screen flex justify-center items-center">
        <div className="box bg-red-200 h-30 w-30"></div>
      </div>

      <div className="bg-amber-200 h-screen flex justify-center items-center">
        <div className="box bg-red-200 h-30 w-30"></div>
      </div>

      <div className="bg-cyan-400 h-screen flex justify-center items-center">
        <div className="box bg-red-200 h-30 w-30"></div>
      </div>
    </div>
  )
}

export default ScrollComponent