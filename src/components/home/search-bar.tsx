import { Dispatch, memo, SetStateAction } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Filter } from "@/type";

function SearchBar({
  filters,
  setFilters,
}: {
  filters: Filter;
  setFilters: Dispatch<SetStateAction<Filter>>;
}) {
  /**
   * Fonctions
   *
   * 1. Gestion des mots-clés
   * 2. Réinitialisation des filtres
   */

  const handleKeywordChange = (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      keyword: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      city: "",
      keyword: "",
    });
  };

  return (
    <div className="sticky top-16 z-10 mb-8 flex w-full items-center justify-between bg-background/80 py-4 backdrop-blur-md">
      <div className="relative mx-auto w-full max-w-2xl">
        <Input
          type="search"
          placeholder="Recherchez un produit..."
          className="w-full rounded-full border-2 border-primary py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
          value={filters.keyword}
          onChange={(e) => handleKeywordChange(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
      </div>

      <Button size="lg" className="rounded-full" onClick={resetFilters}>
        Réinitialisez les filtres
      </Button>
    </div>
  );
}

export default memo(SearchBar);
