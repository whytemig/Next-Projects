import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password required!",
  }),
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
