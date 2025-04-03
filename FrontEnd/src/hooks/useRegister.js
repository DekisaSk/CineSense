import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = useCallback(
    async (event) => {
      event.preventDefault();

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      if (password.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
      }

      try {
        const response = await axios.post("...", {
          firstName,
          lastName,
          email,
          password,
        });

        alert(response.data.message || "Registration successful!");
        navigate("/login");
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          console.error("Registration error:", error);
        }
      }
    },
    [firstName, lastName, email, password, confirmPassword, navigate]
  );

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleRegister,
  };
}
