import { ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { database } from "./config.js";

const submitBtn = document.getElementById("submitBtn");

// Create Fuctionality
submitBtn.addEventListener("click", () => {
  const todoInp = document.getElementById("todoInp")
  if (submitBtn.innerText == "Submit") {
    const todoRef = ref(database, "todos");
    push(todoRef, {
      text: todoInp.value
    })

    console.log("todo created successfully!");
    todoInp.value = ""
  } else {
    update(ref(database, `todos/${todoId}`), {
      text: todoInp.value
    })

    todoInp.value = ""

    submitBtn.setAttribute("id", "submitBtn");
    submitBtn.innerText = "Submit"
  }
})

const todoRef = ref(database, "todos")
const todoList = document.getElementById("todoList");

onValue(todoRef, (todoCollection) => {
  todoList.innerHTML = ""
  todoCollection.forEach(todo => {
    todoList.innerHTML += `
    <li>
      <p>${todo.val().text}</p>
      <div>
      <button onclick="updateTodo('${todo.key}', '${todo.val().text}')">Edit</button> <!-- Edit Button -->
      <button onclick="deleteTodo('${todo.key}')">Delete</button>  <!-- Delete Button -->
      </div>
    </li>
    `
  });
})

window.updateTodo = updateTodoFuction

// delete function call
window.deleteTodo = deleteTodo

// Delete data functionality
function deleteTodo(id) {
  remove(ref(database, `todos/${id}`))
}


// update data functionality
// function updateTodoFuction(id, oldText) {
//   const newValue = prompt("Edit value", oldText)

//   if(!newValue) return

//   update(ref(database, `todos/${id}`), {
//     text: newValue
//   })
// }

var todoId;
function updateTodoFuction(id, oldText) {
  const todoInp = document.getElementById("todoInp");
  const submitBtn = document.getElementById("submitBtn");

  todoInp.value = oldText
  submitBtn.innerText = "Edit"
  submitBtn.setAttribute("id", "editBtn")
  todoId = id
}

// cloudinary, firebase hosting