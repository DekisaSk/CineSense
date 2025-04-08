import { useState, useEffect } from "react";
import { getUserInfo, updateUserInfo } from "../api/user";
import axios from "axios";
export default function useProfile() {
  const [userData, setUserData] = useState({
    name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  const getTokenFromCookie = () => {
    const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
    return match ? match[1] : null;
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPath, setAvatarPath] = useState("");
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();

        const fullAvatarUrl = data.avatar_path
          ? `http://localhost:8000${data.avatar_path}`
          : "";

        setUserData((prev) => ({
          ...prev,
          ...data,
          avatar: fullAvatarUrl,
        }));

        setFirstName(data.name || "");
        setLastName(data.last_name || "");
        setEmail(data.email || "");
        setAvatarPath(fullAvatarUrl);
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
  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8000/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getTokenFromCookie()}`,
          },
        }
      );

      const avatarUrl = `http://localhost:8000${res.data.avatar_url}`;
      setAvatarPath(avatarUrl);
      setUserData((prev) => ({
        ...prev,
        avatar: avatarUrl,
      }));
    } catch (err) {
      console.error("Failed to upload avatar", err);
    }
  };
  const handleUpdateProfile = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

      if (token) {
        const userData = {
          first_name: firstName,
          last_name: lastName,
          email: email,
        };

        const response = await fetch("http://localhost:8000/update-user-info", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const data = await response.json();
          alert("Profile updated successfully!");
          return data;
        } else {
          const errorData = await response.json();
          console.error("Error updating profile:", errorData.detail);
          return null;
        }
      } else {
        console.error("Authorization token not found.");
        return null;
      }
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
    avatarPath,
  };
}
