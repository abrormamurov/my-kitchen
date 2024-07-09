import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { useState } from "react";

import { login } from "../app/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [isPanding, setIsPanding] = useState(false);

  const loginUser = async (email, password) => {
    console.log(email, password);
    setIsPanding(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      setIsPanding(false);
      dispatch(login(user));

      toast.success(`Welcome ${user.displayName} !`);
    } catch (error) {
      toast.error(error.message);
      setIsPanding(false);
    }
  };
  return { isPanding, loginUser };
};
