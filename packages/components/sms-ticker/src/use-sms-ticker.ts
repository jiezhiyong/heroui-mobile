import type { SmsTickerVariantProps } from "@heroui-mobile/theme";
import type { ReactRef } from "@heroui/react-utils";
import type { RippleProps } from "@heroui/ripple";
import type { SpinnerProps } from "@heroui/spinner";
import type { HTMLHeroUIProps, PropGetter } from "@heroui/system";
import type { AriaButtonProps } from "@heroui/use-aria-button";
import type { PressEvent } from "@react-aria/interactions";
import type { MouseEventHandler, ReactNode } from "react";

import { smsTicker } from "@heroui-mobile/theme";
import { filterDOMProps, useDOMRef } from "@heroui/react-utils";
import { useRipple } from "@heroui/ripple";
import { dataAttr } from "@heroui/shared-utils";
import { useProviderContext } from "@heroui/system";
import { useAriaButton } from "@heroui/use-aria-button";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { chain, mergeProps } from "@react-aria/utils";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Props extends HTMLHeroUIProps<"button"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLButtonElement | null>;
  /**
   * Whether the SmsTicker should display a ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * Spinner to display when loading.
   * @see https://heroui.com/components/spinner
   */
  spinner?: ReactNode;
  /**
   * The spinner placement.
   * @default "start"
   */
  spinnerPlacement?: "start" | "end";
  /**
   * Whether the button should display a loading spinner.
   * @default false
   */
  isLoading?: boolean;
  /**
   * The native button click event handler.
   * use `onPress` instead.
   * @deprecated
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
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
}

export type UseSmsTickerProps = Props &
  Omit<AriaButtonProps, keyof SmsTickerVariantProps> &
  SmsTickerVariantProps;

export type SmsTickerRefApi = {
  /**
   * 手动触发开始倒计时
   */
  start: () => void | Promise<void>;
};

export function useSmsTicker(props: UseSmsTickerProps) {
  const globalContext = useProviderContext();

  const {
    ref,
    as,
    children,
    autoFocus,
    className,
    spinner,
    isLoading = false,
    disableRipple: disableRippleProp = false,
    fullWidth = false,
    radius,
    size = "md",
    color = "default",
    variant = "solid",
    disableAnimation = globalContext?.disableAnimation ?? false,
    isDisabled: isDisabledProp = false,
    spinnerPlacement = "start",
    onPress,
    onClick,
    onBeforeCountdown = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return Promise.resolve();
    },
    totalTicks = 60,
    duration = 1000,
    autoStart = false,
    format = "{t}s",
    displayUnstarted = "获取验证码",
    displayEnded = "重新获取",
    displayProcessing = "发送中",
    onTick,
    ...otherProps
  } = props;

  const Component = as || "button";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const { isFocusVisible, isFocused, focusProps } = useFocusRing({
    autoFocus,
  });

  // 倒计时状态
  const [remainingTime, setRemainingTime] = useState<number>(totalTicks);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isStarting, setIsStarting] = useState<boolean>(isLoading);
  const [displayText, setDisplayText] = useState<string | React.ReactNode>(
    isLoading ? displayProcessing : displayUnstarted,
  );

  useEffect(() => {
    if (isLoading) {
      setIsStarting(true);
      setDisplayText(displayProcessing);
    } else {
      setIsStarting(false);
      setDisplayText(displayUnstarted);
    }
  }, [isLoading]);

  const isDisabled = isDisabledProp || isStarting;
  const disableRipple =
    ((disableRippleProp || globalContext?.disableRipple) ?? disableAnimation) || isRunning;

  const styles = useMemo(
    () =>
      smsTicker({
        size,
        color,
        variant,
        radius,
        fullWidth,
        isDisabled,
        disableAnimation,
        className,
      }),
    [size, color, variant, radius, fullWidth, isDisabled, disableAnimation, className],
  );

  // 格式化倒计时文本
  const getFormattedText = (time: number) => {
    return typeof format === "function" ? format(time) : format.replace("{t}", String(time));
  };

  // 手动触发开始倒计时
  const handleStart = useCallback(() => {
    if (isRunning || isStarting || isDisabled) {
      return;
    }

    setIsStarting(true);
    setDisplayText(displayProcessing);

    onBeforeCountdown?.()
      .then(() => {
        setRemainingTime(totalTicks);
        setIsRunning(true);
        setIsStarting(false);
        setDisplayText(getFormattedText(totalTicks));
        onTick?.(totalTicks);
      })
      .catch(() => {
        setDisplayText(displayUnstarted);
        setIsStarting(false);
      });
  }, [
    isRunning,
    isStarting,
    isDisabled,
    displayProcessing,
    displayUnstarted,
    onBeforeCountdown,
    onTick,
    totalTicks,
    format,
  ]);

  const handleStartPress = useCallback(
    (_e: PressEvent) => {
      handleStart();
    },
    [handleStart],
  );

  const { onPress: onRipplePressHandler, onClear: onClearRipple, ripples } = useRipple();

  const handlePress = useCallback(
    (e: PressEvent) => {
      if (disableRipple || isDisabled || disableAnimation) return;
      domRef.current && onRipplePressHandler(e);
    },
    [disableRipple, isDisabled, disableAnimation, domRef, onRipplePressHandler],
  );

  const { buttonProps: ariaButtonProps, isPressed } = useAriaButton(
    {
      elementType: as,
      isDisabled,
      onPress: chain(onPress, handleStartPress, handlePress),
      onClick,
      ...otherProps,
    } as AriaButtonProps,
    domRef,
  );

  const { isHovered, hoverProps } = useHover({ isDisabled });

  const getButtonProps: PropGetter = useCallback(
    (props = {}) => ({
      "data-disabled": dataAttr(isDisabled),
      "data-focus": dataAttr(isFocused),
      "data-pressed": dataAttr(isPressed),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-hover": dataAttr(isHovered),
      "data-loading": dataAttr(isStarting),
      ...mergeProps(
        ariaButtonProps,
        focusProps,
        hoverProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
        }),
        filterDOMProps(props),
      ),
      className: styles,
    }),
    [
      isStarting,
      isDisabled,
      isFocused,
      isPressed,
      shouldFilterDOMProps,
      isFocusVisible,
      isHovered,
      ariaButtonProps,
      focusProps,
      hoverProps,
      otherProps,
      styles,
    ],
  );

  const spinnerSize = useMemo(() => {
    const buttonSpinnerSizeMap: Record<string, SpinnerProps["size"]> = {
      sm: "sm",
      md: "sm",
      lg: "md",
    };

    return buttonSpinnerSizeMap[size];
  }, [size]);

  const getRippleProps = useCallback<() => RippleProps>(
    () => ({ ripples, onClear: onClearRipple }),
    [ripples, onClearRipple],
  );

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
          onTick?.(next);

          return next;
        } else {
          setIsRunning(false);
          setDisplayText(displayEnded);
          onTick?.(0);

          return 0;
        }
      });
    }, duration);

    return () => clearInterval(timer);
  }, [isRunning, remainingTime, format, displayEnded, duration, onTick]);

  // 自动开始逻辑
  useEffect(() => {
    if (autoStart) {
      setIsRunning(true);
    }
  }, [autoStart]);

  return {
    Component,
    children,
    domRef,
    spinner,
    styles,
    isLoading: isStarting,
    spinnerPlacement,
    spinnerSize,
    disableRipple,
    getButtonProps,
    getRippleProps,
    displayText,
    handleStart,
    isRunning,
  };
}

export type UseSmsTickerReturn = ReturnType<typeof useSmsTicker>;
