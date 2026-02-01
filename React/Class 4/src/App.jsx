import Headers from "./components/Headers"
import "./App.css"
import { useState } from "react";
import Counter from "./components/Counter";
import Login from "./components/Login";

function App() {
  // let name = "Huzaifa"
  const [name, setName] = useState("Pakistan")
  // const [counter, setCounter] = useState()
  // const [address, setAddress] = useState()

  // const updateName = () => {
  //   console.log("function called");
  //   // name = "Usman"

  //   setName("Karachi")

  //   console.log("after updatation ==>", name);
  // }

  return (
    <div>
      {/* <Headers title={name} />

      <button onClick={updateName}>Update Name</button>

      <Counter /> */}

      <Login />

    </div>
  )
}

export default App