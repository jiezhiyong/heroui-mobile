import * as React from "react";
import {render} from "@testing-library/react";

import { SafeAreaInsertTop } from "../src";

describe("SafeAreaInsertTop", () => {
  it("should render correctly", () => {
   const wrapper = render(<SafeAreaInsertTop />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<SafeAreaInsertTop ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
