import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ selectedTodo, open, handleClose }) {
  const [updatedText, setUpdatedText] = useState(selectedTodo?.todo)

  const saveTodo = async (id) => {
    const todoRef = doc(db, "todos", id);
    const date = new Date();

    await updateDoc(todoRef, {
      todo: updatedText,
      updated_at: date.getTime()
    });

    handleClose()
    alert("Todo Updated Successfully")
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Todo
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField id="outlined-basic" label="Edit Todo" variant="outlined" defaultValue={selectedTodo?.todo} onChange={(e) => setUpdatedText(e.target.value)} value={updatedText} />

          <Button variant="contained" color="secondary" onClick={() => saveTodo(selectedTodo.id)}>
            Save
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
}
