import { persist } from "zustand/middleware";
import { create } from "zustand";
import { Discussion, ProductDTO } from "@/type";

const useProductStore = create(
  persist(
    (set) => ({
      products: [],
      discussions: [],
      activeProduct: null,
      activeDiscussion: null,

      setProducts: (products: Array<ProductDTO>) => {
        console.log("Mise à jour des produits :", products); // Log pour vérifier
        set(() => ({ products }));
      },
      setActiveProduct: (product: ProductDTO) => {
        console.log("Produit actif mis à jour :", product); // Log pour vérifier
        set(() => ({ activeProduct: product }));
      },
      setDiscussions: (discussions: Array<Discussion>) => {
        console.log("Mise à jour des discussions :", discussions); // Log pour vérifier
        set(() => ({ discussions }));
      },
      setActiveDiscussion: (discussion: Discussion) => {
        console.log("Discussion active mise à jour :", discussion); // Log pour vérifier
        set(() => ({ activeDiscussion: discussion }));
      },
    }),
    {
      name: "product-store", // Nom dans le localStorage
    }
  )
);

export default useProductStore;
