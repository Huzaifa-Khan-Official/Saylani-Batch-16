


function convertToUppercase() {
  var userInp = document.getElementById("userInp").value;
  // bilal-sudias-rehman
  if (userInp == "") {
    alert("kuch na kuch likh")
  } else {
    var arr;
    if (userInp.includes(" ")) {
      arr = userInp.split(' ');
    } else if (userInp.includes("-")){
      arr = userInp.split("-")
    } else if (userInp.includes("+")) {
      arr = userInp.split("+")
    }

    var outputPara = document.getElementById("outputPara");
    outputPara.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
      var element = arr[i].toUpperCase();
      console.log("element ==>", element)
      // outputPara.innerHTML += "<b>" + arr[i] + "</b> </br>"
      outputPara.innerHTML = outputPara.innerHTML + "<b>" + element + "</b></br>"
    }
  }
}