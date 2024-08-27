import { NextResponse, NextRequest } from "next/server";
import { appInitialiser } from "./helper/app/app-initialise";
import { URLS } from "./contants";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  // Define public and protected paths
  const publicPaths = [URLS.LOGIN, URLS.SIGNUP];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // If there's no token and the user is accessing a protected route, redirect to login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL(URLS.LOGIN, request.url));
  }

  // If there's a token and the user is on a public path, redirect to the root URL
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL(URLS.DASHBOARD, request.url));
  }

  // Proceed with app initialization if user is accessing a protected route
  if (token && !isPublicPath) {
    try {
      const { user, categories } = await appInitialiser();

      // Create a response that proceeds with the request
      const response = NextResponse.next();

      // Set user and categories data in custom headers (if successful)
      response.headers.set("X-User", JSON.stringify(user));
      response.headers.set("X-Categories", JSON.stringify(categories));

      return response;
    } catch (error) {
      console.error("Error during appInitialiser:", error);

      // Clear the auth token cookie to avoid the loop
      // const response = NextResponse.redirect(new URL(URLS.LOGIN, request.url));
      const response = NextResponse.next();
      // response.cookies.set("authToken", "", { expires: new Date(0) });
      return response;
    }
  }

  return NextResponse.next();
}

// Define which paths the middleware applies to
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)", // Exclude API routes, static files, and public routes
  ],
};
