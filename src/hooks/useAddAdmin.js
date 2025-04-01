import { useState } from "react";

export default function useAddAdmin() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding Admin with email:", email);
    setEmail("");
  };

  return { email, setEmail, handleSubmit };
}
