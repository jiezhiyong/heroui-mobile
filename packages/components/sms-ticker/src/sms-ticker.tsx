import type { UseSmsTickerProps, SmsTickerRefApi } from "./use-sms-ticker";

import { forwardRef, useImperativeHandle } from "react";

import { useSmsTicker } from "./use-sms-ticker";

export interface SmsTickerProps extends UseSmsTickerProps {}

const SmsTicker = forwardRef<SmsTickerRefApi, SmsTickerProps>((props, ref) => {
  const {
    Component,
    domRef,
    styles,
    children,
    handleStart,
    isRunning,
    isStarting,
    displayText,
    ...otherProps
  } = useSmsTicker({ ...props });

  // 暴露 ref API
  useImperativeHandle(ref, () => ({
    start: handleStart,
  }));

  return (
    <Component
      ref={domRef}
      aria-disabled={isRunning || isStarting}
      className={styles}
      role="button"
      tabIndex={isRunning || isStarting ? -1 : 0}
      onClick={handleStart}
      {...otherProps}
    >
      {displayText}
      {children}
    </Component>
  );
});

SmsTicker.displayName = "HeroUI.SmsTicker";

export default SmsTicker;
