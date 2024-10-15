import prisma from "@/lib/db";

export const getPasswordRestToken = async (token: string) => {
  try {
    const passwordToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return passwordToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getPasswordRestTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await prisma.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return passwordToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
