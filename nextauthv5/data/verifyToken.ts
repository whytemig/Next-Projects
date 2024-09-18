import prisma from "@/lib/db";

export async function getVerifyTokenByEmail(email: string) {
  try {
    const verifyEmail = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return verifyEmail;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getVerifyTokenByToken(token: string) {
  try {
    const verifyToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });
    return verifyToken;
  } catch (error) {
    console.log(error);
    return null;
  }
}
