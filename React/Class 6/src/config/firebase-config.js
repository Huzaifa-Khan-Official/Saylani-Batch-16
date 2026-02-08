import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import configs from "./config";

export const app = initializeApp(configs);
export const db = getFirestore(app);