
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { Tree, getFruitIcon, getAvailableToday } from "@/data/trees";

interface TodayHighlightProps {
  onTreeSelect: (tree: Tree) => void;
}

const TodayHighlight = ({ onTreeSelect }: TodayHighlightProps) => {
  const availableToday = getAvailableToday();
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (availableToday.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-nature-orange-100 to-nature-green-100 border-nature-orange-200">
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4">🌱</div>
          <h2 className="text-2xl font-bold text-nature-green-800 mb-2">
            Nenhuma fruta disponível hoje
          </h2>
          <p className="text-nature-green-600 mb-4">
            Mas não se preocupe! Use os filtros para encontrar frutas que estarão disponíveis em breve.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-nature-green-500">
            <Calendar className="w-4 h-4" />
            <span>{currentDate}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-nature-orange-100 via-nature-orange-50 to-nature-green-100 border-nature-orange-200 shadow-lg">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 text-nature-orange-600 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">{currentDate}</span>
          </div>
          <h2 className="text-3xl font-bold text-nature-green-800 mb-2">
            🍎 Frutas Disponíveis Hoje
          </h2>
          <p className="text-nature-green-700">
            {availableToday.length} árvore{availableToday.length !== 1 ? 's' : ''} com frutos prontos para colheita!
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {availableToday.map((tree) => (
            <Card 
              key={tree.id} 
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white/80 backdrop-blur-sm border-nature-orange-200"
              onClick={() => onTreeSelect(tree)}
            >
              <CardContent className="p-4">
                <div className="text-center">
                  {/* Ícone da fruta com animação */}
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-nature-orange-200 flex items-center justify-center text-3xl shadow-md animate-pulse-soft border-2 border-nature-orange-300">
                    {getFruitIcon(tree.type)}
                  </div>
                  
                  {/* Nome e tipo */}
                  <h3 className="font-bold text-nature-green-800 mb-1 text-lg">
                    {tree.type}
                  </h3>
                  <p className="text-sm text-nature-green-600 mb-2 truncate">
                    {tree.name}
                  </p>
                  
                  {/* Localização */}
                  <div className="flex items-center justify-center space-x-1 text-xs text-nature-green-500 mb-3">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{tree.location.neighborhood}</span>
                  </div>
                  
                  {/* Badge de disponibilidade */}
                  <Badge className="bg-nature-orange-500 hover:bg-nature-orange-600 text-white text-xs">
                    Pronto para colheita!
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {availableToday.length > 0 && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-nature-green-700 border border-nature-orange-200">
              <span className="w-2 h-2 bg-nature-orange-500 rounded-full animate-pulse"></span>
              <span>Clique em uma fruta para ver detalhes e localização</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodayHighlight;
