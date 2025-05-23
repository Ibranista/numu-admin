import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged, type NextOrObserver, type User } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const logout = () => signOut(auth);

export const onAuthChange = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
};
