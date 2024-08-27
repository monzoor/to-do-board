import { NextResponse, NextRequest } from "next/server";
import { appInitialiser } from "./helper/app/app-initialise";
import { URLS } from "./contants";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  const publicPaths = [URLS.LOGIN, URLS.SIGNUP];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL(URLS.LOGIN, request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL(URLS.DASHBOARD, request.url));
  }

  if (token && !isPublicPath) {
    try {
      const { user, categories } = await appInitialiser();

      const response = NextResponse.next();
      response.headers.set("X-User", JSON.stringify(user));
      response.headers.set("X-Categories", JSON.stringify(categories));

      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const statusCode = (error as any).statusCode;

        if (statusCode === 401) {
          console.error(
            "Unauthorized - clearing auth token and redirecting to login.",
          );

          const response = NextResponse.redirect(
            new URL(URLS.LOGIN, request.url),
          );
          response.cookies.set("authToken", "", { expires: new Date(0) });
          return response;
        } else {
          console.error("Error during appInitialiser:", error.message);
          console.error("Error stack:", error.stack);
        }
      } else {
        console.error("Unknown error during appInitialiser:", error);
      }

      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)"],
};
