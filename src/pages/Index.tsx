import { useState, useMemo } from "react";
import Header from "@/components/Header";
import TodayHighlight from "@/components/TodayHighlight";
import FilterSection, { FilterOptions } from "@/components/FilterSection";
import InteractiveMap from "@/components/InteractiveMap";
import TreeList from "@/components/TreeList";
import TreeDetails from "@/components/TreeDetails";
import { mockTrees, Tree } from "@/data/trees";

const Index = () => {
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    fruitType: "",
    availableToday: false
  });

  // Filtrar árvores baseado nos filtros aplicados
  const filteredTrees = useMemo(() => {
    return mockTrees.filter((tree) => {
      if (filters.fruitType && !tree.type.toLowerCase().includes(filters.fruitType.toLowerCase())) {
        return false;
      }
      if (filters.availableToday && !tree.isAvailableToday) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const handleTreeSelect = (tree: Tree) => {
    setSelectedTree(tree);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedTree(null);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-green-50 via-white to-nature-brown-50">
      <Header />
      
      <main className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Destaque do dia */}
        <TodayHighlight onTreeSelect={handleTreeSelect} />
        
        {/* Filtros */}
        <FilterSection onFilterChange={handleFilterChange} />
        
        {/* Layout principal: Mapa e Lista */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mapa Interativo */}
          <div className="order-2 lg:order-1">
            <InteractiveMap 
              trees={filteredTrees}
              selectedTree={selectedTree}
              onTreeSelect={handleTreeSelect}
            />
          </div>
          
          {/* Lista de Árvores */}
          <div className="order-1 lg:order-2">
            <TreeList 
              trees={filteredTrees}
              onTreeSelect={handleTreeSelect}
              selectedTree={selectedTree}
            />
          </div>
        </div>
        
        {/* Footer com informações */}
        <div className="text-center py-8 text-nature-green-600">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl font-semibold text-nature-green-800">
              🌱 Agricultura Urbana Sustentável
            </h3>
            <p className="text-sm leading-relaxed">
              O Colheita Inteligente promove o aproveitamento sustentável de frutas urbanas, 
              conectando a comunidade com a natureza da cidade. Juntos, criamos uma Campus
              mais verde e sustentável.
            </p>
          </div>
        </div>
      </main>
      
      {/* Modal de detalhes */}
      {showDetails && (
        <TreeDetails 
          tree={selectedTree} 
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default Index;
