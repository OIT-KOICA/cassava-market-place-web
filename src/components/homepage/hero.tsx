import Image from "next/image";
import { memo } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

function Hero() {
  return (
    <section className="relative flex h-[70vh] items-center justify-center overflow-hidden">
      <Image
        src="/images/cassava-bg.jpg"
        alt="Cassava Market Place"
        fill
        style={{ objectFit: "cover" }}
        priority
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2C5F2D]/80 to-[#97BC62]/80"></div>
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
          Cultiver les liens, accroître la prospérité
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl md:text-2xl">
          Rejoignez notre marché florissant où l&apos;agriculture rencontre
          l&apos;innovation, en donnant aux communautés les moyens d&apos;agir
          et en favorisant une croissance durable.
        </p>
        <Button
          size="lg"
          className="bg-[#FFB302] font-semibold text-[#2C5F2D] hover:bg-[#FFA500]"
          asChild
        >
          <Link href="/product">
            Découvrez notre récolte
            <ChevronRight className="ml-2 size-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default memo(Hero);
