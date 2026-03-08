import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../config/firebase-config";

const useTodos = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

  return [data, loading]
}

export default useTodos