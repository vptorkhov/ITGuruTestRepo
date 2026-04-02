import { z } from "zod";

export const LoginFormSchema = z.object({
  login: z.string().min(1, "Введите логин"),
  password: z.string().min(1, "Введите пароль"),
  rememberMe: z.boolean(),
});

export type TLoginFormData = z.infer<typeof LoginFormSchema>;