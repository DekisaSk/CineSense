import { useState, useCallback } from "react";
import axios from "axios";

export default function useLogin(initialEmail = "", initialPassword = "") {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "password",
          username: email,
          password: password,
        }),
      });
      console.log(email, password);
      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const token = data.access_token;

      document.cookie = `access_token=${token}; path=/; secure`;

      console.log("✅ Login successful:", token);
      navigate("/");
    } catch (err) {
      console.error("❌ Login error:", err);
      alert("Login failed. Please check your credentials.");
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
  };
}
