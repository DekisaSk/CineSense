import { useState, useEffect } from "react";

// Dummy data until backend is implemented
const initialUserData = {
  firstName: "Pavle",
  lastName: "Dzuverovic",
  email: "pdzuverovic@gmail.com",
  avatar: "../assets/dummy.jpg",
};

export default function useProfile() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    // dummy initialization
    setUserData(initialUserData);
  }, []);

  const handleInputChange = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = () => {
    // axios.put("...", userData)
    alert(
      "Profile updated (dummy). New data: \n" +
        JSON.stringify(userData, null, 2)
    );
  };

  return {
    userData,
    handleInputChange,
    handleAvatarChange,
    handleUpdateProfile,
  };
}
