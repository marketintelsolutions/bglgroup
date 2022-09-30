// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { User } from "../models";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();

const usersRef = collection(db, "users");
const mailRef = collection(db, "mail");

async function getUsers() {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map((doc) => doc.data());
  return usersList;
}

const addUser = async (data: User) => {
  await setDoc(doc(usersRef, data.email), data)
    .then((c) => {
      return data;
    })
    .catch((error) => {
      return null;
    });
};

const checkUser = async (email: string) => {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);
  return { exists: docSnap.exists(), data: docSnap.data() };
};

const updateUser = async (data: User) => {
  const targetUserRef = doc(db, "users", data.email);
  await updateDoc(targetUserRef, data)
    .then((c) => {
      return data;
    })
    .catch((error) => {
      alert("User not found");
      return null;
    });
};
const deleteUser = async (email: string) => {
  const targetUserRef = doc(db, "users", email);
  await deleteDoc(targetUserRef)
    .then((c) => {
      return email;
    })
    .catch((error) => {
      alert("User not found");
      return null;
    });
};

const signUpUser = async (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};
const signInUser = async (email: string, password: string) => {
  let error = null;
  let user = null;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;

      const errorMessage = error.message;

      error = errorMessage;
    });
  return { error, user };
};
const sendEmail = async (
  email: string,
  subject: string,
  text: string,
  html: string
) => {
  await setDoc(doc(mailRef, (Math.random() * 10000).toString()), {
    to: email,
    message: { subject, text, html },
  })
    .then((c) => {
      console.log("Queued email for delivery!");
    })
    .catch((error) => {
      return null;
    });
};

export {
  getUsers,
  addUser,
  updateUser,
  checkUser,
  deleteUser,
  signInUser,
  signUpUser,
  sendEmail,
};
