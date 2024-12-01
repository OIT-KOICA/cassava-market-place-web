import { memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { products } from "@/lib/data";

function ProductDescription() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-[#2C5F2D]">
          Nourrir notre monde
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#4A6741]">
          Découvrez les cultures vitales qui forment l&apos;épine dorsale de
          notre écosystème, soutenant les communautés et favorisant une
          croissance durable.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {products.map((product, index) => (
            <Card
              key={index}
              className="overflow-hidden border-none shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full object-cover"
              />
              <CardHeader className="bg-[#97BC62] text-white">
                <CardTitle className="flex items-center">
                  <product.icon className="mr-2 size-6" />
                  {product.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-[#F0F4E3] text-[#2C5F2D]">
                <CardDescription className="text-[#4A6741]">
                  {product.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ProductDescription);
