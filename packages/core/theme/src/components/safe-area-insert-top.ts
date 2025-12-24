import type { VariantProps } from "tailwind-variants";

import { tv } from "tailwind-variants";

/**
 * SafeAreaInsertTop wrapper **Tailwind Variants** component
 *
 * const classNames = safeAreaInsertTop({...})
 *
 * @example
 * <div
 *  className={classNames())}
 * />
 */
const safeAreaInsertTop = tv({
  base: ["z-0"],
  variants: {
    size: {
      sm: "px-3 min-w-16 h-8 text-tiny gap-2 rounded-small",
      md: "px-4 min-w-20 h-10 text-small gap-2 rounded-medium",
      lg: "px-6 min-w-24 h-12 text-medium gap-3 rounded-large",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [],
});

export type SafeAreaInsertTopVariantProps = VariantProps<typeof safeAreaInsertTop>;

export { safeAreaInsertTop };
