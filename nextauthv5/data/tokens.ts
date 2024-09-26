import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { getVerifyTokenByEmail } from "./verifyToken";
import prisma from "@/lib/db";
import { getPasswordRestTokenByEmail } from "./passwordresettoken";
import { gettwoFactorTokenByEmail } from "./twofactortoken";

export async function generateToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerifyTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
}

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordRestTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return passwordResetToken;
};

//GENERATE A TWO FACTOR TOKEN.....

export async function generateTwoFactorToken(email: string) {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await gettwoFactorTokenByEmail(email);

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twofactorToken = await prisma.twoFactorToken.create({
    data: { email, token, expires },
  });
  return twofactorToken;
}
