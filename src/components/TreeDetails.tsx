
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Info, Share2 } from "lucide-react";
import { Tree, getFruitIcon } from "@/data/trees";

interface TreeDetailsProps {
  tree: Tree | null;
  onClose: () => void;
}

const TreeDetails = ({ tree, onClose }: TreeDetailsProps) => {
  if (!tree) return null;

  const formatHarvestPeriod = (start: string, end: string) => {
    const months = {
      "01": "Janeiro", "02": "Fevereiro", "03": "Março", "04": "Abril",
      "05": "Maio", "06": "Junho", "07": "Julho", "08": "Agosto",
      "09": "Setembro", "10": "Outubro", "11": "Novembro", "12": "Dezembro"
    };
    
    const [startMonth, startDay] = start.split("-");
    const [endMonth, endDay] = end.split("-");
    
    return `${startDay} de ${months[startMonth]} - ${endDay} de ${months[endMonth]}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tree.name} - Colheita Inteligente`,
        text: `Encontrei esta ${tree.type.toLowerCase()} no app Colheita Inteligente! ${tree.description}`,
        url: window.location.href
      });
    } else {
      // Fallback para cópia
      navigator.clipboard.writeText(`${tree.name} - ${tree.location.address}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="bg-gradient-to-r from-nature-green-500 to-nature-green-600 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg ${
                tree.isAvailableToday 
                  ? "bg-nature-orange-400 border-3 border-nature-orange-600" 
                  : "bg-nature-green-300 border-3 border-nature-green-500"
              }`}>
                {getFruitIcon(tree.type)}
              </div>
              <div>
                <CardTitle className="text-2xl">{tree.name}</CardTitle>
                <p className="text-nature-green-100">{tree.species}</p>
                <Badge 
                  className={`mt-2 ${
                    tree.isAvailableToday 
                      ? "bg-nature-orange-500 hover:bg-nature-orange-600" 
                      : "bg-white/20 text-white"
                  }`}
                >
                  {tree.isAvailableToday ? "🍎 Disponível para colheita" : "Fora de época"}
                </Badge>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Localização */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-nature-green-800">
              <MapPin className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Localização</h3>
            </div>
            <div className="bg-nature-green-50 p-4 rounded-lg">
              <p className="font-medium text-nature-green-800">{tree.location.address}</p>
              <p className="text-sm text-nature-green-600">Bairro: {tree.location.neighborhood}</p>
              <p className="text-xs text-nature-green-500 mt-1">
                Coordenadas: {tree.location.lat.toFixed(6)}, {tree.location.lng.toFixed(6)}
              </p>
            </div>
          </div>

          {/* Período de colheita */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-nature-green-800">
              <Calendar className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Período de Colheita</h3>
            </div>
            <div className="bg-nature-orange-50 p-4 rounded-lg">
              <p className="font-medium text-nature-orange-800">
                {formatHarvestPeriod(tree.harvestPeriod.start, tree.harvestPeriod.end)}
              </p>
              {tree.nextHarvest && !tree.isAvailableToday && (
                <p className="text-sm text-nature-orange-600 mt-1">
                  Próxima colheita prevista: {tree.nextHarvest}
                </p>
              )}
              {tree.isAvailableToday && (
                <div className="mt-2 p-3 bg-nature-orange-100 rounded-lg border border-nature-orange-200">
                  <p className="text-sm font-medium text-nature-orange-800">
                    🎉 Esta árvore está com frutos prontos para colheita hoje!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-nature-green-800">
              <Info className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Sobre esta árvore</h3>
            </div>
            <div className="bg-nature-brown-50 p-4 rounded-lg">
              <p className="text-nature-brown-800 leading-relaxed">{tree.description}</p>
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-nature-green-200">
            <Button 
              onClick={handleShare}
              className="flex-1 bg-nature-green-600 hover:bg-nature-green-700 text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-nature-green-300 text-nature-green-700 hover:bg-nature-green-50"
              onClick={() => {
                // Abrir no Google Maps
                const url = `https://www.google.com/maps?q=${tree.location.lat},${tree.location.lng}`;
                window.open(url, '_blank');
              }}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Abrir no Mapa
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreeDetails;
