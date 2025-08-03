// var str = prompt("Enter some text"); 
// var numChars = str.length;

// for (var i = 0; i < numChars; i++) {
//   console.log("str.slice(i, i + 2) ==>", str.slice(i, i + 2));
//   console.log("condition ==>", str.slice(i, i + 2) === "  ");

// 	if (str.slice(i, i + 2) === "  ") {
    
// 	  alert("No double spaces!");

// 	break;

// 	}
// }

// var text = "Pak Karachi Pak"
//               //starting index of Kar // 4
//               // text.slice(0, index) ==> text.slice(0, 4) (0 ==> 3) "Pak "
//               // text.slice(0, 4) + "Pak" + text.slice(4 + Pak)

// var firstChar = text.indexOf("Karachi");
// if (firstChar !== -1) {
//   text = text.slice(0, firstChar) + "Pakistan" + text.slice(firstChar + 3);
// }

// console.log(text);


// var text = "Pak Karachi Pak Karachi"
// var tochange = "Karachi"
// var withchange = "Pakistan"
//               //starting index of Kar // 4
//               // text.slice(0, index) ==> text.slice(0, 4) (0 ==> 3) "Pak "
//               // text.slice(0, 4) + "Pak" + text.slice(4 + Pak)

// var firstChar = text.indexOf("Karachi");
// if (firstChar !== -1) {
//   text = text.slice(0, firstChar) + withchange + text.slice(firstChar + tochange.length);
// }

// console.log(text);


// var text = "Pak Karachi Pak Karachi"
// // var newText = text.replaceAll("Karachi", "Pakistan")
// var newText = text.replace(/Karachi/g, "Pakistan")

// console.log(text);
// console.log(newText);

// console.log(Math.round(9.76));
// console.log(Math.ceil(0.09999));

// console.log(Math.ceil(2.1));
// console.log(Math.floor(2.9));

// console.log(Math.round(Math.random() * 8));

// var age = prompt("Enter your age: ")

// var result = age - 18

// console.log(result);


// var text = "200"
// console.log(parseInt(text) + 15)

// var text = "200.01"
// console.log(parseInt(text) + 15)

// var text = "200.01"
// console.log(parseFloat(text) + 15)


// var num = 123456.456789

// console.log("My lucky number is " + num.toString());

// var text = "200.01"
// typeof((Number(text) + 15).toString())

// var text = "200.01"
// typeof((Number(text) + 15))


// var num = 5698.98794236789816589798687
// console.log(num.toFixed());


// var currentDate = new Date()
// console.log(currentDate.toString());
// console.log(currentDate.getDate());

var days = ["Sun", "Mon", "Tue", "Wed","Thur", "Fri", "Sat"]
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "August", "Sept"]

// console.log(months[currentDate.getMonth()]);

// console.log(currentDate.getDay());

// console.log(currentDate.getTime() / (1000 * 60 * 60 * 24));

var newDate = new Date("30-Sep-2004")
var currentDate = new Date()

var diff = currentDate.getTime() - newDate.getTime()

console.log(diff / (1000 * 60 * 60 * 24 * 365));