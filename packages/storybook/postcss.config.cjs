/**
 * Storybook 的 PostCSS 配置（CJS）。
 *
 * 说明：
 * - `packages/storybook` 是 ESM 包（package.json: "type": "module"）
 * - 但 PostCSS 配置在 Storybook/Vite 的某些加载链路里仍可能按 CJS 读取
 * - 如果使用 `postcss.config.js` 的 ESM default export，可能导致 plugins 解析异常，
 *   进而触发 `[postcss] Cannot read properties of undefined (reading 'call')`
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
