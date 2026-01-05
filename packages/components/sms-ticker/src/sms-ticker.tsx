import type { ReactRef } from "@heroui/react-utils";
import type { SmsTickerRefApi, UseSmsTickerProps } from "./use-sms-ticker";

import { Ripple } from "@heroui/ripple";
import { Spinner } from "@heroui/spinner";
import { forwardRef, useImperativeHandle } from "react";

import { useSmsTicker } from "./use-sms-ticker";

export interface SmsTickerProps extends UseSmsTickerProps {}

const SmsTicker = forwardRef<SmsTickerRefApi, SmsTickerProps>((props, ref) => {
  const {
    Component,
    domRef,
    children,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    isLoading,
    disableRipple,
    getButtonProps,
    getRippleProps,
    handleStart,
    displayText,
  } = useSmsTicker({ ...props, ref: ref as ReactRef<HTMLButtonElement | null> });

  // 暴露 ref API
  useImperativeHandle(ref, () => ({
    start: handleStart,
  }));

  return (
    <Component ref={domRef} {...getButtonProps()}>
      {isLoading && spinnerPlacement === "start" && spinner}
      {displayText}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {!disableRipple && <Ripple {...getRippleProps()} />}
    </Component>
  );
});

SmsTicker.displayName = "HeroUI.SmsTicker";

export default SmsTicker;
