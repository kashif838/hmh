import { data } from "./data";
import { components } from "./components";
import { pages } from "./pages";

/** English → Arabic. Keys must match the English copy exactly. */
export const AR: Record<string, string> = {
  ...data, ...components, ...pages,
  "HMH General Trading": "إتش إم إتش للتجارة العامة",
};
