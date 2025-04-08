import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

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
        const data = await registerUser({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        });

        alert(data.message || "Registration successful!");
        navigate("/login");
      } catch (error) {
        if (error.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert("Account with this email already exists.");
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
