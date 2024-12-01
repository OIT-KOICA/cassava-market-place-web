import { CompanyDTO } from "@/type";
import { create } from "zustand";

/**
 * Store Zustand pour gérer l'état des produits.
 */
const useConfigurationStore = create((set) => ({
  cities: [], // Liste de toutes les villes
  company: null, // Compagnie en cours

  /**
   * Met à jour la liste des villes dans le store.
   * @param {Array<{id: string; name: string; region: string;}>} cities - Les villes à mettre à jour.
   */
  setCities: (
    cities: Array<{
      id: string;
      name: string;
      region: string;
    }>
  ) => set(() => ({ cities })),

  /**
   * Définit la compagnie active.
   * @param {CompanyDTO} company - La compagnie à définir comme active.
   */
  setCompany: (company: CompanyDTO) => set(() => ({ company: company })),
}));

export default useConfigurationStore;
