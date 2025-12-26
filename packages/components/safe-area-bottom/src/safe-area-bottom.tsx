import type { UseSafeAreaBottomProps } from "./use-safe-area-bottom";

import { forwardRef } from "@heroui/system";

import { useSafeAreaBottom } from "./use-safe-area-bottom";

export interface SafeAreaBottomProps extends UseSafeAreaBottomProps {}

const SafeAreaBottom = forwardRef<"div", SafeAreaBottomProps>((props, ref) => {
  const { Component, domRef, children, styles, ...otherProps } = useSafeAreaBottom({
    ...props,
    ref,
  });

  return (
    <Component ref={domRef} className={styles} {...otherProps}>
      {children}
    </Component>
  );
});

SafeAreaBottom.displayName = "HeroUI.SafeAreaBottom";

export default SafeAreaBottom;
