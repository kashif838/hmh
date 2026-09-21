"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { isActive } from "@/lib/nav";

/**
 * Footer link that marks itself active, mirroring the header nav.
 * `match` lists the sections this link stands for (defaults to its own href, exact).
 */
export function FooterLink({ href, match, children, className = "" }: {
  href: string; match?: string[]; children: React.ReactNode; className?: string;
}) {
  const pathname = usePathname();
  const active = match ? match.some((m) => isActive(pathname, m)) : isActive(pathname, href, true);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`navitem ${className}`}
    >
      {children}
    </Link>
  );
}
