// 1) vite react project initialize
// 2) what is component
// 3) what is virtual DOM
// 4) fragment
// 5) attribute changed to props
// 6) if we want to use JS in react, we use {}
// 7) inline styling
// 8) external css
// 9) Image Handling
// 10) component usage


// Pillars of React
// 1) Components
// 2) Props
// 3) States
// 4) Hooks


import "./App.css"
import boyImage from "./assets/imag1.png"
import img2 from "./assets/imag2.avif"
import { Footer } from "./components/Footer";
// import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";

// rfc, rfce, rafc, rafce


function App() {
  const name = "Huzaifa";
  return (
    <>
      {/* <h1>{name}</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem repudiandae nihil consequatur laboriosam ipsa nemo, quod ratione totam. Facilis hic, maiores cum nisi itaque quas fugiat autem nam quidem consequatur!</p> */}

      {/* Public URL way */}
      {/* <img src="https://png.pngtree.com/png-vector/20230728/ourmid/pngtree-freepik-clipart-cartoon-man-in-glasses-holding-a-paint-brush-vector-png-image_6808710.png" alt="" /> */}


      {/* Import Image Handling */}
      {/* <img src={boyImage} alt="" />
      <img src={img2} alt="" /> */}

      {/* Public folder way */}
      {/* <img src="/assets/images/imag1.png" alt="" />
      <img src="/assets/images/imag2.avif" alt="" /> */}

      {/* Opening clossing component */}
      {/* <Header></Header> */}

      {/* Self clossing component */}
      {/* <Footer /> */}


      {/* <Header />
      <Footer /> */}

      <Home />
    </>
  )
}

export default App