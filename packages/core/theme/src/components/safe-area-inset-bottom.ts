import type { VariantProps } from "tailwind-variants";

import { tv } from "tailwind-variants";

/**
 * SafeAreaInsetBottom wrapper **Tailwind Variants** component
 *
 * @example
 * <div
 *  className={safeAreaInsetBottom({...}))}
 * />
 */
const safeAreaInsetBottom = tv({
  base: ["h-[env(safe-area-inset-bottom)] min-h-[var(--safe-area-inset-bottom)] shrink-0"],
  variants: {
    visible: {
      true: "h-[34px] bg-stripes-sky",
    },
  },
  defaultVariants: {
    visible: false,
  },
});

export type SafeAreaInsetBottomVariantProps = VariantProps<typeof safeAreaInsetBottom>;

export { safeAreaInsetBottom };
