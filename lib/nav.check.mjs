// Run: node lib/nav.check.mjs   (Node 22.6+ strips the TypeScript types)
import assert from "node:assert/strict";
import { isActive } from "./nav.ts";

assert.ok(isActive("/about", "/about"));
assert.ok(isActive("/about/", "/about"), "trailing slash");
assert.ok(isActive("/products/dairy", "/products"), "section prefix");
assert.ok(!isActive("/products-old", "/products"), "no partial-word match");
assert.ok(!isActive("/services/distribution", "/services", true), "exact parent");
assert.ok(isActive("/products/beverages/boon-karak-tea", "/products/beverages/boon-"), "slug prefix");
assert.ok(!isActive("/products/beverages", "/products/beverages/boon-"));
assert.ok(isActive("/products/cosmetics-personal-care", "/products/cosmetics-personal-care"));
assert.ok(isActive("/products", "/products#non-food"), "hash ignored");
console.log("nav matcher: all checks passed");
