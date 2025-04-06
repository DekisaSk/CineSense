import { useState, useEffect } from "react";
import { getUserInfo } from "../api/getUserInfo";

export default function useProfile() {
  const [userData, setUserData] = useState({
    name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        setUserData(response);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
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
