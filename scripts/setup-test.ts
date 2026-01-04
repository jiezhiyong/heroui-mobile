/**
 * Jest 的测试环境初始化脚本（通常在 jest.config.js 里作为 setupFilesAfterEnv 或类似配置加载）。
 * 它在每次测试运行前给 JSDOM/Node 环境“补齐浏览器能力”、加一些 polyfill，并调整 Testing Library 的配置，保证组件测试更稳定。
 */
import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";

const {getComputedStyle} = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

if (typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

// Workaround https://github.com/jsdom/jsdom/issues/2524#issuecomment-897707183
global.TextEncoder = require("util").TextEncoder;

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

global.console.error = jest.fn().mockImplementation((message) => {
  if (message && typeof message === "string" && message.includes("Warning: `ReactDOMTestUtils.act`")) {
    return;
  }
});

configure({
  reactStrictMode: process.env.STRICT_MODE === "true",
});
