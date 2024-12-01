"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Phone, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProduct } from "@/domain/query/product-query";
import { notFound } from "next/navigation";
import { formatPrice, getPhoneFromCookie } from "@/lib/utils";
import { lazy, useEffect, useState } from "react";
import { Discussion } from "@/type";
import { getDiscussion } from "@/domain/service/discussion-api";
const ProductDetailsChat = lazy(
  () => import("@/components/home/product-details/chat")
);

export default function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const { product, error } = useGetProduct(params.slug);
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const phone = getPhoneFromCookie();

  if (error) notFound();

  /**
   * Cherche le numéro de téléphone du client dans les cookies
   * Si trouvé, cherche la discussion associée
   * Sinon retourne une discussion vide
   */
  useEffect(() => {
    if (phone)
      getDiscussion({ slug, phone }).then((data) => setDiscussion(data));
  }, [phone, setDiscussion, slug]);

  return (
    <div className="relative pb-8 pt-16">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link
              href="/product"
              className="text-[#2C5F2D] hover:text-[#1F4F1F]"
            >
              <ChevronLeft className="mr-2 size-4" />
              Retour aux produits
            </Link>
          </Button>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl font-bold text-[#2C5F2D]">
                  {product?.name}
                </CardTitle>
                <CardDescription className="text-lg text-[#4A6741]">
                  Code: {product?.code}
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="border-[#97BC62] text-[#97BC62]"
              >
                {product?.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="md:w-1/2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/image/${product?.file}`}
                  alt={product?.name ?? ""}
                  width={100}
                  height={100}
                  className="w-full rounded-lg object-cover"
                />
              </div>
              <div className="space-y-4 md:w-1/2">
                <div
                  dangerouslySetInnerHTML={{
                    __html: product?.description ?? "",
                  }}
                  className="text-[#4A6741]"
                />
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2C5F2D]">
                    Localisation :
                  </span>
                  <span>{product?.localisation}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2C5F2D]">
                    Est un produit périmable ?
                  </span>
                  <span>
                    {product?.isPerishable ? (
                      <Check className="text-green-600" />
                    ) : (
                      <X className="text-red-600" />
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2C5F2D]">
                    Est un produit dérivé ?
                  </span>
                  <span>
                    {product?.isDerivedProduct ? (
                      <Check className="text-green-600" />
                    ) : (
                      <X className="text-red-600" />
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2C5F2D]">
                    En Stock :
                  </span>
                  <span>
                    {product?.quantity} {product?.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between text-2xl font-bold">
                  <span className="text-[#2C5F2D]">Prix de base :</span>
                  <span className="text-[#FFB302]">
                    {formatPrice(product?.basePrice.toFixed(2) ?? "")} /{" "}
                    {product?.unit}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold text-[#2C5F2D]">
                Variations de prix
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prix</TableHead>
                    <TableHead>Paramètre</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product?.pricings.map((variation, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {formatPrice(variation.price.toFixed(2))}
                      </TableCell>
                      <TableCell>{variation.parameterType}</TableCell>
                      <TableCell>{variation.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <div className="flex justify-start space-x-2 text-[#2C5F2D]">
                <Phone className="size-5" />
                <h3 className="mb-2 text-xl font-semibold text-[#2C5F2D]">
                  Contacts du vendeur
                </h3>
              </div>

              <div className="flex justify-start gap-4">
                {product?.companyPhones.map((phone, index) => (
                  <span className="font-semibold " key={index}>
                    {phone}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Section */}
        {product && (
          <ProductDetailsChat
            slug={params.slug}
            discussion={discussion}
            setDiscussion={setDiscussion}
          />
        )}
      </div>
    </div>
  );
}
