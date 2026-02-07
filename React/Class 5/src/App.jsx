
// 1) useEffect is used for side-effects handling
// 2) if useEffect dependency list is empty, it renders just one time
// 3) if we don't provide dependency list, it runs on every rerender
// 4) if we provide a state, it runs based on that state

// 5) A component that renders another component

// 6) Providing a state to sub child componens is known as props drilling

// import { useEffect, useState } from "react"

// function App() {
//   const [count, setCount] = useState(0)
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const getUsers = () => {
//       fetch("https://jsonplaceholder.typicode.com/users")
//         .then(res => res.json())
//         .then(data => console.log("data ==>", data))
//     }
//     getUsers();
//   }, [isVisible, count])

//   const handleCount = () => {
//     setCount(count + 1)
//     // console.log("chal gaya")
//   }

//   console.log("count ==>", count);
//   return (
//     <div>
//       <h1>App</h1>

//       <p>{count}</p>

//       <button onClick={handleCount}>
//         Add
//       </button>

//       <button onClick={() => setIsVisible(!isVisible)}>
//          Is Visible
//       </button>
//     </div>
//   )
// }

// export default App


// import React from 'react'
// import LandingPage from './components/LandingPage'
// import Button from './components/Button'

// function App() {
//   const updateProfile = () => {
//     console.log("updateProfile clicked");
//   }

//   const createTodo = () => {
//     console.log("createTodo clicked");
//   }

//   const deleteTodo = () => {
//     console.log("deleteTodo clicked");
//   }


//   return (
//     <div>

//       <LandingPage>
//         <h1>Home Page</h1>
//         <Button handleClick={updateProfile}>
//           Update Profile
//         </Button>
//       </LandingPage>


//       <LandingPage>
//         <h1>About Page</h1>
//         <Button handleClick={createTodo}>
//           createTodo
//         </Button>
//       </LandingPage>

//       <LandingPage>
//         <h1>Contact Page</h1>
//         <Button handleClick={deleteTodo}>
//           Delete Todo
//         </Button>
//       </LandingPage>
//     </div>
//   )
// }

// export default App


import React from 'react'
import Dashboard from './components/Dashboard'

export default function App() {
  const user = {
    name: "Huzaifa"
  }

  return (
    <div>
      <Dashboard user={user} />
    </div>
  )
}