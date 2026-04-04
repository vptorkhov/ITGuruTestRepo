import { getStorageData } from "@/utils/utils";
import { useNavigate } from "react-router";
import {
  getUserDataWithAccessToken,
  getUserDataWithBothTokens,
  getUserDataWithRefreshToken,
} from "./utils/require-auth-utils";
import { useEffect, useState } from "react";

type TRequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: TRequireAuthProps) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function checkAuth() {
    const token = getStorageData("token");
    const refreshToken = getStorageData("refreshToken");
    const rememberMe = getStorageData("rememberMe");
    if (!(token || refreshToken)) {
      navigate("/login");
    }
    if (!token && refreshToken) {
      const res = await getUserDataWithRefreshToken(
        refreshToken,
        navigate,
        rememberMe === "true",
      );
      if (res) {
        setIsAuthenticated(true);
      }
    }
    if (token && !refreshToken) {
      const res = await getUserDataWithAccessToken(token, navigate);
      if (res) {
        setIsAuthenticated(true);
      }
    }
    if (token && refreshToken) {
      const res = await getUserDataWithBothTokens(
        token,
        refreshToken,
        navigate,
        rememberMe === "true",
      );
      if (res) {
        setIsAuthenticated(true);
      }
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return <>{isAuthenticated ? children : null}</>;
}
