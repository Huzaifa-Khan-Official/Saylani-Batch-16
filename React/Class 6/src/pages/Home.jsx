import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore';
import TodoInput from '../components/TodoInput';
import ListTodos from '../components/ListTodos';
import { db } from '../config/firebase-config';
import { Link } from 'react-router';

export default function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    onSnapshot(collection(db, "todos"), (querySnapshot) => {
      let todos = []
      querySnapshot.forEach((doc) => {
        todos.push({
          ...doc.data(),
          id: doc.id
        })
      });
      todos.sort((a, b) => a.create_at - b.create_at)
      setData(todos)
      setLoading(false)
    });
  }, [])

  return (
    <div>
      <h1 className='text-xl font-bold underline'>
        Todo Website
      </h1>
      <Link to="/auth">Login</Link>
      {/* <a href="/auth">Login</a> */}

      <TodoInput  />
      <ListTodos loading={loading} data={data} />
    </div>
  )
}