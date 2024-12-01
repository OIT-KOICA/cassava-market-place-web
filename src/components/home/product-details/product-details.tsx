import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { ProductDTO } from "@/type";
import { format } from "date-fns";
import Image from "next/image";
import { memo } from "react";

function ProductDetailsComponent({ product }: { product: ProductDTO }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <h2 className="mb-4 text-xl font-semibold">Détails du produit</h2>
        <div className="space-y-4">
          <div>
            <span className="font-medium">Categorie :</span>{" "}
            <span className="rounded-xl bg-slate-400 p-2 text-sm font-semibold dark:bg-white">
              {product.category}
            </span>
          </div>
          <div>
            <span className="font-medium">Prix de base :</span>{" "}
            <span className="font-semibold text-primary">
              {formatPrice(product.basePrice.toFixed(2))}
            </span>{" "}
            par <span className="font-semibold italic">{product.unit}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 font-medium">Est un produit dérivé ?</span>
            <Checkbox checked={product.isDerivedProduct} disabled />
          </div>
          <div className="flex items-center">
            <span className="mr-2 font-medium">Est périsable ?</span>
            <Checkbox checked={product.isPerishable} disabled />
          </div>
          <div>
            <span className="font-medium">Quantité disponible :</span>{" "}
            {product.quantity} {product.unit}
          </div>
          <div>
            <span className="font-medium">Zone de localisation :</span>{" "}
            {product.localisation}
          </div>
          <div>
            <span className="font-medium">Ajouté le :</span>{" "}
            {format(product.createdAt, "MMMM d, yyyy")}
          </div>
        </div>

        <h3 className="mb-2 mt-6 text-lg font-semibold">Variations de prix</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prix</TableHead>
              <TableHead>Condition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product.pricings.map((price, index) => (
              <TableRow key={index}>
                <TableCell>{formatPrice(price.price.toFixed(2))}</TableCell>
                <TableCell>{price.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Images du produit</h2>
        <div className="space-y-4">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/image/${product.file}`}
            alt={product.name ?? "Image du produit"}
            width={600}
            height={400}
            className="w-full rounded-lg"
            style={{ objectFit: "cover" }}
          />
          <div>
            <h2 className="mb-4 text-xl font-semibold">
              Description du produit
            </h2>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductDetailsComponent);
