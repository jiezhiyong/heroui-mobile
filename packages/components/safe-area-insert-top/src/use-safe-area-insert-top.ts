import type { SafeAreaInsertTopVariantProps } from "@heroui-mobile/theme";
import type { HTMLHeroUIProps } from "@heroui-mobile/system";
import type { ReactRef } from "@heroui-mobile/react-utils";

import { mapPropsVariants } from "@heroui-mobile/system";
import { safeAreaInsertTop } from "@heroui-mobile/theme";
import { useDOMRef } from "@heroui-mobile/react-utils";
import { objectToDeps } from "@heroui-mobile/shared-utils";
import { useMemo } from "react";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export type UseSafeAreaInsertTopProps = Props & SafeAreaInsertTopVariantProps;

export function useSafeAreaInsertTop(originalProps: UseSafeAreaInsertTopProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, safeAreaInsertTop.variantKeys);

  const { ref, as, className, ...otherProps } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      safeAreaInsertTop({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  return { Component, styles, domRef, ...otherProps };
}

export type UseSafeAreaInsertTopReturn = ReturnType<typeof useSafeAreaInsertTop>;
