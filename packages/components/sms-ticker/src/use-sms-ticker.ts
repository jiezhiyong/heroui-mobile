import type { HTMLHeroUIProps } from "@heroui/system";
import type { ReactRef } from "@heroui/react-utils";
import type { SmsTickerVariantProps } from "@heroui-mobile/theme";

import { smsTicker } from "@heroui-mobile/theme";
import { mapPropsVariants } from "@heroui/system";
import { useDOMRef } from "@heroui/react-utils";
import { objectToDeps } from "@heroui/shared-utils";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";

interface Props extends HTMLHeroUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * The children of the SmsTicker.
   */
  children?: React.ReactNode;
  /**
   * Whether the SmsTicker should display a ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * 倒计时开始前的回调函数
   */
  onBeforeCountdown?: () => Promise<void>;
  /**
   * 总倒计时秒数，默认：60
   */
  totalTicks?: number;
  /**
   * 倒计时回调函数
   */
  onTick?: (time: number) => void | Promise<void>;
  /**
   * 倒计时间隔（毫秒），默认：1000
   */
  duration?: number;
  /**
   * 是否自动开始倒计时，默认：false
   * 注意：不会自动调用 onBeforeCountdown
   */
  autoStart?: boolean;
  /**
   * 倒计时格式化模板，默认：'{t}s'，也可以传入一个函数，根据时间返回不同的文案
   */
  format?: string | ((time: number) => string | React.ReactNode);
  /**
   * 未开始倒计时时的文案
   */
  displayUnstarted?: string | React.ReactNode;
  /**
   * 倒计时结束文案
   */
  displayEnded?: string | React.ReactNode;
  /**
   * 验证码请求函数执行时的显示文案
   */
  displayProcessing?: string | React.ReactNode;
  /**
   * 是否禁用倒计时
   */
  isDisabled?: boolean;
}

export type UseSmsTickerProps = Props & SmsTickerVariantProps;

export type SmsTickerRefApi = {
  /**
   * 手动触发开始倒计时
   */
  start: () => void | Promise<void>;
};

export function useSmsTicker(originalProps: UseSmsTickerProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, smsTicker.variantKeys);

  const {
    ref,
    as,
    children,
    className,
    disableRipple = false,
    isDisabled = false,
    onBeforeCountdown,
    totalTicks = 60,
    duration = 1000,
    autoStart = false,
    format = "{t}s",
    displayUnstarted = "获取验证码",
    displayEnded = "重新获取",
    displayProcessing = "发送中...",
    onTick,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  // 倒计时状态
  const [remainingTime, setRemainingTime] = useState<number>(totalTicks);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string | React.ReactNode>(displayUnstarted);

  const onTickRef = useRef(onTick);
  const onBeforeCountdownRef = useRef(onBeforeCountdown);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    onBeforeCountdownRef.current = onBeforeCountdown;
  }, [onBeforeCountdown]);

  const getFormattedText = (time: number) => {
    return typeof format === "function" ? format(time) : format.replace("{t}", String(time));
  };

  // 倒计时逻辑
  useEffect(() => {
    if (!isRunning || remainingTime <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        const next = prev - 1;

        if (next > 0) {
          setDisplayText(getFormattedText(next));
          onTickRef.current?.(next);

          return next;
        } else {
          setIsRunning(false);
          setDisplayText(displayEnded);
          onTickRef.current?.(0);

          return 0;
        }
      });
    }, duration);

    return () => clearInterval(timer);
  }, [isRunning, remainingTime, format, displayEnded, duration]);

  // 自动开始逻辑
  useEffect(() => {
    if (autoStart) {
      setIsRunning(true);
    }
  }, [autoStart]);

  // 手动触发开始倒计时
  const handleStart = useCallback(() => {
    if (isRunning || isStarting || isDisabled) {
      return;
    }

    setIsStarting(true);
    setDisplayText(displayProcessing);

    onBeforeCountdownRef
      .current?.()
      .then(() => {
        setIsRunning(true);
        setIsStarting(false);
        setDisplayText(getFormattedText(totalTicks));
        onTickRef.current?.(totalTicks);
      })
      .catch(() => {
        setDisplayText(displayUnstarted);
        setIsStarting(false);
      });
  }, [isRunning, isStarting, isDisabled, displayProcessing, totalTicks, format, displayUnstarted]);

  const styles = useMemo(
    () =>
      smsTicker({
        ...variantProps,
        isDisabled,
        className,
      }),
    [objectToDeps(variantProps), isRunning, isDisabled, className],
  );

  return {
    Component,
    children,
    styles,
    domRef,
    displayText,
    handleStart,
    isRunning,
    isStarting,
    ...otherProps,
  };
}

export type UseSmsTickerReturn = ReturnType<typeof useSmsTicker>;
