"use server";

import { getPasswordRestToken } from "@/data/passwordresettoken";
import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/db";
import { ResetPasswordSchema } from "@/schemas";
import bycrypt from "bcryptjs";
import { z } from "zod";

export const newPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing Token" };
  }

  const validateInput = ResetPasswordSchema.safeParse(values);

  if (!validateInput.success) {
    return { error: "Invalid Input Value" };
  }

  const { password } = validateInput.data;

  const existingToken = await getPasswordRestToken(token);

  if (!existingToken) {
    return { error: "Invalid Token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has Expired" };
  }

  const existUser = await getUserByEmail(existingToken.email);

  if (!existUser) {
    return { error: "Email does not exist!" };
  }
  const hashedP = await bycrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      id: existUser.id,
    },
    data: {
      password: hashedP,
    },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password Updated!!" };
};
