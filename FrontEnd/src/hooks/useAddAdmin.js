import { useState } from "react";
import { addAdmin } from "../api/addAdmin";
export default function useAddAdmin() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      response = addAdmin(email);
      setEmail("");
    } catch {
      console.log("Could not add admin");
    }
  };

  return { email, setEmail, handleSubmit };
}
