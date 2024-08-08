import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged as _onAuthStateChanged } from "firebase/auth";

import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "./firebase-config";

import { getAuth } from "firebase/auth";
export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(firebaseApp);

export function onAuthStateChanged(cb: any) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    let res = await signInWithPopup(auth, provider);
    return res;
  } catch (error) {
    alert("Error signing in with Google");
    return {};
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
