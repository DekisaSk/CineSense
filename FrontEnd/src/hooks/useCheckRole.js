import { useState, useEffect } from "react";
import { getUserInfo } from "../api/getUserInfo";

export function useUserRole() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      const user = await getUserInfo();
      if (user) {
        setRole(user.role);
      }
    };
    fetchRole();
  }, []);

  return role;
}
