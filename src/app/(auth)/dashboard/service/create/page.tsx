"use client";

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { ProductFormValues, productSchema } from "@/schemas/product-schema";
import useProductStore from "@/domain/store/product-store";
import {
  useCreateProduct,
} from "@/domain/query/product-query";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useGetCities, useGetUnits } from "@/domain/query/configuration-query";
import dynamic from "next/dynamic"; // Importer le thème CSS de Quill

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function ServiceDashboardCreatePage() {
  const { data: session, status } = useSession();
  const setActiveProduct = useProductStore((state) => state.activeProduct);
  const createProduct = useCreateProduct();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { cities } = useGetCities();
  const { units } = useGetUnits();
  const [customUnit, setCustomUnit] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (session && Math.floor(Date.now() / 1000) > (session.expiresAt as number))
    ) {
      signIn("keycloak"); // Redirige vers Keycloak si non connecté
    }
  }, [session, status]);

  /**
   * For React Quill
   */
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // Titres
      ["bold", "italic", "underline", "strike"], // Styles de texte
      [{ list: "ordered" }, { list: "bullet" }], // Listes
      ["link", "image"], // Liens et images
      ["clean"], // Nettoyer le texte
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      pricings: [{ parameterType: "", price: "", description: "" }],
    },
  });

  const {
    fields: pricingFields,
    append: appendPricing,
    remove: removePricing,
  } = useFieldArray({
    control,
    name: "pricings",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("file", file); // Mettre à jour le champ dans React Hook Form
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUnitChange = (value: string) => {
    if (value === "Autre") setCustomUnit(true);
    else {
      setValue("unit", value);
      setCustomUnit(false);
    }
  };

  const onSubmit: SubmitHandler<ProductFormValues> = async (
    data: ProductFormValues
  ) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("code", data.code);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("unit", data.unit);
    formData.append("type", data.type);
    formData.append("isPerishable", data.isPerishable + "");
    formData.append("isDerivedProduct", data.isDerivedProduct + "");
    formData.append("basePrice", data.basePrice.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("localisation", data.localisation);

    if (data.file) formData.append("file", data.file);

    if (data.pricings && data.pricings?.length > 0)
      formData.append("pricings", JSON.stringify(data.pricings));

    setLoading(true);

    try {
      createProduct.mutate({
        productData: formData,
        token: session?.accessToken,
      });

      setActiveProduct(data);

      toast({
        variant: "default",
        title: "Message",
        description: "Traitement effectué avec succès !",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Message",
        description: "Une erreur c'est produit lors du traitement!",
      });
    }

    setLoading(false);
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Acceuil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard/service">
                  Services
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Créer un service</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex min-h-screen justify-center bg-[#F7F9F4] py-4">
        <div className="w-full px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="flex items-center justify-between gap-6">
              <div className="w-1/2">
                <Label htmlFor="name">Nom du service</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="w-1/2">
                <Label htmlFor="code">Code du service</Label>
                <Input id="code" {...register("code")} />
                {errors.code && (
                  <p className="text-sm text-red-500">{errors.code.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description du service</Label>
              <ReactQuill
                id="description"
                onChange={(content) => setValue("description", content)}
                modules={modules}
                formats={formats}
                theme="snow"
                className=""
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-6">
              <div className="w-1/2">
                <Label htmlFor="category">Catégorie du service</Label>
                <Select onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CORN">Maïs</SelectItem>
                    <SelectItem value="CASSAVA">Manioc</SelectItem>
                    <SelectItem value="CHICKEN">Poulet</SelectItem>
                    <SelectItem value="HIRE">Location</SelectItem>
                    <SelectItem value="TRANSPORT">Transport</SelectItem>
                    <SelectItem value="OTHER">Autre</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="w-1/2">
                <Label htmlFor="unit">Unité de mesure</Label>
                <Select onValueChange={(value) => handleUnitChange(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selectionnez une unité de mesure" />
                  </SelectTrigger>
                  <SelectContent>
                    {units &&
                      units.map((unit) => (
                        <SelectItem key={unit.id} value={unit.name}>
                          {unit.name}
                        </SelectItem>
                      ))}
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>

                {customUnit && (
                  <Input
                    id="new-unit"
                    {...register("unit")}
                    placeholder="Saisir une nouvelle unité"
                  />
                )}
                {errors.unit && (
                  <p className="text-sm text-red-500">{errors.unit.message}</p>
                )}
              </div>
            </div>

            <input type="hidden" value="SERVICE" {...register("type")} />
            <input
              type="hidden"
              value={"false"}
              {...register("isDerivedProduct")}
            />
            <input
              type="hidden"
              value={"false"}
              {...register("isPerishable")}
            />

            {/*<div>
              <Label htmlFor="isPerishable">Est un produit périsable ?</Label>
              <Checkbox id="isPerishable" {...register("isPerishable")} />
              {errors.isPerishable && (
                <p className="text-sm text-red-500">
                  {errors.isPerishable.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="isDerivedProduct">Est un produit dérivé ?</Label>
              <Checkbox id="isDerivedProduct" {...register("isDerivedProduct")} />
              {errors.isDerivedProduct && (
                <p className="text-sm text-red-500">
                  {errors.isDerivedProduct.message}
                </p>
              )}
            </div>*/}

            <div className="flex items-center justify-between gap-6">
              <div className="w-1/2">
                <Label htmlFor="basePrice">Prix de base</Label>
                <Input
                  id="basePrice"
                  type="number"
                  {...register("basePrice")}
                />
                {errors.basePrice && (
                  <p className="text-sm text-red-500">
                    {errors.basePrice.message}
                  </p>
                )}
              </div>

              <div className="w-1/2">
                <Label htmlFor="quantity">Quantité en stock</Label>
                <Input id="quantity" type="number" {...register("quantity")} />
                {errors.quantity && (
                  <p className="text-sm text-red-500">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-end justify-between gap-4">
              <div className="w-1/3">
                <Label htmlFor="file">Image de profil</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {previewImage && (
                  <div className="mt-2">
                    <Label>Aperçu de l&apos;image :</Label>
                    <Image
                      src={previewImage}
                      alt="Aperçu de l'image de profil"
                      className="mt-2 size-24 rounded-full border object-cover"
                      width={100}
                      height={100}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                {errors.file && (
                  <p className="text-sm text-red-500">{errors.file.message}</p>
                )}
              </div>

              <div className="w-2/3">
                <Label htmlFor="localisation">Zone de localisation</Label>
                <Select
                  onValueChange={(value) => setValue("localisation", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities &&
                      cities.map((city) => (
                        <SelectItem key={city.id} value={city.name}>
                          {city.region + " - " + city.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.localisation && (
                  <p className="text-sm text-red-500">
                    {errors.localisation.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pricings">Variantes de prix :</Label>
                <Button
                  type="button"
                  onClick={() =>
                    appendPricing({
                      parameterType: "",
                      description: "",
                      price: "",
                    })
                  }
                >
                  Ajouter une variante
                </Button>
              </div>

              {pricingFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex w-full items-end justify-between gap-2"
                >
                  <div className="w-1/4">
                    <Label>Description de la variation de prix</Label>
                    <Input
                      placeholder="Description de la variation de prix"
                      {...register(`pricings.${index}.description`)}
                    />
                  </div>
                  <div className="w-1/4">
                    <Label>Prix :</Label>
                    <Input
                      type="number"
                      placeholder="Prix"
                      {...register(`pricings.${index}.price`)}
                    />
                  </div>

                  <div className="w-1/4">
                    <Label>Paramètre de variation</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue(`pricings.${index}.parameterType`, value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selectionner un paramètre de variation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DISTANCE">Distance</SelectItem>
                        <SelectItem value="URGENCY">
                          Urgence de livraison
                        </SelectItem>
                        <SelectItem value="OTHER">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="button"
                    onClick={() => removePricing(index)}
                    variant="destructive"
                    className="w-1/4"
                  >
                    Supprimer
                  </Button>
                </div>
              ))}
              {errors.pricings && (
                <p className="text-sm text-red-500">
                  {errors.pricings.message}
                </p>
              )}
            </div>

            <Button disabled={loading} type="submit">
              Créer
            </Button>
          </form>
        </div>
      </div>
    </SidebarInset>
  );
}
