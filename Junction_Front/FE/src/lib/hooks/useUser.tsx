import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../api/user";
import { useEffect } from "react";

export const logout = () => {
  localStorage.removeItem("jwt");
  window.location.reload();
};

const useUser = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user", "me"],
    queryFn: getCurrentUser,
    retry: false,
  });
  useEffect(() => {
    if (error && localStorage.getItem("jwt")) logout();
  }, [error]);
  useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.getItem("jwt")) {
        refetch();
      } else {
        queryClient.setQueryData(["user", "me"], null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [refetch, queryClient]);

  return {
    user: data,
    isLoading,
    refetchUser: refetch,
  };
};

export default useUser;
