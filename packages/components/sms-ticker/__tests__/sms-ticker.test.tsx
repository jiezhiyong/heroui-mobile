import type { SmsTickerRefApi } from "../src";

import * as React from "react";
import { render } from "@testing-library/react";

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
});
