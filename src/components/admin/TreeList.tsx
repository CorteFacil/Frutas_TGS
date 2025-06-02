
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, MapPin, Calendar } from 'lucide-react';

interface Tree {
  id: string;
  name: string;
  species: string;
  category_id: string;
  latitude: number;
  longitude: number;
  description: string | null;
  harvest_start_month: number | null;
  harvest_end_month: number | null;
  is_available_today: boolean;
  next_harvest_date: string | null;
  location_details: string | null;
  fruit_categories: {
    name: string;
    icon: string;
  };
}

interface TreeListProps {
  trees: Tree[];
  onEdit: (tree: Tree) => void;
  onDelete: (treeId: string) => void;
}

const TreeList = ({ trees, onEdit, onDelete }: TreeListProps) => {
  const formatHarvestPeriod = (start: number | null, end: number | null) => {
    if (!start || !end) return 'Não definido';
    
    const months = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    
    return `${months[start - 1]} - ${months[end - 1]}`;
  };

  if (trees.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🌳</div>
        <h3 className="text-lg font-semibold text-nature-green-800 mb-2">
          Nenhuma árvore cadastrada
        </h3>
        <p className="text-nature-green-600">
          Comece adicionando a primeira árvore frutífera do campus.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {trees.map((tree) => (
        <Card key={tree.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-12 h-12 bg-nature-green-100 rounded-full flex items-center justify-center text-2xl">
                  {tree.fruit_categories.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-nature-green-800">
                        {tree.name}
                      </h4>
                      <p className="text-sm text-nature-green-600">
                        {tree.species} • {tree.fruit_categories.name}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {tree.is_available_today ? (
                        <Badge className="bg-nature-orange-500 text-white">
                          Disponível hoje
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-nature-green-300 text-nature-green-700">
                          Fora de época
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm text-nature-green-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {tree.latitude.toFixed(6)}, {tree.longitude.toFixed(6)}
                        {tree.location_details && ` • ${tree.location_details}`}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Colheita: {formatHarvestPeriod(tree.harvest_start_month, tree.harvest_end_month)}
                      </span>
                    </div>
                  </div>
                  
                  {tree.description && (
                    <p className="text-sm text-nature-green-700 mt-2 line-clamp-2">
                      {tree.description}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(tree)}
                  className="border-nature-green-300 text-nature-green-700 hover:bg-nature-green-50"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(tree.id)}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TreeList;
