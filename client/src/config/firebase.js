import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendEmailVerification, reauthenticateWithCredential } from "firebase/auth";
import { getDatabase, ref, set, remove, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCw417C7upiZrUOCnHB71pQHlftk_BZiFA",
  authDomain: "visual-lite.firebaseapp.com",
  projectId: "visual-lite",
  storageBucket: "visual-lite.appspot.com",
  messagingSenderId: "740556318357",
  appId: "1:740556318357:web:ad282a03cb6fff2e741d9c",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

// Function to sign in with email and password
const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Function to create a user with email and password
const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Send verification email
    return sendEmailVerification(userCredential.user);
  });
};

// Function to sign out
const signOutUser = () => {
  return signOut(auth);
};

const reauthenticateUser = (currentUser, credential) => {
  return reauthenticateWithCredential(currentUser, credential);
};

const sendVerificationEmail = (user) => {
  return sendEmailVerification(user);
};

const database = getDatabase();

export const addToLikes = async (userId, beer) => {
  const likesRef = ref(database, "likes/" + userId);
  const snapshot = await get(likesRef);
  if (snapshot.exists()) {
    const likes = snapshot.val();
    // Check if the beer is already in the likes
    if (Object.values(likes).some((like) => like.id === beer.id)) {
      return "Beer already liked";
    }
  }
  set(ref(database, "likes/" + userId + "/" + beer.id), beer);
  return "Beer added to likes";
};

export const removeFromLikes = async (userId, beerId) => {
  const likesRef = ref(database, "likes/" + userId);
  const snapshot = await get(likesRef);
  if (snapshot.exists()) {
    const likes = snapshot.val();
    // Find the key of the like entry that matches the beerId
    const likeKey = Object.keys(likes).find((key) => likes[key].id === beerId);
    if (likeKey) {
      await remove(ref(database, "likes/" + userId + "/" + likeKey));
      return "Beer removed from likes";
    } else {
      return "Beer not found in likes";
    }
  } else {
    return "No likes found for user";
  }
};

export const fetchLikedBeers = async (userId) => {
  const likesRef = ref(database, "likes/" + userId);
  const snapshot = await get(likesRef);
  if (snapshot.exists()) {
    const likedBeersObject = snapshot.toJSON();
    const likedBeersArray = Object.values(likedBeersObject);
    return likedBeersArray;
  } else {
    return [];
  }
};

export { auth, signIn, signUp, signOutUser, reauthenticateUser, sendVerificationEmail };
