const fileInp = document.getElementById("fileInp");

const uploadBtn = document.getElementById("uploadBtn");

const outputImg = document.getElementById("outputImg");

let selectedFile;
fileInp.addEventListener("change", (e) => {
  if (!e.target.files[0]) return;

  if (e.target.files[0].type.includes("image")) { 
    outputImg.style.display = "block";
    outputImg.src = URL.createObjectURL(e.target.files[0])
    selectedFile = e.target.files[0]
  } else {
    alert("Please select an image to upload")
  }
})

const imageUpload = async () => {
  if (!selectedFile) {
    alert("Please select an image")
    return
  }
  console.log("selectedFile ==>", selectedFile)

  // if (selectedFil)

  // const formData = new FormData()
  // formData.append("file", selectedFile);
  // formData.append("upload_preset", "saylani-b16");

  // try {
  //   //                                                       Cloud Name
  //   const res = await fetch("https://api.cloudinary.com/v1_1/ddtfayf8g/image/upload", {
  //     method: "POST",
  //     body: formData
  //   })
  //   const data = await res.json();
  //   return data.secure_url
  // } catch (error) {
  //   console.log("error while uploading the image ==>", error)
  // }
}

// uploadBtn.addEventListener("click", () => {
//   if (!selectedFile) {
//     alert("Please select an image")
//     return
//   }

//   const formData = new FormData()
//   formData.append("file", selectedFile);
//   formData.append("upload_preset", "saylani-b16");


//   //                                     Cloud Name
//   fetch("https://api.cloudinary.com/v1_1/ddtfayf8g/image/upload", {
//     method: "POST",
//     body: formData
//   })
//   .then(res => res.json())
//   .then(data => {
//     console.log("data ==>", data.secure_url)
//   })
//   .catch(err => {
//     console.log("error while uploading the image ==>", err)
//   }) 
// })

uploadBtn.addEventListener("click", async () => {
  const userName = document.getElementById("username").value
  const imageUrl = await imageUpload();

  console.log("userName ==>", userName)
  console.log("imageUrl ==>", imageUrl)

  // Update the document in 
  await updateDoc((db, "users", userUid), {
    name: userName,
    profilePic: imageUrl
  })
})