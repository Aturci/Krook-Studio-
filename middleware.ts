import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/")) {
    const auth = request.cookies.get("krook_admin")?.value;
    if (auth !== "authenticated") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path+"],
};
