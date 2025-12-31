import type { VariantProps } from "tailwind-variants";

import { tv } from "../utils/tv";

/**
 * SafeAreaBottom wrapper **Tailwind Variants** component
 *
 * @example
 * <div
 *  className={safeAreaBottom({...}))}
 * />
 */
const safeAreaBottom = tv({
  base: ["pb-[var(--safe-area-bottom,env(safe-area-bottom))]"],
});

export type SafeAreaBottomVariantProps = VariantProps<typeof safeAreaBottom>;

export { safeAreaBottom };
