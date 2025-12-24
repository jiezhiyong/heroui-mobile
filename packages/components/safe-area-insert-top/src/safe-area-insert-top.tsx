import type { UseSafeAreaInsertTopProps } from "./use-safe-area-insert-top";

import { forwardRef } from "@heroui/system";

import { useSafeAreaInsertTop } from "./use-safe-area-insert-top";

export interface SafeAreaInsertTopProps extends UseSafeAreaInsertTopProps {}

const SafeAreaInsertTop = forwardRef<"div", SafeAreaInsertTopProps>((props, ref) => {
  const { Component, domRef, children, styles, ...otherProps } = useSafeAreaInsertTop({
    ...props,
    ref,
  });

  return (
    <Component ref={domRef} className={styles} {...otherProps}>
      {children}
    </Component>
  );
});

SafeAreaInsertTop.displayName = "HeroUI.SafeAreaInsertTop";

export default SafeAreaInsertTop;
