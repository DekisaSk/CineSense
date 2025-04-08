import { useState } from "react";
import { addAdmin } from "../api/addAdmin";
export default function useAddAdmin() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addAdmin(email);
      setEmail("");
    } catch (error) {
      if (error.response && error.response.data) {
        const message =
          error.response.data.detail || JSON.stringify(error.response.data);
        alert(`${message}`);
      } else {
        alert(`${error.message}`);
      }
    }
  };

  return { email, setEmail, handleSubmit };
}
