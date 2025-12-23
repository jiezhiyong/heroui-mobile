import { renderHook } from "@testing-library/react";

import { useNavigate } from "../src";

describe("useNavigate", () => {
  it("should work correctly", () => {
    const { result } = renderHook(() => useNavigate());

    // Add your test here
  });
});
