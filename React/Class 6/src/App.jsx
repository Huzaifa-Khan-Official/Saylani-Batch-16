import { useEffect, useState } from 'react'
import TodoInput from './components/TodoInput'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './config/firebase-config';
import ListTodos from './components/ListTodos';

export default function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    onSnapshot(collection(db, "todos"), (querySnapshot) => {
      let todos = []
      querySnapshot.forEach((doc) => {
        todos.push(doc.data())
      });
      todos.sort((a, b) => a.create_at - b.create_at)
      setData(todos)
      setLoading(false)
    });
  }, [])


  console.log("data ==>", data);

  return (
    <div>
      <h1 className='text-xl font-bold underline'>
        Todo Website
      </h1>

      <TodoInput />
      <ListTodos loading={loading} data={data} />
    </div>
  )
}