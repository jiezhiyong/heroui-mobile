import * as React from "react";
import { render } from "@testing-library/react";

import { SafeAreaBottom } from "../src";

describe("SafeAreaBottom", () => {
  it("should render correctly", () => {
    const wrapper = render(<SafeAreaBottom />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<SafeAreaBottom ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
