import z from "zod";

export const authBodySchema = z.object({
  username: z.string(),
  password: z.string(),
  expiresInMins: z.number().optional(),
});

export type TAuthBody = z.infer<typeof authBodySchema>;

export const authResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  image: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type TAuthResponse = z.infer<typeof authResponseSchema>;

export const refreshAuthBodySchema = z.object({
  refreshToken: z.string(),
  expiresInMins: z.number().optional(),
});

export type TRefreshAuthBody = z.infer<typeof refreshAuthBodySchema>;

export const refreshAuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type TRefreshAuthResponse = z.infer<typeof refreshAuthResponseSchema>;