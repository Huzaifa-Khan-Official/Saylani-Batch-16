var input = document.getElementById("input");

function concatinate(value) {
  // console.log("value ==>", value);
  input.value += value;
}

function calculate() {
  var result = eval(input.value)
  console.log("result ==>", result);
  input.value = result;
}

function clearBtn() {
  input.value = ""
}

function delBtn() {
  input.value = input.value.slice(0, -1)
  
}