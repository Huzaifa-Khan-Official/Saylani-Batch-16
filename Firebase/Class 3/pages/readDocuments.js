import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { db } from "../config.js";



const outputTr = document.getElementById("outputTable")

const getData = async () => {
  try {
    // const q = query(collection(db, "Cars"), where("made", "==", "2022"));

    // const querySnapshot = await getDocs(q);
    const querySnapshot = await getDocs(collection(db, "Cars"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      outputTr.innerHTML += `
        <tr>
        <td>${data.made}</td>
        <td>${data.seating}</td>
        <td>${data.color}</td>
        <td>${data.sunRoof}</td>
        <td>${data.features}</td>
        </tr>
      `
    });
  } catch (error) {
    console.log("error ==>", error);
  }
}

getData();