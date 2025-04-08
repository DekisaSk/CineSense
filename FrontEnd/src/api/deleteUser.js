import axios from "axios";

const getTokenFromCookie = () => {
  const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
  return match ? match[1] : null;
};

export const deleteUser = async (id) => {
  const token = getTokenFromCookie();
  const res = await axios.delete(`http://localhost:8000/delete-user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
