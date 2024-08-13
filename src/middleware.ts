import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract the token from cookies or headers
  const token = request.cookies.get("authToken")?.value;
  console.log("=====", token);

    // Define paths that do not require authentication
    const publicPaths = ["/login", "/signup"];

    // Check if the request path is one that does not require authentication
    if (publicPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.next(); // Allow access
    }

    // Redirect to login page if token is not present
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Redirect to dashboard if the user is trying to access the root path
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }

  return NextResponse.next(); // Allow access if token is present
}

// Define which paths the middleware applies to
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Exclude API routes and static files
};
