"use server";

import { generateResetPasswordToken } from "@/data/tokens";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
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

  const passwordResetToken = await generateResetPasswordToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Email sent" };
};
