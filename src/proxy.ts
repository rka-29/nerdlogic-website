import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isComingSoonEnabled() {
  const value = process.env.COMING_SOON?.trim().toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const enabled = isComingSoonEnabled();

  if (!enabled) {
    if (pathname === "/coming-soon") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/coming-soon") {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-coming-soon", "1");
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-coming-soon", "1");

  return NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets/|opengraph-image|twitter-image|icon|apple-icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
