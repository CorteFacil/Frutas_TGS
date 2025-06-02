import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface FilterSectionProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  fruitType: string;
  availableToday: boolean;
}

const FilterSection = ({ onFilterChange }: FilterSectionProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    fruitType: "",
    availableToday: false
  });

  const fruitTypes = ["Manga", "Laranja", "Abacate", "Jabuticaba", "Goiaba", "Limão"];

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleFruitTypeChange = (value: string) => {
    handleFilterChange({ fruitType: value === "all" ? "" : value });
  };

  return (
    <Card className="p-4 bg-white shadow-sm border-nature-green-200">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-nature-green-800 mb-3">Filtrar Árvore</h3>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow space-y-2">
            <label className="text-sm font-medium text-nature-green-700">Tipo de Fruta</label>
            <Select value={filters.fruitType || "all"} onValueChange={handleFruitTypeChange}>
              <SelectTrigger className="border-nature-green-300">
                <SelectValue placeholder="Todas as frutas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as frutas</SelectItem>
                {fruitTypes.map((fruit) => (
                  <SelectItem key={fruit} value={fruit}>
                    {fruit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:self-end">
            <Button
              variant={filters.availableToday ? "default" : "outline"}
              onClick={() => handleFilterChange({ availableToday: !filters.availableToday })}
              className={`w-full md:w-auto ${
                filters.availableToday 
                  ? "bg-nature-orange-500 hover:bg-nature-orange-600 text-white" 
                  : "border-nature-orange-300 text-nature-orange-600 hover:bg-nature-orange-50"
              }`}
            >
              {filters.availableToday ? "🍎 Disponíveis Hoje" : "Disponíveis Hoje"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FilterSection;
