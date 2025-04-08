import { useState, useEffect } from "react";
import { getUserInfo, updateUserInfo } from "../api/user";

export default function useProfile() {
  const [userData, setUserData] = useState({
    name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserData(data);
        setFirstName(data.name || "");
        setLastName(data.last_name || "");
        setEmail(data.email || "");
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

  const handleUpdateProfile = async () => {
    try {
      const data = await updateUserInfo({
        first_name: firstName,
        last_name: lastName,
        email,
      });
      return data;
    } catch (error) {
      console.error("Error updating profile:", error);
      return null;
    }
  };

  return {
    userData,
    handleInputChange,
    handleAvatarChange,
    handleUpdateProfile,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
  };
}
