import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useUser from "../lib/hooks/useUser";
import { getCurrentUser } from "../lib/api/user";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Callback() {
  const query = useQuery();
  const token = query.get("access_token");
  const { user, refetchUser } = useUser();
  useEffect(() => {
    if (token) {
      localStorage.setItem("jwt", token);
      window.location.href = "/";
      refetchUser();
    }
  }, [token]);

  return <div>Loading...</div>;
}

export default Callback;
