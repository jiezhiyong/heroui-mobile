import { Card, CardBody, CardFooter, Image } from "@heroui/react";

export default function Fruits({
  items = [],
}: {
  items: { title: string; img: string; price: string }[];
}) {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {items.map((item, index) => (
        <Card key={index} isPressable shadow="sm">
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.title}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src={item.img}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
