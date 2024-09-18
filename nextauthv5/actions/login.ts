"use server";
import { signIn } from "@/auth";
import { DEFAULT_ROUTE_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { loginSchema } from "@/schemas";
import { z } from "zod";
import { generateToken } from "@/data/tokens";
import { getUserByEmail } from "@/data/user";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const validateValues = loginSchema.safeParse(values);

  if (!validateValues.success) {
    return { error: "Invalid Input!" };
  }

  const { email, password } = validateValues.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid Credentials" };
  }

  if (!existingUser.emailVerified) {
    const verifiedToken = await generateToken(existingUser.email);

    return { success: "Confirmation Email Sent!" };
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
