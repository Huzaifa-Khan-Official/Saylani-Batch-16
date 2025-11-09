
// ----------Pass By Reference
// const obj1 = {
//   fullName: "Khan",
//   classDetails: {
//     courseName: "Web & Mobile App"
//   }
// }

// const obj2 = obj1;
// obj2.fullName = "Zohaib";

// console.log("obj2 ==>", obj2);
// console.log("obj1 ==>", obj1);


// const obj1 = {
//   fullName: "Khan",
//   classDetails: {
//     courseName: "Web & Mobile App"
//   }
// }

// const obj2 = {...obj1};
// obj2.fullName = "Zohaib";

// console.log("obj2 ==>", obj2);
// console.log("obj1 ==>", obj1);


// ------ Nested Pass By Reference
// const obj1 = {
//   fullName: "Khan",
//   classDetails: {
//     courseName: "Web & Mobile App",
//     timings: {
//       MWF: "12-1",
//       TTS: "3-4"
//     }
//   },
//   address: "sdfls",
//   key2: 'sdfkjsd'
// }

// // const obj2 = {...obj1};
// const obj2 = JSON.parse(JSON.stringify(obj1));
// obj2.fullName = "Zohaib";
// obj2.classDetails.courseName = "Animations"

// console.log("obj2 ==>", obj2);
// console.log("obj1 ==>", obj1);

// --------Shallow Copy 2nd method
// const obj1 = {
//   fullName: "Khan",
//   classDetails: {
//     courseName: "Web & Mobile App",
//     timings: {
//       MWF: "12-1",
//       TTS: "3-4"
//     }
//   },
//   address: "sdfls",
//   key2: 'sdfkjsd'
// }

// const obj2 = {...obj1};
// console.log("window ==>", window);
// console.log(Object.keys(window));

// const obj2 = Object.assign({}, obj1)
// const obj2 = JSON.parse(JSON.stringify(obj1));
// obj2.fullName = "Zohaib";
// obj2.classDetails.courseName = "Animations"

// console.log("obj2 ==>", obj2);
// console.log("obj1 ==>", obj1);


// ---- Closures

// sirf 5 numbers  addition
// 10 numbers addition
// 20 numbers addition

// const addition5Nums = (num) => {
//   return 5 + num
// }
// const addition10Nums = (num) => {
//   return 10 + num
// }
// const addition20Nums = (num) => {
//   return 20 + num
// }

// const addition = (parentNumber) => {
//   return (childNumber) => {
//     return parentNumber + childNumber
//   }
// }

// const addition5Nums = addition(5) // (childNumber) => { return parentNumber + childNumber}

// console.log(addition5Nums(15));
// console.log(addition5Nums(10));
// console.log(addition5Nums(1));
// console.log(addition5Nums(25));


// const addition10Nums = addition(10)


// ---- callback function

// setInterval, setTimeout ===> callback function accept

// let isLoading = true;

// const abc = () => {
//   console.log("order is ready, the rider is on the way");
//   isLoading = false;
//   console.log(isLoading);
// }

// console.log(isLoading);
// setTimeout(abc, 5000)

// // order place ==> wait, once completed, I will let you know, .

// const greet = (name, func: sayGoodBye) => {
//   console.log(`Hello, ${name}!`);


//   // debuggersdf
//   // sayGoodByedf
//   // SVGDefsElementsd
//   // funcsdf
//   // sayGoodByedff
//   // s
//   // func()
//   sayGoodBye()
// }

// const sayGoodBye = () => {
//   console.log("It's nice to meet you, we will meet soon in dreams");
// }

// greet("Sudais", sayGoodBye)


// const placeOrder = (foodItems, orderCompleted) => {
//   console.log(`Your order is in place for the following items: ${foodItems}`);
//   console.log("Cooking...");
//   setTimeout(orderCompleted, 5000)
  
// }

// const orderCompleted = () => {
//   console.log("Cooking Complted");
//   console.log("Your rider is on the way, its mobile number is +9223424234");
// }

// placeOrder("seekh kabab, naseeb biryani, zinger, pyaz roti", orderCompleted)


// const obj1 = {
//   fullName: "abc",
//   fn: () => {}
// }

// obj1.fn()

const createAccount = (fullName) => {
  let balance = 0;
  const name = fullName;

  return {
    deposit: (amount) => {
      if (amount <= 0) {
        alert("Amount should be greter than 0")
      } else {
        balance += amount
      }
    },
    withdraw: (amount) => {
      if (amount <= 0) {
        alert("Insuffient ammount")
      } else {
        balance -= amount;
        console.log(`Your current Balance after withdrawal of ${amount} is this: ${balance}`);
      }
    },
    getBalance: () => {
      console.log(`Your current Balance is: ${balance} for the following account: ${name}`);
    }
  }
}

const account1 = createAccount("Huzaifa");
const account2 = createAccount("Hamza");

account1.deposit(8000)
account1.withdraw(2000)

account1.getBalance();
account2.getBalance();