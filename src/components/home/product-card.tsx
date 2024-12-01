import Image from "next/image";
import { memo } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MessageSquare, User } from "lucide-react";
import Link from "next/link";
import { ProductDTO } from "@/type";
import { formatPrice } from "@/lib/utils";

function ProductCard({ product }: { product: ProductDTO }) {
  return (
    <div className="h-1/2 overflow-hidden rounded-lg bg-card shadow-md transition-transform hover:scale-105">
      <div className="relative h-2/3">
        <Image
          src={
            product.file ?? product.type == "PRODUCT"
              ? "/images/cassava.jpg"
              : "/images/tractor.jpg"
          }
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute right-2 top-2">
          <Badge variant="secondary" className="font-semibold">
            {product.category}
          </Badge>
        </div>
      </div>
      <div className="h-1/3 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="line-clamp-1 text-lg font-semibold">{product.name}</h3>
          <div className="flex items-center">
            <div className="mr-2 size-6 overflow-hidden rounded-full bg-primary/10">
              <User width={24} height={24} />
            </div>
            <span className="line-clamp-1 text-sm text-muted-foreground">
              {product.company}
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.basePrice.toFixed(2))}
          </span>
          <span className="text-sm text-muted-foreground">
            par {product.unit}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {product.localisation}
          </span>
          <Link href={`/product/${product.slug}`}>
            <Button
              variant="outline"
              size="sm"
              className="border border-primary"
            >
              Discuter avec le vendeur{" "}
              <MessageSquare className="text-primary" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
