import type { Meta } from "@storybook/react";

import ExampleFruits from "@/registry/blocks/example-fruits/index";

export default {
  title: "Blocks/example-fruits",
  component: ExampleFruits,
  tags: ["block"],
} as Meta<typeof ExampleFruits>;

export const Default = {};
