import { getAdmin } from "../api/getAuthAdmin";
import { useState } from "react";
import { useEffect } from "react";

export default function useCheckAdmin() {
  const [auth, setAuth] = useState({ access: false, loading: true });

  useEffect(() => {
    const fetchAuth = async () => {
      const response = await getAdmin();
      console.log(response);
      if (response) {
        setAuth({ access: response.access, loading: false });
      } else {
        setAuth({ access: false, loading: false });
      }
    };
    fetchAuth();
  }, []);

  return auth;
}
