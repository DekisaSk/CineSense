import { useState, useCallback } from "react";
import axios from "axios";

export default function useLogin(initialEmail = "", initialPassword = "") {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const { data } = await axios.post("...", { email, password });
        localStorage.setItem("token", data.token); // JWT
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          console.error("Error logging in:", error);
        }
      }
    },
    [email, password]
  );

  const handleForgotPassword = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleLogin,
    modalOpen,
    handleForgotPassword,
    handleModalClose,
  };
}
