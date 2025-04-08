import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

export default function useLogin(initialEmail = "", initialPassword = "") {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      const token = data.access_token;

      document.cookie = `access_token=${token}; path=/; secure`;
      console.log("Login successful:", token);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setWrongPassword(true);
    }
  };

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
    wrongPassword,
    setWrongPassword,
  };
}
