export const getAllUsers = async () => {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];
    console.log("1");
    if (token) {
      const response = await fetch("https://api.cinesense.dzuverovic.me/get-all-users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      }
    }
  } catch (error) {
    console.error("Error fetching users data", error);
    return null;
  }
};
