import type { UseSafeAreaInsetBottomProps } from "./use-safe-area-inset-bottom";

import { forwardRef } from "@heroui/system";

import { useSafeAreaInsetBottom } from "./use-safe-area-inset-bottom";

export interface SafeAreaInsetBottomProps extends UseSafeAreaInsetBottomProps {}

const SafeAreaInsetBottom = forwardRef<"div", SafeAreaInsetBottomProps>((props, ref) => {
  const { Component, domRef, children, styles, ...otherProps } = useSafeAreaInsetBottom({
    ...props,
    ref,
  });

  return (
    <Component ref={domRef} className={styles} {...otherProps}>
      {children}
    </Component>
  );
});

SafeAreaInsetBottom.displayName = "HeroUI.SafeAreaInsetBottom";

export default SafeAreaInsetBottom;
