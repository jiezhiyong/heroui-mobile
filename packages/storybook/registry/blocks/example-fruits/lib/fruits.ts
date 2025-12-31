export type Fruit = {
  title: string;
  img: string;
  price: string;
};

export function getFruitList(): Fruit[] {
  return [
    {
      title: "Orange",
      img: "https://canary.heroui.com/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://canary.heroui.com/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://canary.heroui.com/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://canary.heroui.com/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://canary.heroui.com/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://canary.heroui.com/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "https://canary.heroui.com/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "https://canary.heroui.com/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];
}
