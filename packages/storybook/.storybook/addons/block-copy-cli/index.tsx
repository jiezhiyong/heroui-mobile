"use client";

import { useEffect, useState } from "react";
import { useOf, Source } from "@storybook/blocks";
import React from "react";

export const BlockCopyCli = ({ of }: { of?: any }) => {
  const resolvedOf = useOf(of || "meta", ["meta"]);
  const [commandStr, setCommandStr] = useState<string>("");

  useEffect(() => {
    if (resolvedOf.type === "meta") {
      const str = resolvedOf.preparedMeta?.title?.split("/")[1];
      setCommandStr(`npx shadcn@latest add @heroui-mobile/${str}`);
    }
  }, [resolvedOf]);

  if (!resolvedOf.preparedMeta?.tags?.includes("block")) {
    return null;
  }

  return (
    <>
      <h3>Install with Shadcn CLI</h3>
      <Source code={commandStr} language="bash" dark={true} />
    </>
  );
};
