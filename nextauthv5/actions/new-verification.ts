"use server";

import { getUserByEmail } from "@/data/user";
import { getVerifyTokenByToken } from "@/data/verifyToken";
import prisma from "@/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await getVerifyTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist" };
  }

  const tokenHasExpires = new Date(existingToken.expires) < new Date();

  if (tokenHasExpires) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email Verified!" };
};
