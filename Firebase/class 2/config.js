import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyDUQN5qn3MZGtOfl414D7Y_yiGLSh6y1dA",
  authDomain: "saylani-social-media.firebaseapp.com",
  projectId: "saylani-social-media",
  storageBucket: "saylani-social-media.firebasestorage.app",
  messagingSenderId: "880271463462",
  appId: "1:880271463462:web:c6290ebc3bd7bf922bc2e7",
  measurementId: "G-KRQX0VN567"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
