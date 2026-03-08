// import { memo, useCallback, useState } from "react"

// const Button = memo(({ children, className, onClick }) => {
//   console.log("rendered ", children, " Component");


//   return (
//     <button className={`py-2 px-4 border-2 border-gray-300 rounded-md ${className}`} onClick={onClick}>
//       {children}
//     </button>
//   )
// })

// const MemoComponent = memo(() => {
//   console.log("Memo component rendered");

//   return (
//     <h1>Memo Component</h1>
//   )
// })

// export default function UseCallback() {
//   const [count, setCount] = useState(0)
//   const [name, setName] = useState("USER1")

//   const updateCount = useCallback(() => {
//     console.log("update count function called");
//     setCount(count + 1)
//   }, [])

//   const updateName = useCallback(() => {
//     console.log("update name function called");
//     setName("ABC")
//   }, [])

//   console.log("Parent rerender");


//   return (
//     <div>UseCallback
//       <div>
//         <h1>
//           Count: {count}
//         </h1>
//         <Button onClick={updateCount} className="bg-green-200 hover:bg-green-300 cursor-pointer">
//           Update Count
//         </Button>
//       </div>

//       <div>
//         <h1>
//           Name: {name}
//         </h1>
//         <Button onClick={updateName} className="bg-cyan-200 hover:bg-cyan-300 cursor-pointer">
//           Update Name
//         </Button>
//       </div>


//       <MemoComponent />
//     </div>
//   )
// }


// without useCallback hook

// street1 ==> handleClick1
// street2 ==> handleClick2

// city1 ==> handleClick1
// city2 ==> handleClick2



// with useCallbackhook

// abc1 ===> handleClick1
// xyz1 ==> handleClick2

// efg2 ==> handleClick2


import React from 'react'

class UseCallback extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}

export default UseCallback