import type { VariantProps } from "tailwind-variants";

import { tv } from "tailwind-variants";

/**
 * SmsTicker wrapper **Tailwind Variants** component
 *
 * @example
 * <div
 *  className={smsTicker({...}))}
 * />
 */
const smsTicker = tv({
  base: [
    "min-h-[54px]",
    "rounded-[50vh]",
    "border-2",
    "border-transparent",
    "bg-primary",
    "px-5",
    "py-[13px]",
    "text-sm",
    "leading-[24px]",
    "text-white",
    "cursor-pointer",
    "transition-colors",
    "select-none",
  ],
  variants: {
    isDisabled: {
      true: ["opacity-50", "cursor-not-allowed"],
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

export type SmsTickerVariantProps = VariantProps<typeof smsTicker>;

export { smsTicker };
