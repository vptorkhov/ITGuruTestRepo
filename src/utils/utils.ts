import { AxiosError } from "axios";

export function isAxiosError<T = unknown>(
  error: unknown,
): error is AxiosError<T> {
  return error instanceof AxiosError;
}

export const getStorageData = (name: string) => {
  return localStorage.getItem(name) ?? sessionStorage.getItem(name);
};

export const saveStorageData = (
  name: string,
  value: string,
  rememberMe: boolean,
) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(name, value);
};
