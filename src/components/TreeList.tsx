
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Tree, getFruitIcon } from "@/data/trees";

interface TreeListProps {
  trees: Tree[];
  onTreeSelect: (tree: Tree) => void;
  selectedTree: Tree | null;
}

const TreeList = ({ trees, onTreeSelect, selectedTree }: TreeListProps) => {
  const formatHarvestPeriod = (start: string, end: string) => {
    const months = {
      "01": "Jan", "02": "Fev", "03": "Mar", "04": "Abr",
      "05": "Mai", "06": "Jun", "07": "Jul", "08": "Ago",
      "09": "Set", "10": "Out", "11": "Nov", "12": "Dez"
    };
    
    const [startMonth] = start.split("-");
    const [endMonth] = end.split("-");
    
    return `${months[startMonth]} - ${months[endMonth]}`;
  };

  if (trees.length === 0) {
    return (
      <Card className="p-8 text-center bg-nature-green-50">
        <div className="text-6xl mb-4">🌳</div>
        <h3 className="text-lg font-semibold text-nature-green-800 mb-2">
          Nenhuma árvore encontrada
        </h3>
        <p className="text-nature-green-600">
          Tente ajustar os filtros para encontrar árvores frutíferas na sua região.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-nature-green-800">
          Árvores Encontradas
        </h3>
        <Badge variant="secondary" className="bg-nature-green-100 text-nature-green-800">
          {trees.length} resultado{trees.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid gap-4">
        {trees.map((tree) => (
          <Card 
            key={tree.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedTree?.id === tree.id 
                ? "ring-2 ring-nature-orange-400 shadow-lg" 
                : "hover:shadow-md"
            }`}
            onClick={() => onTreeSelect(tree)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                {/* Ícone da fruta */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md ${
                  tree.isAvailableToday 
                    ? "bg-nature-orange-100 border-2 border-nature-orange-300" 
                    : "bg-nature-green-100 border-2 border-nature-green-300"
                }`}>
                  {getFruitIcon(tree.type)}
                </div>

                {/* Informações da árvore */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-nature-green-800 truncate">
                        {tree.name}
                      </h4>
                      <p className="text-sm text-nature-green-600 mb-1">
                        {tree.species}
                      </p>
                    </div>
                    
                    {/* Status de disponibilidade */}
                    <div className="flex flex-col items-end space-y-1">
                      {tree.isAvailableToday ? (
                        <Badge className="bg-nature-orange-500 hover:bg-nature-orange-600 text-white">
                          🍎 Disponível hoje
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-nature-green-300 text-nature-green-700">
                          Fora de época
                        </Badge>
                      )}
                      <span className="text-xs text-nature-green-500">
                        Época: {formatHarvestPeriod(tree.harvestPeriod.start, tree.harvestPeriod.end)}
                      </span>
                    </div>
                  </div>

                  {/* Localização */}
                  <div className="flex items-center space-x-1 mt-2 text-sm text-nature-green-600">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{tree.location.address}</span>
                  </div>

                  {/* Descrição */}
                  <p className="text-sm text-nature-green-700 mt-2 line-clamp-2">
                    {tree.description}
                  </p>

                  {/* Próxima colheita */}
                  {!tree.isAvailableToday && tree.nextHarvest && (
                    <div className="mt-3 p-2 bg-nature-green-50 rounded-lg">
                      <p className="text-xs text-nature-green-600">
                        <span className="font-medium">Próxima colheita:</span> {tree.nextHarvest}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TreeList;
