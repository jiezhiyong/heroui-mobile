import type { SmsTickerRefApi } from "../src";

import * as React from "react";
import { act, render, screen } from "@testing-library/react";

import { SmsTicker } from "../src";

describe("SmsTicker", () => {
  it("should render correctly", () => {
    const wrapper = render(<SmsTicker />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<SmsTickerRefApi>();

    render(<SmsTicker ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("ref.start should start countdown", async () => {
    const onClick = jest.fn();
    const onTick = jest.fn();
    const ref = React.createRef<SmsTickerRefApi>();

    render(
      <SmsTicker
        ref={ref}
        totalTicks={60}
        onBeforeCountdown={() => Promise.resolve()}
        onClick={onClick}
        onTick={onTick}
      />,
    );

    const button = screen.getByRole("button");

    await act(async () => {
      await ref.current?.start();
      await Promise.resolve();
    });

    expect(onTick).toHaveBeenCalledWith(60);
    expect(button).toHaveTextContent("60s");
    expect(onClick).not.toHaveBeenCalled();
  });
});
