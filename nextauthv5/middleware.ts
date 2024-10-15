import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_ROUTE_REDIRECT,
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth(function middleware(req): Response | null {
  // Your custom middleware logic goes here

  const { nextUrl } = req;
  //checking authentication of User.
  //(BOOLEAN)
  const isLoggedIn = !!req.auth;

  //does pathname starts with "/api/auth/"
  const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  //does pathname sarts with the public routes
  const publicRoute = publicRoutes.includes(nextUrl.pathname);
  //does pathname begins with auth path
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAPIAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_ROUTE_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !publicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
