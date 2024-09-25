"use server";

import { registerSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { z } from "zod";
import { getUserByEmail } from "@/data/user";
import { generateToken } from "@/data/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  const validateValues = registerSchema.safeParse(values);

  if (!validateValues.success) {
    return { error: "Invalid Input!" };
  }

  const { email, name, password } = validateValues.data;

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await getUserByEmail(email);

  if (user) {
    return { error: "Email Already Exist!" };
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashPassword,
    },
  });

  //After testing send verification token to email
  const verifiedToken = await generateToken(email);
  await sendVerificationEmail(verifiedToken.email, verifiedToken.token);
  return { success: "Confirmation Email Sent!" };
};
