import { ProductDTO } from "@/type";

/**
 * Récupère tous les produits.
 * @returns {Promise<ProductDTO[]>} Les produits.
 */
export const getProducts = async (): Promise<ProductDTO[]> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/guest/products`
  );

  if (res) {
    return await res.json();
  }

  throw new Error("Erreur lors du chargement des produits");
};

/**
 * Récupère un produit par son slug.
 * @param {string} slug - Le slug du produit.
 * @returns {Promise<ProductDTO> } Le produit correspondant.
 */
export const getProduct = async (slug: string): Promise<ProductDTO> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/guest/product/${slug}`
  );

  if (res) {
    return await res.json();
  }

  throw new Error("Erreur lors de la récupération du produit");
};

/**
 * Récupère une liste de produits par le nom d'utlisateur.
 * @param {string} token - Le token d'authentification.
 * @returns {Promise<ProductDTO[]> } Le produit correspondant.
 */
export const getProductByUserId = async (
  token: string
): Promise<ProductDTO[]> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/product/products`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res) {
    return await res.json();
  }

  throw new Error("Erreur lors de la récupération des produits");
};

/**
 * Crée un nouveau produit.
 * @param {object} productData - Les données du produit à créer.
 * @param {string} token - Le token d'authentification.
 * @returns {Promise<ProductDTO>} Le produit créé.
 */
export const createProduct = async (
  productData: FormData,
  token: string
): Promise<ProductDTO> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/product/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: productData,
    }
  );

  if (res) {
    return res.json();
  }

  throw new Error("Echec lors de la création du produit");
};

/**
 * Met à jour un produit existant.
 * @param {string} productId - L'ID du produit à mettre à jour.
 * @param {object} productData - Les nouvelles données du produit.
 * @param {string} token - Le token d'authentification.
 * @returns {Promise<ProductDTO>} Le produit mis à jour.
 */
export const updateProduct = async (
  slug: string,
  productData: FormData,
  token: string
): Promise<ProductDTO> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/product/edit/${slug}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: productData,
    }
  );

  if (res) {
    return await res.json();
  }

  throw new Error("Echec lors de la modification du produit");
};

/**
 * Supprime un produit par son slug.
 * @param {string} slug - Le slug du produit à supprimer.
 * @param {string} token - Le token d'authentification.
 * @returns {Promise<string>} Le message de confirmation du produit supprimé.
 */
export const deleteProduct = async (
  slug: string,
  token: string
): Promise<string> => {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH_URL}/product/delete/${slug}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res) {
    return await res.json();
  }

  throw new Error("Echec lors de la suppression du produit");
};
