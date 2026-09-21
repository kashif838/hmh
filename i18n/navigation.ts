import { createElement, type ComponentProps } from "react";
import { createNavigation } from "next-intl/navigation";
import { previewHref } from "@/lib/preview";
import { routing } from "./routing";

const nav = createNavigation(routing);

export const { redirect, usePathname, useRouter, getPathname } = nav;

/** Locale-aware Link; while the home-only preview is on, internal pages resolve to homepage sections. */
export function Link(props: ComponentProps<typeof nav.Link>) {
  const href = typeof props.href === "string" ? previewHref(props.href) : props.href;
  return createElement(nav.Link, { ...props, href });
}
