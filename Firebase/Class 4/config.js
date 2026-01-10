import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD40JbKyeUcppwbSvOl9vIWovUQ-c1wpgI",
  authDomain: "practice-project-10111.firebaseapp.com",
  projectId: "practice-project-10111",
  storageBucket: "practice-project-10111.firebasestorage.app",
  messagingSenderId: "163027099976",
  appId: "1:163027099976:web:8e69cb1b0781ed68e0d37d",
  measurementId: "G-L7Y1CT3HQZ",
  databaseURL: "https://practice-project-10111-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);