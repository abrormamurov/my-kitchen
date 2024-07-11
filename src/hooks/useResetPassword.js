// hooks/useResetPassword.js
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const useResetPassword = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const resetPassword = (email) => {
    setIsPending(true);
    setError(null);
    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsPending(false);
        alert("Password reset password sent!");
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };

  return { resetPassword, isPending, error };
};
