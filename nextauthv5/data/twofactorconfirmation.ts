import prisma from "@/lib/db";

export const getTwoFactorTokenById = async (userId: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorConfirm.findUnique({
      where: { userId },
    });

    return twoFactorToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
