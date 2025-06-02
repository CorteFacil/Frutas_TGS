
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Tree, getFruitIcon } from "@/data/trees";

interface InteractiveMapProps {
  trees: Tree[];
  selectedTree: Tree | null;
  onTreeSelect: (tree: Tree) => void;
}

const InteractiveMap = ({ trees, selectedTree, onTreeSelect }: InteractiveMapProps) => {
  const [mapBounds, setMapBounds] = useState({
    minLat: -23.5600,
    maxLat: -23.5400,
    minLng: -46.6500,
    maxLng: -46.6200
  });

  // Converter coordenadas geográficas para posição no SVG
  const coordToPosition = (lat: number, lng: number) => {
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-nature-green-50 to-nature-brown-50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-nature-green-800">Mapa das Árvores</h3>
          <Badge variant="secondary" className="bg-nature-green-100 text-nature-green-800">
            {trees.length} árvore{trees.length !== 1 ? 's' : ''} encontrada{trees.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        <div className="relative w-full h-96 bg-gradient-to-b from-sky-200 to-nature-green-200 rounded-lg overflow-hidden shadow-inner">
          {/* Fundo do mapa estilizado */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="grass" patternUnits="userSpaceOnUse" width="20" height="20">
                <rect width="20" height="20" fill="#86efac"/>
                <circle cx="5" cy="5" r="1" fill="#22c55e" opacity="0.3"/>
                <circle cx="15" cy="15" r="1" fill="#22c55e" opacity="0.3"/>
              </pattern>
            </defs>
            
            {/* Fundo com textura de grama */}
            <rect width="100%" height="100%" fill="url(#grass)"/>
            
            {/* Ruas simplificadas */}
            <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="#8b5cf6" strokeWidth="2" opacity="0.6"/>
            <line x1="0%" y1="70%" x2="100%" y2="70%" stroke="#8b5cf6" strokeWidth="2" opacity="0.6"/>
            <line x1="25%" y1="0%" x2="25%" y2="100%" stroke="#8b5cf6" strokeWidth="2" opacity="0.6"/>
            <line x1="75%" y1="0%" x2="75%" y2="100%" stroke="#8b5cf6" strokeWidth="2" opacity="0.6"/>
            
            {/* Parques */}
            <ellipse cx="20%" cy="50%" rx="15%" ry="20%" fill="#4ade80" opacity="0.7"/>
            <ellipse cx="80%" cy="30%" rx="12%" ry="15%" fill="#4ade80" opacity="0.7"/>
          </svg>

          {/* Árvores no mapa */}
          {trees.map((tree) => {
            const position = coordToPosition(tree.location.lat, tree.location.lng);
            const isSelected = selectedTree?.id === tree.id;
            
            return (
              <div
                key={tree.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                  isSelected ? "scale-125 z-20" : "scale-100 z-10 hover:scale-110"
                }`}
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`
                }}
                onClick={() => onTreeSelect(tree)}
              >
                <div className={`relative ${isSelected ? "animate-pulse-soft" : ""}`}>
                  {/* Sombra da árvore */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black/20 rounded-full"></div>
                  
                  {/* Ícone da árvore */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-lg ${
                    tree.isAvailableToday 
                      ? "bg-nature-orange-400 border-2 border-nature-orange-600" 
                      : "bg-nature-green-400 border-2 border-nature-green-600"
                  }`}>
                    {getFruitIcon(tree.type)}
                  </div>
                  
                  {/* Indicador de disponibilidade */}
                  {tree.isAvailableToday && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                  )}
                  
                  {/* Tooltip com nome */}
                  <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap transition-opacity ${
                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}>
                    {tree.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Legenda */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <h4 className="text-sm font-semibold text-nature-green-800 mb-2">Legenda</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-nature-orange-400 rounded-full border border-nature-orange-600"></div>
                <span>Disponível hoje</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-nature-green-400 rounded-full border border-nature-green-600"></div>
                <span>Fora de época</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InteractiveMap;
