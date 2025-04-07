import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.cinesense.dzuverovic.me",
});

export async function getAnalyticsData(metric) {
  const response = await apiClient.get("/analytics", {
    params: { metric },
  });
  return response.data;
}