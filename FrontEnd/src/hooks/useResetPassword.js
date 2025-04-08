import { useState, useCallback } from "react";
import axios from "axios";

export default function useResetPassword(tokenFromUrl = "") {
  const [newPassword, setNewPassword] = useState("");
  const [notification, setNotification] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/reset-password",
        {
          token: tokenFromUrl,
          new_password: newPassword,
        }
      );

      setNotification(data.message || "Password successfully reset.");
      setSuccess(true);
    } catch (error) {
      const errMsg =
        error.response?.data?.detail ||
        "There was an error resetting your password.";
      setNotification(errMsg);
      console.error("Reset password error:", error);
    }
  }, [tokenFromUrl, newPassword]);

  return {
    newPassword,
    setNewPassword,
    notification,
    success,
    handleSubmit,
  };
}
