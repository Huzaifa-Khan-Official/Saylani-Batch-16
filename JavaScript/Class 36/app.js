const singupBtn = document.getElementById("singupBtn");
const singupModal = document.getElementById("singupModal");
const loginModal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
let usersArr = JSON.parse(localStorage.getItem("users")) || [];
const logoutBtn = document.getElementById("logoutBtn");

const loginDiv = document.querySelector(".loginDiv");
const userProfile = document.querySelector(".userProfile");
const userEmail = document.getElementById("userEmail");

if (!currentUser) {
  loginDiv.style.display = "flex";
  userProfile.style.display = "none"
} else {
  loginDiv.style.display = "none";
  userProfile.style.display = "flex";
  userEmail.innerText = currentUser.email
}


singupBtn.addEventListener("click", () => {
  const modal = bootstrap.Modal.getInstance(singupModal)
    || new bootstrap.Modal(singupModal);
  const errorPara = document.getElementById("errorPara");

  const singupEmail = document.getElementById("singupEmail").value.trim().toLowerCase();
  const singupPassword = document.getElementById("singupPassword").value.trim().toLowerCase();
  const singupConfirmPassword = document.getElementById("singupConfirmPassword").value.trim().toLowerCase();

  if (singupConfirmPassword == singupPassword) {
    const user = {
      id: Date.now().toString(),
      email: singupEmail,
      password: singupPassword,
      products: []
    }

    usersArr.push(user);

    localStorage.setItem("users", JSON.stringify(usersArr));

    // Swal.fire({
    //   title: "Success!",
    //   text: "User created successfully!",
    //   icon: "success"
    // });

    alert("User Created Successfully!")

    console.log("user ==>", user);

    modal.hide();
  } else {
    errorPara.innerText = "Password and Confirm Password didn't matched"
    setTimeout(() => {
      errorPara.innerText = "";
    }, 5000)
  }
})

loginBtn.addEventListener("click", () => {
  const loginEmail = document.getElementById("loginEmail").value.trim().toLowerCase();
  const loginPassword = document.getElementById("loginPassword").value.trim().toLowerCase();
  const modal = bootstrap.Modal.getInstance(loginModal)
    || new bootstrap.Modal(loginModal);

  const user = usersArr.find(user => user.email == loginEmail && user.password == loginPassword);
  if (!user) {
    alert("User not found!")
    return
  };
  localStorage.setItem("currentUser", JSON.stringify(user))
  alert("Login Successful!");
  loginDiv.style.display = "none";
  userProfile.style.display = "flex"
  userEmail.innerText = loginEmail;
  modal.hide();
})

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  userEmail.innerText = "";
  alert("User Logged Out Successfully!");
  loginDiv.style.display = "flex";
  userProfile.style.display = "none"
})