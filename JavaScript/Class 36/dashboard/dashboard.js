const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const loginDiv = document.querySelector(".loginDiv");
const userProfile = document.querySelector(".userProfile");
const userEmail = document.getElementById("userEmail");
let productsDiv = document.getElementById("productsDiv");
const addProductModal = document.getElementById("addProduct");

let usersArr = JSON.parse(localStorage.getItem("users")) || [];


if (!currentUser) {
  loginDiv.style.display = "flex";
  userProfile.style.display = "none"
} else {
  loginDiv.style.display = "none";
  userProfile.style.display = "flex";
  userEmail.innerText = currentUser.email
}

const renderProducts = () => {
  if (currentUser.products.length === 0) {
    productsDiv.innerHTML = `
    <h3>You do not have any products</h3>
    `
  } else {
    console.log("currentUser ==>", currentUser.products);
    
    currentUser.products.map(product => {
      productsDiv.innerHTML += `
            <div class="card" style="width: 18rem;">
        <img src="../assets/product1.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Product Name</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s
            content.</p>
          <p>1200 Rs.</p>
          <p>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </p>
          <div class="actionDiv">
            <button class="btn btn-primary">Edit</button>
            <button class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
      `
    })
  }
}

renderProducts();

const addProductBtn = document.getElementById("addProductBtn");

addProductBtn.addEventListener("click", () => {
  const productTitle = document.getElementById("productTitle").value.trim();
  const productDescription = document.getElementById("productDescription").value.trim();
  const productImg = document.getElementById("productImg").value.trim();
  const productPrice = document.getElementById("productPrice").value.trim();
  const productCategory = document.getElementById("productCategory").value.trim();
  const modal = bootstrap.Modal.getInstance(addProductModal)
    || new bootstrap.Modal(addProductModal);

  const product = {
    id: Date.now().toString(),
    productName: productTitle,
    productDescription,
    productImg,
    price: productPrice,
    category: productCategory,
    rating: 0
  }

  currentUser.products.push(product);
  localStorage.setItem("currentUser", JSON.stringify(currentUser))

  const updatedUsers = usersArr.map(user =>
    user.id === currentUser.id ? { ...user, products: currentUser.products } : user
  );
  console.log(updatedUsers);
renderProducts();

  modal.hide()
})