import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    loading: true,
  });

  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthState({ isAuthenticated: false, loading: false });
      return;
    }

    try {
      await axios.get("http://localhost:3000/api/v1/me", {
        headers: {
          Authorization: token,
        },
      });

      setAuthState({ isAuthenticated: true, loading: false });
    } catch (error) {
      console.log("error", error);
      setAuthState({ isAuthenticated: false, loading: false });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return authState;
};

export default useAuth;
