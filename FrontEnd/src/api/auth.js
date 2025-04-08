import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});

export async function loginUser(email, password) {
  const response = await apiClient.post(
    "/auth/token",
    new URLSearchParams({
      grant_type: "password",
      username: email,
      password: password,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
}

export async function registerUser({ first_name, last_name, email, password }) {
  const response = await apiClient.post("/register", {
    first_name,
    last_name,
    email,
    password,
  });
  return response.data;
}

export async function sendPasswordReset(email) {
  const { response } = await apiClient.post(
    `/forgot-password?email=${encodeURIComponent(email)}`
  );
  return response.message || "Reset link sent to your email.";
}
