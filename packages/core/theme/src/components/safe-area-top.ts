import type { VariantProps } from "tailwind-variants";

import { tv } from "../utils/tv";

/**
 * SafeAreaTop wrapper **Tailwind Variants** component
 *
 * @example
 * <div
 *  className={safeAreaTop({...}))}
 * />
 */
const safeAreaTop = tv({
  base: ["pt-[var(--safe-area-inset-top,env(safe-area-inset-top))]"],
});

export type SafeAreaTopVariantProps = VariantProps<typeof safeAreaTop>;

export { safeAreaTop };
