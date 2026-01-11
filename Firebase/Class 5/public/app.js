const testInp = document.getElementById("testInp");
const output = document.getElementById("output");

const submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener('click', () => {
  output.innerText = testInp.value;

  testInp.value = "";
})