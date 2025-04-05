export const getUserInfo = async () => {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (token) {
      const response = await fetch("http://localhost:8000/auth/user-info", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};
