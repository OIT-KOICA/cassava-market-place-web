import { Dispatch, memo, SetStateAction } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Filter } from "@/type";

function Hero({
  filters,
  setFilters,
}: {
  filters: Filter;
  setFilters: Dispatch<SetStateAction<Filter>>;
}) {
  /**
   * Fonction
   *
   * 1. Gestion des mots-clés
   */
  const handleKeywordChange = (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      keyword: value,
    }));
  };

  return (
    <section className="relative flex h-[80vh] items-center justify-center overflow-hidden">
      <Image
        src="/images/cassava-bg.jpg"
        alt="Cassava Market Place"
        fill
        style={{ objectFit: "cover" }}
        priority
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
          Fresh from the Farm to Your Table
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl md:text-2xl">
          Discover local produce and support farmers in your area. Taste the
          difference of farm-fresh goodness.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="relative w-full max-w-md">
            <Input
              type="search"
              placeholder="Recherchez des produits pour une récente production..."
              className="w-full rounded-full bg-white/90 py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              value={filters.keyword}
              onChange={(e) => handleKeywordChange(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <Button size="lg" className="rounded-full">
            Recherchez un produit
          </Button>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
