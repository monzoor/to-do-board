import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
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

  // Redirect to dashboard if the user is trying to access the root path and has a token
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  return NextResponse.next(); // Allow access if token is present
}

// Define which paths the middleware applies to
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Exclude API routes and static files
};
