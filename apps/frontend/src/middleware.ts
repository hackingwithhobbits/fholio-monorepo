import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get session from cookie (we'll set this on login)
  const session = request.cookies.get("fholio_session");
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = [
    "/fan-dashboard",
    "/artist-dashboard",
    "/fan-profile",
    "/artist-profile",
    "/fan-onboarding",
    "/artist-onboarding",
  ];

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to signin if accessing protected route without session
  if (isProtectedRoute && !session) {
    const signInUrl = pathname.includes("artist")
      ? "/artist-signin"
      : "/fan-signin";
    return NextResponse.redirect(new URL(signInUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
