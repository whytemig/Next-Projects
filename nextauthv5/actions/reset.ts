"use server";

import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas/index";
import { z } from "zod";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validateInput = ResetSchema.safeParse(values);

  if (!validateInput.success) {
    return { error: "Invalid Email!" };
  }

  const { email } = validateInput.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  return { success: "Email sent" };
};
