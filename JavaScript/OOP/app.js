// Object Oriented Programming (OOP)

// 4 Pillars
// 1) Inheritance
// 2) Polymorphism (Flexibility)
// 3) Encapsulation (Protected)
// 4) Abstraction

// {
// name: "ABC",
// age: 16
// getInfo: () => {}
// // }

class Person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  getInfo() {
    return `Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}`
  }
}
// const person1 = new Person("Rehman", 20, "Male");
// console.log("Person1 ==>", person1.getInfo());

// without any constructor, we can not make any objects from the class
class Student extends Person {
  #password
  constructor(id, className, timing, name, age, gender, password) {
    super(name, age, gender)
    this.id = id;
    this.className = className;
    this.timing = timing;
    this.#password = password;
  }

  getInfo() {
    return `Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}, ID: ${this.id}, Class Name: ${this.className}, Timing: ${this.timing}`
  }

  getInfo(id) {
    return `Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}, ID: ${id}, Class Name: ${this.className}, Timing: ${this.timing}`
  }

  getInfo(id, className) {
    return `Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}, ID: ${id}, Class Name: ${className}, Timing: ${this.timing}`
  }

  getPassword() {
    return this.#password
  }
}
const student1 = new Student(123, "WEB & APP", "12 - 3", "Bilal", 14, "Male", "Huzaifa@123")
// console.log("student1 ==>", student1.getInfo("123"));
// console.log("student1 ==>", student1.getInfo("456", "Animations"));

// console.log("check ==>", student1 instanceof Car);
console.log("check ==>", student1.name);
console.log("check ==>", student1.password); // this will not work
console.log("check ==>", student1.getPassword()); // this will not work



class Admin {
  #password

  constructor(password) {
    this.#password = password
  }

  login(password) {
    return password === this.#password
  }
}

const admin1 = new Admin("Huzaifa@123");
// console.log("admin1 ==>", admin1.password);
