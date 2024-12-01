import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("Veuillez entrer une adresse e-mail valide."),
  phones: z
    .array(z.string())
    .min(1, "Vous devez entrer au moins un numéro de téléphone."),
  chainValueFunctions: z
    .array(z.string())
    .min(1, "Vous devez sélectionner au moins une chaîne de valeur."),
  localisation: z
    .string()
    .min(3, "La localisation doit contenir au moins 3 caractères."),
  serviceType: z
    .string()
    .min(3, "Le type de service doit contenir au moins 3 caractères."),
  merchantCode: z
    .string()
    .regex(/^\d+$/, "Le code marchand doit être un nombre valide."),
  file: z.instanceof(File).optional(),
});

export type CompanyFormValues = z.infer<typeof companySchema>;
