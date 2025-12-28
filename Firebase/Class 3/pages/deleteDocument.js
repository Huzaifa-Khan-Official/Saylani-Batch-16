import { collection, query, where, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { db } from "../config.js";

const outputTr = document.getElementById("outputTable")

const getData = async () => {
  try {
    // const q = query(collection(db, "Cars"), where("made", "==", "2022"));

    // const querySnapshot = await getDocs(q);
    outputTr.innerHTML = ""
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
        <td>
          <button onClick="deleteDocument('${doc.id}')">Delete</button>
        </td>
        </tr>
      `
    });
  } catch (error) {
    console.log("error ==>", error);
  }
}

getData();


window.deleteDocument = async (id) => {
  await deleteDoc(doc(db, "Cars", id));
  getData()
}