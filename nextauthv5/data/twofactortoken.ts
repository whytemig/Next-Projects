import prisma from "@/lib/db";

export const gettwoFactorToken = async (token: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactorToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const gettwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: { email },
    });

    return twoFactorToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
