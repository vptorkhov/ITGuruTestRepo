import { expiresTokenTime } from "@/constants/auth.constants";
import { axiosInstance } from "../axiosInstance";
import {
  authBodySchema,
  authResponseSchema,
  refreshAuthResponseSchema,
  type TAuthBody,
  type TAuthResponse,
  type TRefreshAuthResponse,
} from "./auth.types";
import { saveStorageData } from "@/utils/utils";

export const loginUser = async (
  requestData: TAuthBody,
): Promise<TAuthResponse> => {
  try {
    authBodySchema.parse(requestData);
  } catch {
    throw new Error("Неверные данные с клиента, /auth/login");
  }
  const res: { data: TAuthResponse } = await axiosInstance.post(
    "/auth/login",
    requestData,
  );
  try {
    authResponseSchema.parse(res.data);
  } catch {
    throw new Error("Неверные данные с сервера, /auth/login");
  }
  return res.data;
};

export const refreshAuth = async (
  refreshToken: string,
): Promise<TRefreshAuthResponse> => {
  const res: { data: TRefreshAuthResponse } = await axiosInstance.post(
    "/auth/refresh",
    {
      refreshToken,
      expiresInMins: expiresTokenTime,
    },
  );
  try {
    refreshAuthResponseSchema.parse(res.data);
  } catch {
    throw new Error("Неверные данные с сервера, /auth/refresh");
  }
  return res.data;
};

export const getUserData = async (accessToken: string): Promise<unknown> => {
  try {
    const res = await axiosInstance.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch {
    throw new Error("Ошибка при получении данных пользователя, /auth/me");
  }
};

export const getUserDataWithRefresh = async (
  accessToken: string,
  refreshToken: string,
  rememberMe: boolean = false,
): Promise<unknown> => {
  try {
    const res = await getUserData(accessToken);
    return res;
  } catch {
    try {
      const refreshRes = await refreshAuth(refreshToken);
      saveStorageData("token", refreshRes.accessToken, rememberMe);
      saveStorageData("refreshToken", refreshRes.refreshToken, rememberMe);
      const getUserDataRes = await getUserData(refreshRes.accessToken);
      return getUserDataRes;
    } catch {
      throw new Error(
        "Ошибка при обновлении токена и получении данных пользователя, /auth/refresh и /auth/me",
      );
    }
  }
};
