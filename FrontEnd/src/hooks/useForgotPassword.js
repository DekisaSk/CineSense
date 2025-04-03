import { useState, useCallback } from "react";
import axios from "axios";

export default function useForgotPassword(initialEmail = "") {
  const [resetEmail, setResetEmail] = useState(initialEmail);
  const [notification, setNotification] = useState("");

  const handleResetPassword = useCallback(async () => {
    try {
      const { data } = await axios.post("...", { email: resetEmail });
      alert(data.message);
      setNotification(
        "A password reset link has been sent to your email address. (Simulated)"
      );
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
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
