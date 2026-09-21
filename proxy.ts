import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { HOME_ONLY, previewHref } from "./lib/preview";

const intl = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (HOME_ONLY) {
    // Strip the locale prefix, then send any hidden page to its homepage section in the same language.
    const prefix = /^\/ar(?=\/|$)/.test(request.nextUrl.pathname) ? "/ar" : "";
    const path = request.nextUrl.pathname.slice(prefix.length) || "/";
    const target = previewHref(path);
    if (target !== path && path.replace(/\/$/, "") !== "") {
      return NextResponse.redirect(new URL(prefix + target, request.url), 307);
    }
  }
  return intl(request);
}

export const config = {
  // Everything except API routes, Next internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
