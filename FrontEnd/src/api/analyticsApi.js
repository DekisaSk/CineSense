import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});

export async function getAnalyticsData(metric) {
  const response = await apiClient.get("/analytics", {
    params: { metric },
  });
  return response.data;
}
