import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { db } from "../config.js";

const createBtn = document.getElementById("createBtn");
const outputTr = document.getElementById("outputTr");

const addDocument = async () => {
  const madeInp = document.getElementById("madeInp")
  const seatInp = document.getElementById("seatInp")
  const colorInp = document.getElementById("colorInp")
  const sunRoofInp = document.getElementById("sunRoofInp")
  const featuresInp = document.getElementById("featuresInp")

  const featuresArr = featuresInp.value.split(",").trim;
  createBtn.innerText = "Creating..."
  try {
    const docRef = await addDoc(collection(db, "Cars"), {
      made: madeInp.value,
      seating: Number(seatInp.value),
      color: colorInp.value,
      sunRoof: Boolean(sunRoofInp.value),
      features: featuresInp.value
    });
    console.log("Document written with ID: ", docRef.id);
    outputTr.innerHTML += `
        <td>${madeInp.value}</td>
        <td>${seatInp.value}</td>
        <td>${colorInp.value}</td>
        <td>${sunRoofInp.value}</td>
        <td>${featuresInp.value}</td>
    `
  } catch (e) {
    console.error("Error adding document: ", e);
  } finally {
    createBtn.innerText = "Create"
    madeInp.value = ""
    seatInp.value = ""
    colorInp.value = ""
    sunRoofInp.value = ""
    featuresInp.value = ""
  }
}

createBtn.addEventListener("click", addDocument)