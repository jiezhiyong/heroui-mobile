import { dirname, join } from "path";
import remarkGfm from "remark-gfm";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "./introduction.mdx",
    "../../components/**/stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../../core/theme/stories/*.stories.@(js|jsx|ts|tsx)",
    "../registry/**/stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  staticDirs: ["../public"],

  tags: {
    block: {},
  },
  addons: [
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("storybook-dark-mode"),
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "./addons/react-strict-mode/register",
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  typescript: {
    reactDocgen: false,
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

export default config;
