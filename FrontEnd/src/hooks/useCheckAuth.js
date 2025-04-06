import { getAuth } from "../api/getAuth";
import { useState } from "react";
import { useEffect } from "react";

export default function useCheckAuth() {
  const [auth, setAuth] = useState({ access: false, loading: true });

  useEffect(() => {
    const fetchAuth = async () => {
      const response = await getAuth();
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
