// import GitHub from "next-auth/providers/github";
// import google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validateInput = loginSchema.safeParse(credentials);
        if (validateInput.success) {
          const { email, password } = validateInput.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }
          const passwordMath = await bcrypt.compare(password, user.password);
          if (passwordMath) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
