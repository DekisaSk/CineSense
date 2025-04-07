export const getUserInfo = async () => {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (token) {
      const response = await fetch("https://api.cinesense.dzuverovic.me/auth/user-info", {
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
    console.error("Error fetching user info:", error);
    return null;
  }
};
