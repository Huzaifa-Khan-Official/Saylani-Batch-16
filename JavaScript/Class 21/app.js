// function calculate() {
//   var input = document.getElementById("input").value;
//   var dob = new Date(input);
//   var today = new Date();
//   var nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDay());

//   if (nextBirthday < today) {
//     nextBirthday.setFullYear(today.getFullYear() + 1)
//   }
//   var diff = nextBirthday.getTime() - today.getTime();

//   var days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   console.log("days ==>", days);




//   // if (today.getDate )


//   // var hours = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60 * 60))
//   // console.log("hours ==>", hours);


// }

// function change() {
//   var heading = document.getElementById("h1");
//   if (!heading.hasAttribute("class")) {
//     heading.setAttribute("class", "heading1 fontSize")
//   }
  
//   console.log("attributes", heading.attributes);
  
// }


// var students = ["student1", "student2", "student3"]
// console.log("studen1 ==>", students[0]);


// Object ==> key: value

// var student1 = {
//   name: "Bilal",
//   age: 16,
//   address: "Karachi",
// }

// console.log("students ==>", students.studen1);
// console.log("student1 ==>", student1.age);
student1.class = "2nd year";
student1.hobbies = ["circket", "cycling", "movies", "games"];
student1.hobbies.push("games")
if (student1.age >= 18) {
  student1.isEligible = true
} else {
  student1.isEligible = false
}
// console.log("studen1 ==>", student1);
// console.log("hobbies[1] ==>", student1.hobbies)

var student1 = {}
student1.name = "Bilal";
delete student1.name;

console.log("studen1.isEligbile ==>", "name" in student1);



