import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { HOME_ONLY, previewHref } from "./lib/preview";

const intl = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (HOME_ONLY) {
    // Strip the locale prefix, then send any non-home page to its homepage section.
    const path = request.nextUrl.pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
    const target = previewHref(path);
    if (target !== path && path.replace(/\/$/, "") !== "") {
      return NextResponse.redirect(new URL(target, request.url), 307);
    }
  }
  return intl(request);
}

export const config = {
  // Everything except API routes, Next internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
