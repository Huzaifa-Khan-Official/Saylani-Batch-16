// function toggleBulb() {
//   var image = document.getElementById("image");
//   var btn = document.getElementById("btn");

//   if (image.src.includes("/assets/bulbOff.jpg")) {
//     image.src = "./assets/bulbOn.jpg";
//     btn.innerText = "Off"
//   } else {
//     image.src = "./assets/bulbOff.jpg"
//     btn.innerText = "On"
//   }
// }

// var image = document.getElementById('image');
// function imageFun() {
//   image.className = "imageAnimate"
// }

// function changeAnimation() {
//   image.className += "changeAnimate"
// }

// var images = document.getElementsByTagName("img");

// console.log("images ==>", images);


// var rules = document.getElementById("rules");
// var paras = rules.getElementsByTagName("p");

// for (var para of paras) {
//   console.log("para ==>", para.innerText);
// }

// console.log("check ==>", document.childNodes[1].childNodes);


// var para = document.getElementById("para")

var input = document.getElementById("input");

function addTodo() {
  if (input.value == "") {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cancel'
    })
  } else {
    var ul = document.getElementById("output");
    var li = document.createElement("li");
    var counter = ul.childElementCount;

    li.innerHTML = "<div class='outputLi'>" + input.value + "<div><button onclick='editTodo(" + counter + ")'>Edit</button><button onclick='deleteTodo(" + counter + ")'>Delete</button></div></div>"
    li.setAttribute("id", counter)
    ul.appendChild(li)
    input.value = ""
  }
}

function deleteTodo(id) {
  var li = document.getElementById(id)
  li.remove();
}

// edit button, with id pass (Done)
// editBtn, get li with id (Done)
// get text of that li, and set the input value with the li text (Done)
// hide the add button, show the edit btn, (Done)
// add a function in the attribue onclick in edit btn (Done)
// make a function editTodoLi (Done)
// get the same li, set the value with new value; (Done)
// hide the edit btn, show the add btn.

var editLiId;
function editTodo(id) {
  var li = document.getElementById(id);
  // console.log("li ==>", li.childNodes[0].childNodes[0]);
  // console.log("text ==>", li.firstChild.firstChild.nodeValue);
  
  // input.value = li.childNodes[0].childNodes[0].nodeValue
  var text = li.firstChild.firstChild.nodeValue;
  input.value = text;
  document.getElementById("addBtn").style.display = "none";
  document.getElementById("editBtn").style.display = "inline-block";
  // editLiId = id;
}

function editTodoLi() {
  console.log("input ==>", input.value);
  var li = document.getElementById(editLiId);
  li.firstChild.firstChild.nodeValue = input.value;
  input.value = ""
  document.getElementById("addBtn").style.display = "inline-block";
  document.getElementById("editBtn").style.display = "none";
}