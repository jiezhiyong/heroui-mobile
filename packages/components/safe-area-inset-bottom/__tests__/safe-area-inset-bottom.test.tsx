import * as React from "react";
import { render } from "@testing-library/react";

import { SafeAreaInsetBottom } from "../src";

describe("SafeAreaInsetBottom", () => {
  it("should render correctly", () => {
    const wrapper = render(<SafeAreaInsetBottom />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<SafeAreaInsetBottom ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
