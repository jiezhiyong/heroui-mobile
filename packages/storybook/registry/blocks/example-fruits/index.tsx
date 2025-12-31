import type { Fruit } from "@/registry/blocks/example-fruits/lib/fruits";

import { useEffect, useState } from "react";

import Fruits from "@/registry/blocks/example-fruits/components/fruits";
import { getFruitList } from "@/registry/blocks/example-fruits/lib/fruits";
import "./index.css";

export default function ExampleFruits() {
  const [fruits, setFruits] = useState<Fruit[]>([]);

  useEffect(() => {
    setFruits(getFruitList());
  }, []);

  return <Fruits items={fruits} />;
}
