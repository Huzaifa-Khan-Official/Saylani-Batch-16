// import { useEffect, useRef } from "react"
// import { gsap } from "gsap"
import Navbar from "./components/Navbar";

import ScrollComponent from "./components/ScrollComponent"

function App() {
  // const box1Ref = useRef();
  // const box2Ref = useRef();

  // useEffect(() => {
  //   gsap.from(box1Ref.current, {
  //     x: 100,
  //     duration: 2,
  //     delay: 0.5,
  //     borderRadius: 100,
  //     rotate: 360
  //   })
  // }, [])

  // useEffect(() => {
  //   gsap.fromTo(box2Ref.current, {
  //     x: 100,
  //     duration: 2,
  //     delay: 0.5,
  //     borderRadius: 100,
  //     rotate: 360
  //   }, {
  //     x: 0,
  //     borderRadius: 0,
  //     rotate: 360
  //   })
  // }, [])

  // useEffect(() => {
  //   gsap.to(box1Ref.current, {
  //     y: 20,
  //     ease: "power1",
  //     scale: 2
  //   })
  // }, [])

  return (
    <div>
      <Navbar />
      {/* App */}

      {/* <div ref={box1Ref} className="bg-green-500 w-20 h-20"></div> */}

      {/* <div ref={box2Ref} className="bg-cyan-500 w-20 h-20"></div> */}

      <ScrollComponent />
    </div>
  )
}

export default App