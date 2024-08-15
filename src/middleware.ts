import { NextResponse, NextRequest } from "next/server";
import { appInitialiser } from "./helper/app/app-initialise";

export async function middleware(request: NextRequest) {
  // Extract the token from cookies or headers
  const token = request.cookies.get("authToken")?.value;

  // Define paths that do not require authentication
  const publicPaths = ["/login", "/signup"];

  // Check if the request path is one that does not require authentication
  if (publicPaths.includes(request.nextUrl.pathname)) {
    // If token is present, redirect to the root path
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next(); // Allow access to login or signup if no token
  }

  // Redirect to login page if token is not present
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Fetch user and categories data if the token is present
  try {
    const { user, categories } = await appInitialiser();

    // Set user and categories data in headers
    const response = NextResponse.next();
    response.headers.set("X-User", JSON.stringify(user));
    response.headers.set("X-Categories", JSON.stringify(categories));

    return response;
  } catch (error) {
    console.error("Middleware error:");
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect on error
  }
}

// Define which paths the middleware applies to
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Exclude API routes and static files
};
