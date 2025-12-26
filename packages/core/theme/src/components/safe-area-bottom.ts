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
  base: ["pb-[var(--safe-area-bottom,env(safe-area-bottom))] shrink-0"],
  variants: {
    visible: {
      true: "pb-[34px] bg-stripes-sky",
    },
  },
  defaultVariants: {
    visible: false,
  },
});

export type SafeAreaBottomVariantProps = VariantProps<typeof safeAreaBottom>;

export { safeAreaBottom };
