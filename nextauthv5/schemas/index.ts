import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password required!",
  }),
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(6, {
    message: "Password must be 6 characters required!",
  }),
  name: z.string().min(1, {
    message: "Name is required!",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be a minimum of 6 characters",
  }),
});
