
// memo ===> memoization
// memo memoized the component

import { memo } from "react";


// function ChildMemoComponent() {
//   console.log("child Component renders");


//   return (
//     <div>
//       Child Component run number:
//     </div>
//   )
// }

// export default memo(ChildMemoComponent)


export const ChildMemoComponent = memo(() => {
  console.log("child Component renders");
  return (
    <div>
      Child Component run number:
    </div>
  )
})


