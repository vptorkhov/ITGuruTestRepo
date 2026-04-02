import { axiosInstance } from "../axiosInstance";
import {
  authBodySchema,
  authResponseSchema,
  type TAuthBody,
  type TAuthResponse,
} from "./auth.types";

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
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  try {
    authResponseSchema.parse(res.data);
  } catch {
    throw new Error("Неверные данные с сервера, /auth/login");
  }
  return res.data;
};
