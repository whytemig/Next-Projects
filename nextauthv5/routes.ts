/**
 * Public Routes
 */
export const publicRoutes: string[] = ["/"];

/**
 * Private Routes - redirect logged in users to settings page
 */
export const authRoutes: string[] = ["/auth/login", "/auth/register"];

// prefix for Authentification routes
export const apiAuthPrefix: string = "/api/auth";

//default redirect loginned in path
export const DEFAULT_ROUTE_REDIRECT: string = "/settings";
