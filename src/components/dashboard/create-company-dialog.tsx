import React, { memo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanyFormValues, companySchema } from "@/schemas/company-schema";
import { MultiSelect } from "../multi-select";
import { Minus, Plus } from "lucide-react";
import { AlertDialogFooter } from "../ui/alert-dialog";
import { useGetCities } from "@/domain/query/configuration-query";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

type CreateCompanyDialogProps = {
  isOpen: boolean;
  onSuccess: () => void;
};

const chainValueFunctionsList = [
  { value: "PRODUCTION", label: "Production" },
  { value: "COLLECTION", label: "Collecte" },
  { value: "TRANSFORMATION", label: "Transformation" },
  { value: "MARKETING", label: "Ecoulement" },
  { value: "TRANSPORT", label: "Transport" },
];

const CreateCompanyDialog: React.FC<CreateCompanyDialogProps> = ({
  isOpen,
  onSuccess,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { data: session } = useSession();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      email: "",
      phones: [""],
      chainValueFunctions: [],
      localisation: "",
      serviceType: "",
      merchantCode: "",
      file: undefined,
    },
  });

  const {
    fields: phoneFields,
    append: addPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: "phones",
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

  const onSubmit: SubmitHandler<CompanyFormValues> = async (
    data: CompanyFormValues
  ) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("localisation", data.localisation);
    formData.append("serviceType", data.serviceType);
    formData.append("merchantCode", data.merchantCode);

    if (data.file) {
      formData.append("file", data.file);
    }

    formData.append("phones", JSON.stringify(data.phones));

    formData.append(
      "chainValueFunctions",
      JSON.stringify(data.chainValueFunctions)
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH_URL}/user/create/company`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: formData,
      }
    );

    if (res.ok) {
      toast({
        variant: "default",
        title: "Message",
        description: "Votre entreprise a été créé avec succès !",
      });

      onSuccess();
    }
  };

  const { cities } = useGetCities();

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer votre Entreprise</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nom de l'entreprise */}
          <div>
            <Label htmlFor="name">Nom de l&apos;entreprise</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Téléphone */}
          <div>
            <Label htmlFor="phones">Téléphone(s)</Label>
            {phoneFields.map((field, index) => (
              <div
                key={field.id}
                className="mt-2 flex items-center justify-between space-x-2"
              >
                <Input
                  {...register(`phones.${index}`)}
                  placeholder={`Téléphone ${index + 1}`}
                  className="grow"
                />
                {phoneFields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removePhone(index)}
                  >
                    <Minus className="size-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => addPhone("")}
            >
              <Plus className="size-4 text-primary" />
            </Button>
            {errors.phones && (
              <p className="text-sm text-red-500">{errors.phones.message}</p>
            )}
          </div>

          {/* Chaînes de valeur */}
          <div>
            <Label>Chaînes de valeur</Label>
            <MultiSelect
              options={chainValueFunctionsList}
              onValueChange={(value) => setValue("chainValueFunctions", value)}
              placeholder="Selectionner une chaîne de valeur"
              variant="inverted"
              animation={2}
              maxCount={3}
            />
            {errors.chainValueFunctions && (
              <p className="text-sm text-red-500">
                {errors.chainValueFunctions.message}
              </p>
            )}
          </div>

          {/* Zone de localisation */}
          <div>
            <Label htmlFor="localisation">Zone de localisation</Label>
            <Select onValueChange={(value) => setValue("localisation", value)}>
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

          {/* Type de service */}
          <div>
            <Label htmlFor="serviceType">Type de service</Label>
            <Select onValueChange={(value) => setValue("serviceType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selectionnez un type de service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PRODUCT_VENDOR">
                  Vendeur de produit
                </SelectItem>
                <SelectItem value="SERVICE_VENDOR">
                  Vendeur de service
                </SelectItem>
                <SelectItem value="SUPPORT_COMPANY">
                  Accompagnateur d&apos;entrepreneur
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.serviceType && (
              <p className="text-sm text-red-500">
                {errors.serviceType.message}
              </p>
            )}
          </div>

          {/* Code marchand */}
          <div>
            <Label htmlFor="merchantCode">Code marchand</Label>
            <Input
              id="merchantCode"
              type="text"
              {...register("merchantCode")}
            />
            {errors.merchantCode && (
              <p className="text-sm text-red-500">
                {errors.merchantCode.message}
              </p>
            )}
          </div>

          {/* Image de profil */}
          <div>
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

          <AlertDialogFooter>
            <Button type="submit">Créer l&apos;entreprise</Button>
          </AlertDialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CreateCompanyDialog);
