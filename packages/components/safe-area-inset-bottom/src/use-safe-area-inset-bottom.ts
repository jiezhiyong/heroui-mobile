import type { SafeAreaInsetBottomVariantProps } from "@heroui-mobile/theme";
import type { HTMLHeroUIProps } from "@heroui/system";
import type { ReactRef } from "@heroui/react-utils";

import { mapPropsVariants } from "@heroui/system";
import { safeAreaInsetBottom } from "@heroui-mobile/theme";
import { useDOMRef } from "@heroui/react-utils";
import { objectToDeps } from "@heroui/shared-utils";
import { useMemo } from "react";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export type UseSafeAreaInsetBottomProps = Props & SafeAreaInsetBottomVariantProps;

export function useSafeAreaInsetBottom(originalProps: UseSafeAreaInsetBottomProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, safeAreaInsetBottom.variantKeys);

  const { ref, as, className, ...otherProps } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      safeAreaInsetBottom({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  return { Component, styles, domRef, ...otherProps };
}

export type UseSafeAreaInsetBottomReturn = ReturnType<typeof useSafeAreaInsetBottom>;
