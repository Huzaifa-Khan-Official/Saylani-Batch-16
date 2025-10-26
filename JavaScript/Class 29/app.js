// var detail = localStorage.getItem("detail") || [];
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  alert("Please Login first!");
  location = "./login/login.html";
}

var openTransactionBtn = document.getElementById("openTransactionBtn");
var addTransactionDiv = document.querySelector(".addTransactionDiv");

openTransactionBtn.addEventListener("click", function () {
  addTransactionDiv.style.display = "block";
  openTransactionBtn.style.display = "none";
})

var addTransactionBtn = document.getElementById("addTransactionBtn");

addTransactionBtn.addEventListener("click", function () {
  var amountDescription = document.getElementById("amountDescription").value;
  var amountValue = document.getElementById("amountValue").value;

  if (!amountDescription || !amountValue) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all the fields!",
    });
    return;
  }

  var usersTransactionsArr = JSON.parse(localStorage.getItem("usersTransactions")) || [];

  var userHistory = {
    id: currentUser.id,
    transactionHistoryArr: []
  }

  var transaction = {
    description: amountDescription,
    value: amountValue,
    date: new Date()
  }

  userHistory.transactionHistoryArr.push(transaction);

  usersTransactionsArr.push(userHistory);

  console.log("usersTransactionsArr ==>", usersTransactionsArr);

  localStorage.setItem("usersTransactions", JSON.stringify(usersTransactionsArr));

  getTransations();

  addTransactionDiv.style.display = "none";
  openTransactionBtn.style.display = "block";
})

var tableBody = document.getElementById("tableBody");

function getTransations() {
  var usersTransactionsArr = JSON.parse(localStorage.getItem("usersTransactions")) || [];
  tableBody.innerText = "";
  var dataFound = false;
  for (var index in usersTransactionsArr) {
    if (usersTransactionsArr[index].id == currentUser.id) {
      // console.log("data ==>", usersTransactionsArr[index]);
      dataFound = true;
      var transactionHistoryArr = usersTransactionsArr[index].transactionHistoryArr
      // console.log("history ==>", transactionHistoryArr);
      transactionHistoryArr.map(function (kuchBHI) {
        console.log("value ==>", kuchBHI);
        tableBody.innerHTML += `
              <tr>
                <th scope="row">1</th>
                <td>${kuchBHI.date}</td>
                <td>${kuchBHI.description}</td>
                <td>${kuchBHI.value}</td>
                <td>X</td>
              </tr>
        `
      })
    }
  }

  if (!dataFound) {
    tableBody.innerText = "No Transactions Found!";
  }
}

getTransations()