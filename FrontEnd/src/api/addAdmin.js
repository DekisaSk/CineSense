import axios from "axios";

const getTokenFromCookie = () => {
  const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
  return match ? match[1] : null;
};

export const addAdmin = async (email) => {
  const token = getTokenFromCookie();
  const res = await axios.put(
    `http://localhost:8000/add-admin/${email}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
