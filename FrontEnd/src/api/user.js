import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});

// Get access token from cookie
function getToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];
}

export async function getUserInfo() {
  const token = getToken();
  const response = await apiClient.get("/auth/user-info", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function updateUserInfo(userData) {
  const token = getToken();
  const response = await apiClient.put("/update-user-info", userData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function sendPasswordReset(email) {
  const { response } = await apiClient.post(
    `/forgot-password?email=${encodeURIComponent(email)}`
  );
  return response.message || "Reset link sent to your email.";
}
