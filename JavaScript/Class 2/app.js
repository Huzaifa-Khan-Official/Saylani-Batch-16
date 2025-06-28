// var fullName = "Huzaifa Khan"
// var num = 123456
// var isInvited = false

// alert(fullName)
// alert( typeof(fullName) )
// alert( typeof(num) )
// alert ( typeof (isInvited)  )

// var firstName = "Huzaifa"
// var lastName = "Khan"

// firstName // camelCase
// FirstName // PascalCase
// first_name // snake_case

// document.write(firstName, " ", lastName)
// Concatination: adding a string to another string
// document.write(firstName + " " + lastName + " Hello, Welcome to Pakistan") 

// document.write("<i>" + firstName + " " + lastName + "</i>")

// var num1 = "4"
// var num2 = 6

// document.write(num1 - num2 + num3)
            //  "4" + 6 // 46
            //  "4" - "6"  //-2
            //  "4" * 6 // 24
            //  "4" / 6 // 0.66

// NaN ==> Not a number ==> ya tu appke pass 1 variable me koi masla hai, ya phir dono variable me koi masla hai

// agar string me sirf number ho aur mathematics apply karni ho (rather than +) tu uss string ko number consider kiya jaega: eg: "4" is equal to 4

// document.write(num1 + num2)
            // +4 + 6 // 10


            
// var fullName = prompt("Enter your Full Name:")


// document.write("<h1>Full Name: " + fullName + "</h1>")
// alert("You entered: " + fullName)

// var student1 = prompt("First Student Name: ")

// document.write( typeof(student1) )
// typeof prompt is always a string

// var student2 = prompt("Second Student Name: ")
// var student3 = prompt("Third Student Name: ")

// document.write("<p>First Student: " + student1 + "</br>Second Student: " + student2 + "</br>Third Student: " + student3 + "</p>" )


// var num1 = +prompt("Enter 1st Number: ")
// var num2 = +prompt("Enter 2nd Number: ")

// var addition = num1 + num2

// document.write(num1 + num2)

// document.write("<table border='1px'><tr><td>Addition</td><td>"+ addition + "</td></tr></table>")

// var num1 = 7
// var num2 = 3
// var res = num1 % num2
// % appko result me remainder deta hai

// var num1 = 6
// var num2 = 7
// var res = num1 % num2
// agar modulus me first value, second se choti ho, tu result me first value hi aati hai

// document.write(res)

// var num1 = 6;
// num1 = num1 + 1

//num1++ // post increment // after increment // baad me hone wali increment // iss jaga pe previous value aaegi, jab aage kahin pe bhi call hoga tu usski value me addition hojaegi
// 5
// num1 = num1 + 1;
// num1 = 5 + 1 = 6
// document.write(num1);



// ++num1 // pre increment // before increment // pehle hone wali increment // yahin pe hi increment kardega, baad ka koi chakar nahi hoga
// num1 = num1 + 1;
// num1 = 6 + 1 = 7

// document.write(num1)


// var a = 7
// a = a++ + ++a;
// a = 4 + 6 = 10
// var b = 9

// var res = a++ + a + a + ++a + ++a
//        7   + 8 + 8 + 9   + 10

// var res = a + a++ + b++ + b + ++b + b + --a
//        7 + 7   + 9   + 10+ 11  + 11+ 7
// 48, 40, 58, 63
// 56
// 64
// 62
// 59


// var res = ++b + ++b + a++ + a
        // 10 + 11  +  7  + 8 

// document.write(res);


// var num1 = 63

// num1++ // 63
// num1++ // 64
// num1++ // 65

// ++num1 // 64
// ++num1 // 65

            //  66
// document.write(++num1)

var num1 = 3
var num2 = 6

// var res = num1-- + num1-- - --num1 - num1
// 3     + 2      - 0      - 0

var res = num2-- * --num1 + --num2 - num2 + num1
//        6      *    2   +    4   -  4   +  2

document.write(res)



// Chapter 1 # all
// Chapter 2 # any 5
// Chapter 3 # all
// Chapter 4 # all
// Chapter 5 # minimum 5
// Chapter 6 - 9 # minimum 3
