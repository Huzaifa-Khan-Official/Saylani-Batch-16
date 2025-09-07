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
  var ul = document.getElementById("output");
  var li = document.createElement("li");
  var counter = ul.childElementCount;

  li.innerHTML = "<div class='outputLi'>" + input.value + "<button onclick='deleteTodo(" + counter + ")'>Delete</button></div>"
  li.setAttribute("id", counter)
  ul.appendChild(li)
  input.value = ""
}

function deleteTodo(id) {
  var li = document.getElementById(id)
  li.remove();
}

// edit button, with id pass
// editBtn, get li with id
// get text of that li, and set the input value with the li text
// hide the add button, show the edit btn,
// add a function in the attribue onclick in edit btn
// make a function editTodo
// get the same li, set the value with new value;
// hide the edit btn, show the add btn.