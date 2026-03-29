import gsap from "gsap";
import { useEffect, useRef } from "react"

function Navbar() {
  const titleRef = useRef();
  const headingRef = useRef();
  // const 
  useEffect(() => {
    // gsap.to(titleRef.current, {
    //   y: -10,
    //   duration: 1.5
    // })
    // gsap.fromTo(titleRef.current, {
    //   y: -10,
    //   opacity: 0
    // }, {
    //   y: 0,
    //   duration: 1.5,
    //   opacity: 1
    // })
    // gsap.fromTo("li", {
    //   y: -10,
    //   opacity: 0
    // }, {
    //   y: 0,
    //   opacity: 1,
    //   duration: 1.5,
    //   stagger: 0.3
    // })

    const navTimeline = gsap.timeline();

    navTimeline.fromTo(titleRef.current, {
      y: -10,
      opacity: 0
    }, {
      y: 0,
      duration: 1.5,
      opacity: 1
    })
    navTimeline.fromTo("li", {
      y: -10,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.3
    })
    navTimeline.fromTo(headingRef.current, {
      opacity: 0,
      scale: 0      
    }, {
      opacity: 1,
      scale: 1,
      duration: 1
    })


  }, [])

  return (
    <div>
      <div className="bg-cyan-200 flex justify-between p-2">
        <div ref={titleRef}>
          GSAP Tutorial
        </div>
        <div>
          <ul className="flex gap-2">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center h-screen items-center">
        <h1 ref={headingRef} className="text-4xl font-extrabold">GSAP Tutorial</h1>
      </div>
    </div>
  )
}

export default Navbar