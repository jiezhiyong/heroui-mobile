import type { VariantProps } from "tailwind-variants";

import { tv } from "tailwind-variants";

/**
 * SafeAreaInsertTop wrapper **Tailwind Variants** component
 *
 * @example
 * <div
 *  className={safeAreaInsertTop({...}))}
 * />
 */
const safeAreaInsertTop = tv({
  base: ["h-[env(safe-area-inset-top)] min-h-[var(--safe-area-inset-top)] shrink-0"],
  variants: {
    visible: {
      true: "h-[68px] bg-stripes-sky",
    },
  },
  defaultVariants: {
    visible: false,
  },
});

export type SafeAreaInsertTopVariantProps = VariantProps<typeof safeAreaInsertTop>;

export { safeAreaInsertTop };
