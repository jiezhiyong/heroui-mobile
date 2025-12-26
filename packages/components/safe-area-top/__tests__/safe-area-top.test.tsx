import * as React from "react";
import { render } from "@testing-library/react";

import { SafeAreaTop } from "../src";

describe("SafeAreaTop", () => {
  it("should render correctly", () => {
    const wrapper = render(<SafeAreaTop />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<SafeAreaTop ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
