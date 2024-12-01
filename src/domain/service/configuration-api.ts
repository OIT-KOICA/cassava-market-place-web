import { CompanyDTO } from "@/type";

export const getCities = async (): Promise<
  Array<{
    id: string;
    name: string;
    region: string;
  }>
> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/guest/cities`,
    {
      method: "GET",
    }
  );
  if (!res.ok) throw new Error("Erreur lors de la récupération des villes");

  return res.json();
};

export const getUnits = async (): Promise<
  Array<{
    id: string;
    name: string;
  }>
> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/guest/units`,
    {
      method: "GET",
    }
  );
  if (!res.ok)
    throw new Error("Erreur lors de la récupération des unités de mesure");

  return res.json();
};

export const getCompany = async (token: string): Promise<CompanyDTO> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/user/company`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok)
    throw new Error("Erreur lors de la récupération de la compagnie");

  return res.json();
};

export const getAdds = async (): Promise<
  Array<{
    id: string;
    name: string;
    phone: string;
    title: string;
    description: string;
    createdAt: string;
  }>
> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/guest/adds`,
    {
      method: "GET",
    }
  );
  if (!res.ok) throw new Error("Erreur lors de la récupération des annonces");

  return res.json();
};

export const createAdd = async (formData: {
  name: string;
  phone: string;
  title: string;
  description: string;
}): Promise<{
  id: string;
  name: string;
  phone: string;
  title: string;
  description: string;
  createdAt: string;
}> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/guest/add/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(formData),
    }
  );
  if (!res.ok) throw new Error("Erreur lors de la création de l'annonce");

  return res.json();
};
