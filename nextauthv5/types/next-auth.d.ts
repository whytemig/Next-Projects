import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's postal address. */
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}
