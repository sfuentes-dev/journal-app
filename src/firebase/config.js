// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// import { getEnvironments } from '../helpers/getEnvironments';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const {
//   VITE_APIKEY,
//   VITE_AUTHDOMAIN,
//   VITE_PROJECTID,
//   VITE_STORAGEBUCKET,
//   VITE_MESSAGINGSENDERID,
//   VITE_APPID,
// } = getEnvironments()

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCMcsBFOyPfAgpUhxx7UYsdVXOwOAwV--U',
  authDomain: 'journal-app-761a4.firebaseapp.com',
  projectId: 'journal-app-761a4',
  storageBucket: 'ournal-app-761a4.appspot.com',
  messagingSenderId: '253170536684',
  appId: '1:253170536684:web:66623855048e3e2e8455c9',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
