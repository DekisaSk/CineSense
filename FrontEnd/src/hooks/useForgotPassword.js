import { useState, useCallback } from "react";
import axios from "axios";

export default function useForgotPassword(initialEmail = "") {
  const [resetEmail, setResetEmail] = useState(initialEmail);
  const [notification, setNotification] = useState("");

  const handleResetPassword = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/forgot-password?email=${encodeURIComponent(
          resetEmail
        )}`
      );
      setNotification(data.message || "Reset link sent to your email.");
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
