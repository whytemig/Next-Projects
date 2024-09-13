"use server";
import { signIn } from "@/auth";
import { DEFAULT_ROUTE_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { loginSchema } from "@/schemas";
import { z } from "zod";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const validateValues = loginSchema.safeParse(values);

  if (!validateValues.success) {
    return { error: "Invalid Input!" };
  }

  const { email, password } = validateValues.data;

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
