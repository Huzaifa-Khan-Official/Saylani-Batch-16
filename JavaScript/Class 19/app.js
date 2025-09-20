// console.log("document ==>", document.childNodes[1].childNodes[2].childNodes);


// var mainDiv = document.getElementById("mainDiv");

// console.log("paragraph ==>", mainDiv.childNodes[3].childNodes[0].nodeValue);


// var paragraph = document.getElementById("paragraph");

// console.log("div ==>", paragraph.previousSibling.previousSibling.nodeName);

// var li = document.getElementById("paragraph")

// console.log("li ==>", li);

// if () {

// }

// console.log("paragraph attributes ==>", document.getElementById("paragraph").getAttribute("class"));


function writeAttribute() {
  var paragraph = document.getElementById("paragraph");
  paragraph.setAttribute("class", "para1  para2 para3")
}
