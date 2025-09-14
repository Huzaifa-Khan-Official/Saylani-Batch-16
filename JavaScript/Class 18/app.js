// var text = "3.14234897";
// // parseInt & Number
// console.log("result ==>", new Date().currentDate());

// console.log("text ==>", text);

// console.log("index ==>", text.indexOf("e", 3));

// var date = new Date();
// var day = date.getDate();
// var month = date.getMonth();
// var year = date.getFullYear()
// var text = "August 14, 1947"
// var date = "September 14, 2025"
// var newDate = new Date();
// var day = newDate.getDay();
// var year = newDate.getFullYear();

// var newDate = new Date("1947, 7, 14");
// var date = newDate.getDate();
// var day = newDate.getDay();
// var month = newDate.getMonth();
// var year = newDate.getFullYear();
// var currentDate = month + " " + day + ", " + year;
// console.log("day ==>", newDate.toDateString());



// var randomNumber = 
// console.log("randomNumber ==>", Math.ceil(Math.random() * 9));
// console.log("randomNumber ==>", Math.ceil(8.994263169537328));


var x = 5; // global
function test() {
  var x = 10; // local
  return x; // local 10
}

x = test() // global 10
console.log("result ==>", test(), x);
