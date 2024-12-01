import { Dispatch, memo, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Filter } from "@/type";

function FilterSidebar({
  categories,
  cities,
  filters,
  setFilters,
}: {
  categories: string[];
  cities: string[];
  filters: Filter;
  setFilters: Dispatch<SetStateAction<Filter>>;
}) {
  /**
   * Fonction
   *
   * 1. Gestion de l'ajout ou suppression de catégories
   * 2. Gestion du changement de ville
   */

  const toggleCategory = (category: string) => {
    setFilters((prevFilters) => {
      const categories = prevFilters.categories.includes(category)
        ? prevFilters.categories.filter((c) => c !== category)
        : [...prevFilters.categories, category];
      return { ...prevFilters, categories };
    });
  };

  const handleCityChange = (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      city: value,
    }));
  };

  return (
    <div className="w-full overflow-auto lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:w-64">
      <div className="rounded-lg bg-card p-6 shadow-md">
        <h3 className="mb-4 text-lg font-semibold">Filtres</h3>

        {/* Category Section */}
        <div className="space-y-6">
          <div>
            <h4 className="mb-2 rounded-md bg-gray-100 p-2 text-sm font-semibold">
              Categories
            </h4>
            <div className="space-y-2">
              {categories &&
                categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={category}
                      onCheckedChange={() => toggleCategory(category)}
                      checked={filters.categories.includes(category)}
                    />
                    <label
                      htmlFor={category}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
            </div>
          </div>
          
          {/* City Section */}
          <div>
            <h4 className="mb-2 rounded-md bg-gray-100 p-2 text-sm font-semibold">
              Ville
            </h4>
            <Select onValueChange={handleCityChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir une vile" />
              </SelectTrigger>
              <SelectContent>
                {cities &&
                  cities.map((city) => (
                    <SelectItem value={city} key={city}>
                      {city}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FilterSidebar);
