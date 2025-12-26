import type { Meta } from "@storybook/react";
import type { SafeAreaTopProps } from "../src";

import { safeAreaTop } from "@heroui-mobile/theme";

import { SafeAreaTop } from "../src";

export default {
  title: "Components/SafeAreaTop",
  component: SafeAreaTop,
  argTypes: {},
} as Meta<typeof SafeAreaTop>;

const defaultProps = {
  ...safeAreaTop.defaultVariants,
};

const Template = (args: SafeAreaTopProps) => <SafeAreaTop {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
    visible: true,
  },
};
