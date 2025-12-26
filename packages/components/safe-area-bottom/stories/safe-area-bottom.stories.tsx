import type { Meta } from "@storybook/react";
import type { SafeAreaBottomProps } from "../src";

import { safeAreaBottom } from "@heroui-mobile/theme";

import { SafeAreaBottom } from "../src";

export default {
  title: "Components/SafeAreaBottom",
  component: SafeAreaBottom,
  argTypes: {},
} as Meta<typeof SafeAreaBottom>;

const defaultProps = {
  ...safeAreaBottom.defaultVariants,
};

const Template = (args: SafeAreaBottomProps) => <SafeAreaBottom {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
    visible: true,
  },
};
