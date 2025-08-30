// function changeColor() {
//   var para = document.getElementsByClassName("para");

//   console.log("para ==>", para);

//   // para.style.color = "yellow"
//   para[0].style.color = "yellow"

// }

// var para = document.getElementById("para");

// function changeFontSize() {

//   // background-color
//   // para.style.backgroundColor = "lightpink"
//   // para.style.cursor = "pointer"
//   // para.style.fontSize = "36px"

//   para.className = "paraStyling"
// }

// function reverseTheStyling() {
//   para.className = "para"
// }

// function toggle() {
//   var navItems = document.getElementById("navItems");
//   var toggleBtn = document.getElementById("toggleBtn");

//   if (navItems.style.display == "none") {
//     navItems.style.display = "block"
//     toggleBtn.innerText = "Hide"
//   } else {
//     navItems.style.display = "none"
//     toggleBtn.innerText = "Show"
//   }

//   console.log("conditon ==>", navItems.style.display);
// }

// function toggle() {
//   var secondPara = document.getElementById("secondPara");
//   var toggleBtn = document.getElementById("toggleBtn");

//   if (secondPara.className == "secondParaHidden") {
//     secondPara.style.backgroundColor = "secondParaVisible"
//     toggleBtn.innerText = "Show Less"
//   } else {
//     secondPara.className = "secondParaHidden"
//     toggleBtn.innerText = "Show More"
//   }

//   console.log("display ==>", secondPara.style.display);

// }

// function submitForm() {
//   var input = document.getElementById("input");
//   console.log("input Value ==>", input.value);

// }

function cityCheck() {
  var zipCode = document.getElementById("zipCode").value;
  var city = document.getElementById("city")

  switch (zipCode) {
    case "123":
      city.value = "Karachi"
      break;

    case "456":
      city.value = "Lahore"
      break;

    default:
      city.value = "City Not Found"
      break;
  }
}