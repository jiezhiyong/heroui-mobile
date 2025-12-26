import type { Meta } from "@storybook/react";

import { smsTicker } from "@heroui-mobile/theme";

import { SmsTicker } from "../src";

export default {
  title: "Components/SmsTicker",
  component: SmsTicker,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "bordered", "light", "flat", "faded", "shadow", "ghost"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    spinnerPlacement: {
      control: {
        type: "select",
      },
      options: ["start", "end"],
    },
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    isLoading: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof SmsTicker>;

const defaultProps = {
  ...smsTicker.defaultVariants,
};

export const Default = {
  args: {
    ...defaultProps,
    isLoading: false,
  },
};

export const IsDisabled = {
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const IsLoading = {
  args: {
    ...defaultProps,
    isLoading: true,
  },
};

export const CustomWithAutoStart = {
  args: {
    ...defaultProps,
    radius: "full",
    autoStart: true,
    className: "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
  },
};
