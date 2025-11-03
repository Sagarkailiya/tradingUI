// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCXmwGKSZio_eK1yL85EtOHdn_Mlq6C5Wo",
  authDomain: "tradingui-b2b48.firebaseapp.com",
  projectId: "tradingui-b2b48",
  storageBucket: "tradingui-b2b48.firebasestorage.app",
  messagingSenderId: "576218122443",
  appId: "1:576218122443:web:66510b7f83721a410af34e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//  Initialize Firebase Authentication
const auth = getAuth(app);

//  Create Google Auth Provider
const provider = new GoogleAuthProvider();

// Export both so other files can import them
export { auth, provider };