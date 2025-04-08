import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});

const getTokenFromCookie = () => {
  const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
  return match ? match[1] : null;
};

export async function getControlState(name) {
  const token = getTokenFromCookie();
  const response = await apiClient.get(`/controls/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.is_enabled;
}

export async function setControlState(name, value) {
  const token = getTokenFromCookie();
  const response = await apiClient.put(
    `/controls/${name}?value=${value}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
