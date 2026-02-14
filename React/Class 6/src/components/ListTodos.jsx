import { SnackbarProvider } from "notistack";
import { useState } from "react";
import EditModal from "./Modal";
import TodosTable from "./TodosTable";

function ListTodos({ data, loading }) {
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelecteTodo] = useState()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = async (item) => {
    handleOpen()
    setSelecteTodo(item)
  }

  return (
    <div>
      <SnackbarProvider>
        {
          loading && (
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          )
        }

        <TodosTable data={data} handleEdit={handleEdit} />

        <EditModal selectedTodo={selectedTodo} open={open} handleClose={handleClose} />
      </SnackbarProvider>
    </div>
  )
}

export default ListTodos