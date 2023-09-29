import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBOMOrtn791FuiXEXZ47KiKzR_y8afwGuY",
  authDomain: "signal-clone-yt-build-c51c9.firebaseapp.com",
  projectId: "signal-clone-yt-build-c51c9",
  storageBucket: "signal-clone-yt-build-c51c9.appspot.com",
  messagingSenderId: "136956194912",
  appId: "1:136956194912:web:ba4c0ee4253ad26a479305",
  measurementId: "G-RY9H1GND1G",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// if (firebase && firebase.firestore) {
//   const firestore = getFirestore(app);
// } else {
//   console.error("Firebase or firestore is undefined");
// }

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
