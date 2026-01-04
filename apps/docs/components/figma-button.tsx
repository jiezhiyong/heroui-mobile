"use client";

import { Button, Link } from "@heroui/react";

export const FigmaButton = () => {
  return (
    <Button
      isExternal
      showAnchorIcon
      as={Link}
      className="max-w-fit text-current"
      color="default"
      href="https://www.figma.com/community/file/1267584376234254760"
      variant="bordered"
    >
      Open in Figma
    </Button>
  );
};
