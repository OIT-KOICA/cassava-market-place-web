import { memo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { supporters } from "@/lib/data";

function Supporters() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-[#2C5F2D]">
          Enracinés dans le partenariat
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#4A6741]">
          Nous sommes fiers de collaborer avec ces organisations estimées,
          travaillant ensemble pour cultiver un avenir durable et prospère pour
          l&apos;agriculture.
        </p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        >
          <CarouselContent>
            {supporters.map((supporter, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-lg">
                    <CardContent className="flex aspect-square items-center justify-center bg-[#F0F4E3] p-6">
                      <Image
                        src={supporter.logo}
                        alt={supporter.name}
                        width={120}
                        height={80}
                        className="max-h-full max-w-full object-contain"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-[#97BC62] text-white hover:bg-[#7A9E4E]" />
          <CarouselNext className="bg-[#97BC62] text-white hover:bg-[#7A9E4E]" />
        </Carousel>
      </div>
    </section>
  );
}

export default memo(Supporters);
