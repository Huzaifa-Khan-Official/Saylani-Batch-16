import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore"
import { db } from "../config/firebase-config";

export default function TodoInput() {
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAddTodo = async () => {
    console.log("value ==>", value);
    try {
      setLoading(true)
      const date = new Date();
      const docRef = await addDoc(collection(db, "todos"), {
        todo: value,
        created_at: date.getTime(),
        updated_at: date.getTime()
      });
      console.log("Document written with ID: ", docRef.id);
      setValue("")
    } catch (error) {
      console.log("error ==>", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col max-w-79 px-4 mt-4.5">
      <FormControl>
        <InputLabel>Todo</InputLabel>
        <Input onChange={(e) => setValue(e.target.value)} value={value} aria-describedby="todo-input" />
      </FormControl>

      <Button onClick={handleAddTodo}>
        {
          loading ? "Adding..." : "Add Todo"
        }
      </Button>
    </div>
  )
}