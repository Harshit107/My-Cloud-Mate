import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMJ33UdTBZ1LFN0i73lc6hbbShFVpdTH8",
  authDomain: "harshit107-file-ecosystem.firebaseapp.com",
  databaseURL: "https://harshit107-file-ecosystem-default-rtdb.firebaseio.com",
  projectId: "harshit107-file-ecosystem",
  storageBucket: "harshit107-file-ecosystem.appspot.com",
  messagingSenderId: "298864242822",
  appId: "1:298864242822:web:4ae823d6c4a1af2884a107",
  measurementId: "G-54V6KZBRMM",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;
