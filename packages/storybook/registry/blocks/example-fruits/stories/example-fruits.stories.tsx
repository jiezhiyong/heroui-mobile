import type { Meta } from "@storybook/react";

import ExampleFruits from "../page";

export default {
  title: "Blocks/Fruits",
  component: ExampleFruits,
  argTypes: {},
  tags: ["!autodocs"],
} as Meta<typeof ExampleFruits>;

export const Default = {
  render: ExampleFruits,
  args: {},
};
