import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import moment from "moment";

function TodosTable({ data, handleEdit }) {
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      alert("Todo deleted successfully")
    } catch (error) {
      console.log("error ==>", error);
      alert("Something went wrong, Please try later")
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Todos ({data.length})</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Updaed At</TableCell>
            <TableCell align="left">Created AT</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No todo found, craete your first todo
                </TableCell>
              </TableRow>
            )
          }
          {data.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left">
                {row.todo}
              </TableCell>
              <TableCell align="left">
                {moment(row.updated_at).format('MMMM Do YYYY, h:mm:ss a')}
              </TableCell>
              <TableCell align="left">
                {moment(row.created_at).format('MMMM Do YYYY, h:mm:ss a')}
              </TableCell>
              <TableCell align="left">
                <div className="flex gap-2">
                  <Button variant="contained" color="secondary" onClick={() => handleEdit(row)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(row.id)}>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TodosTable