import type { UseSafeAreaTopProps } from "./use-safe-area-top";

import { forwardRef } from "@heroui/system";

import { useSafeAreaTop } from "./use-safe-area-top";

export interface SafeAreaTopProps extends UseSafeAreaTopProps {}

const SafeAreaTop = forwardRef<"div", SafeAreaTopProps>((props, ref) => {
  const { Component, domRef, children, styles, ...otherProps } = useSafeAreaTop({
    ...props,
    ref,
  });

  return (
    <Component ref={domRef} className={styles} {...otherProps}>
      {children}
    </Component>
  );
});

SafeAreaTop.displayName = "HeroUI.SafeAreaTop";

export default SafeAreaTop;
