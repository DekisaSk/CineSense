import { useState, useCallback } from "react";
import { sendPasswordReset } from "../api/user";

export default function useForgotPassword(initialEmail = "") {
  const [resetEmail, setResetEmail] = useState(initialEmail);
  const [notification, setNotification] = useState("");

  const handleResetPassword = useCallback(async () => {
    try {
      const message = await sendPasswordReset(resetEmail);
      setNotification(message);
    } catch (error) {
      if (error.response && error.response.data?.detail) {
        setNotification(error.response.data.detail);
      } else {
        setNotification("An error occurred while sending the reset link.");
        console.error("Error sending reset link:", error);
      }
    }
  }, [resetEmail]);

  return {
    resetEmail,
    setResetEmail,
    notification,
    handleResetPassword,
  };
}
