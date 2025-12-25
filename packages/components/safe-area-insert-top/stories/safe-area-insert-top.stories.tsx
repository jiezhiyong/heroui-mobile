import type { Meta } from "@storybook/react";
import type { SafeAreaInsertTopProps } from "../src";

import { safeAreaInsertTop } from "@heroui-mobile/theme";

import { SafeAreaInsertTop } from "../src";

export default {
  title: "Components/SafeAreaInsertTop",
  component: SafeAreaInsertTop,
  argTypes: {},
} as Meta<typeof SafeAreaInsertTop>;

const defaultProps = {
  ...safeAreaInsertTop.defaultVariants,
};

const Template = (args: SafeAreaInsertTopProps) => <SafeAreaInsertTop {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
    visible: true,
  },
};
