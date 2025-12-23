import type { Meta } from "@storybook/react";
import type { SafeAreaInsertTopProps } from "../src";

import React from "react";
import { safeAreaInsertTop } from "@heroui-mobile/theme";

import { SafeAreaInsertTop } from "../src";

export default {
  title: "Components/SafeAreaInsertTop",
  component: SafeAreaInsertTop,
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof SafeAreaInsertTop>;

const defaultProps = {
  ...safeAreaInsertTop.defaultVariants,
};

const Template = (args: SafeAreaInsertTopProps) => <SafeAreaInsertTop {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
