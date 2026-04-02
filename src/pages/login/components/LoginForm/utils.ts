import type { TAuthBody } from "@/services/auth/auth.types";
import type { TLoginFormData } from "./types";
import { expiresTokenTime } from "@/constants/auth.constants";

export const serializeLoginBodyData = (data: TLoginFormData): TAuthBody => {
  return {
    username: data.login,
    password: data.password,
    expiresInMins: expiresTokenTime,
  };
};


