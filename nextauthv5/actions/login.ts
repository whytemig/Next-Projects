"use server";
import { signIn } from "@/auth";
import { DEFAULT_ROUTE_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { loginSchema } from "@/schemas";
import { z } from "zod";
import { generateToken, generateTwoFactorToken } from "@/data/tokens";
import { getUserByEmail } from "@/data/user";
import { sendTwofactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { gettwoFactorTokenByEmail } from "@/data/twofactortoken";
import prisma from "@/lib/db";
import { getTwoFactorTokenById } from "@/data/twofactorconfirmation";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const validateValues = loginSchema.safeParse(values);

  if (!validateValues.success) {
    return { error: "Invalid Input!" };
  }

  const { email, password, code } = validateValues.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid Credentials" };
  }

  if (!existingUser.emailVerified) {
    const verifiedToken = await generateToken(existingUser.email);

    await sendVerificationEmail(verifiedToken.email, verifiedToken.token);

    return { success: "Confirmation Email Sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      //confirm the code
      const twofactorToken = await gettwoFactorTokenByEmail(existingUser.email);

      if (!twofactorToken) {
        return { error: "Invalid Code!!" };
      }

      if (twofactorToken.token !== code) {
        return { error: "Invalid Code!!" };
      }

      const hasExpires = new Date(twofactorToken.expires) < new Date();

      if (hasExpires) {
        return { error: "Code Expired!" };
      }

      await prisma.twoFactorToken.delete({
        where: { id: twofactorToken.id },
      });

      const existingConfirmation = await getTwoFactorTokenById(existingUser.id);

      if (existingConfirmation) {
        await prisma.twoFactorConfirm.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await prisma.twoFactorConfirm.create({
        data: { userId: existingUser.id },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwofactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_ROUTE_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went Wrong!" };
      }
    }
    throw error;
  }
};
