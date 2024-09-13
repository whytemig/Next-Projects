"use server";
import { loginSchema } from "@/schemas";
import { z } from "zod";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const validateValues = loginSchema.safeParse(values);

  if (!validateValues.success) {
    return { error: "Invalid Input!" };
  }

  return { success: "Login!" };
};
