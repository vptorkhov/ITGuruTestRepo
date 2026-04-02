import {
  getUserData,
  getUserDataWithRefresh,
  refreshAuth,
} from "@/services/auth/auth.service";
import { saveStorageData } from "@/utils/utils";
import type { NavigateFunction } from "react-router";

export async function getUserDataWithRefreshToken(
  refreshToken: string,
  navigate: NavigateFunction,
  rememberMe: boolean,
) {
  try {
    const res = await refreshAuth(refreshToken);
    const { accessToken, refreshToken: newRefreshToken } = res;
    saveStorageData("token", accessToken, rememberMe);
    saveStorageData("refreshToken", newRefreshToken, rememberMe);
    const userData = await getUserData(accessToken);
    return userData;
  } catch {
    navigate("/login");
  }
}
export async function getUserDataWithAccessToken(
  accessToken: string,
  navigate: NavigateFunction,
) {
  try {
    const userData = await getUserData(accessToken);
    return userData;
  } catch {
    navigate("/login");
  }
}
export async function getUserDataWithBothTokens(
  accessToken: string,
  refreshToken: string,
  navigate: NavigateFunction,
  rememberMe: boolean,
) {
  try {
    const userData = await getUserDataWithRefresh(
      accessToken,
      refreshToken,
      rememberMe,
    );
    return userData;
  } catch {
    navigate("/login");
  }
}
