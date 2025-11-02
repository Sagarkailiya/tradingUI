// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkW7u7nR62nXM_pnWhyRRcFCeMFKU7HZw",
  authDomain: "wingsai-13c87.firebaseapp.com",
  projectId: "wingsai-13c87",
  storageBucket: "wingsai-13c87.firebasestorage.app",
  messagingSenderId: "419024350165",
  appId: "1:419024350165:web:5b7e89e78615ed58cfeb5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//  Initialize Firebase Authentication
const auth = getAuth(app);

//  Create Google Auth Provider
const provider = new GoogleAuthProvider();

// Export both so other files can import them
export { auth, provider };