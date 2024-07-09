// src/hooks/useRegister.js
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice";
import toast from "react-hot-toast";

export const useRegister = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const register = async (email, password, displayName, photoURL) => {
    setIsPending(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      const user = userCredential.user;
      dispatch(login(user));
      toast.success(`Welcome ${user.displayName}!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setIsPending(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(login(user));
      toast.success(`Welcome, ${user.displayName}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, registerWithGoogle, register };
};
