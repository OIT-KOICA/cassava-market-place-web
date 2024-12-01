import { Button } from "@/components/ui/button";
import { ProductDTO } from "@/type";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

function ProductDetailsHero({ product }: { product: ProductDTO }) {
  return (
    <div className="relative bg-gradient-to-r from-primary to-secondary pb-8 pt-16 text-white">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-4 text-white" asChild>
          <Link href="/">
            <ChevronLeft className="mr-2 size-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>
        
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/image/${product.file}`}
            alt={product.name ?? "Image du produit"}
            width={100}
            height={100}
            className="rounded-full border-4 border-white"
            style={{ objectFit: "cover" }}
          />
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-sm opacity-80">{product.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductDetailsHero);
