import type { Meta } from "@storybook/react";
import type { SafeAreaInsetBottomProps } from "../src";

import { safeAreaInsetBottom } from "@heroui-mobile/theme";

import { SafeAreaInsetBottom } from "../src";

export default {
  title: "Components/SafeAreaInsetBottom",
  component: SafeAreaInsetBottom,
  argTypes: {},
} as Meta<typeof SafeAreaInsetBottom>;

const defaultProps = {
  ...safeAreaInsetBottom.defaultVariants,
};

const Template = (args: SafeAreaInsetBottomProps) => <SafeAreaInsetBottom {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
    visible: true,
  },
};
