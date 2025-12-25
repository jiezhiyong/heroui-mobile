import type { Meta } from "@storybook/react";
import type { SmsTickerProps, SmsTickerRefApi } from "../src";
import type { RefAttributes } from "react";

import { smsTicker } from "@heroui-mobile/theme";

import { SmsTicker } from "../src";

export default {
  title: "Components/SmsTicker",
  component: SmsTicker,
  argTypes: {
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof SmsTicker>;

const defaultProps = {
  ...smsTicker.defaultVariants,
};

const Template = (args: SmsTickerProps & RefAttributes<SmsTickerRefApi>) => <SmsTicker {...args} />;

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
