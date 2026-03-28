import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from "../features/counter/counterSlice"
import ReduxSecond from './ReduxSecond'

export default function ReduxComponent() {
  const count = useSelector((state) => state.counter)
  const dispatch = useDispatch()
  console.log("count ==>", count);

  return (
    <div>
      <h1>ReduxComponent</h1>
      <h2>Count: {count}</h2>
      <div className='flex gap-2'>
        <button className='border-2'
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button className='border-2'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>


      <ReduxSecond />
    </div>
  )
}