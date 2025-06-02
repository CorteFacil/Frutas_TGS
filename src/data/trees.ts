export interface Tree {
  id: string;
  name: string;
  species: string;
  type: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    neighborhood: string;
  };
  harvestPeriod: {
    start: string; // MM-DD format
    end: string;   // MM-DD format
  };
  description: string;
  imageUrl?: string;
  isAvailableToday: boolean;
  nextHarvest?: string;
}

export const mockTrees: Tree[] = [
  {
    id: "1",
    name: "Mangueira do Parque",
    species: "Mangifera indica",
    type: "Manga",
    location: {
      lat: -23.5505,
      lng: -46.6333,
      address: "Parque Ibirapuera, São Paulo",
      neighborhood: "Vila Mariana"
    },
    harvestPeriod: {
      start: "12-01",
      end: "03-31"
    },
    description: "Mangueira centenária com frutos doces e suculentos. Variedade palmer.",
    isAvailableToday: true,
    nextHarvest: "2024-01-15"
  },
  {
    id: "2", 
    name: "Laranjeira da Praça",
    species: "Citrus sinensis",
    type: "Laranja",
    location: {
      lat: -23.5489,
      lng: -46.6388,
      address: "Praça da República, São Paulo",
      neighborhood: "República"
    },
    harvestPeriod: {
      start: "05-01",
      end: "08-31"
    },
    description: "Laranjeira bem cuidada com frutos cítricos refrescantes.",
    isAvailableToday: false,
    nextHarvest: "2024-05-10"
  },
  {
    id: "3",
    name: "Abacateiro da Escola",
    species: "Persea americana",
    type: "Abacate",
    location: {
      lat: -23.5475,
      lng: -46.6361,
      address: "EMEF Prof. João Silva, São Paulo",
      neighborhood: "Liberdade"
    },
    harvestPeriod: {
      start: "01-01",
      end: "05-31"
    },
    description: "Abacateiro jovem com frutos cremosos ideais para vitaminas.",
    isAvailableToday: true,
    nextHarvest: "2024-02-01"
  },
  {
    id: "4",
    name: "Jabuticabeira Antiga",
    species: "Plinia cauliflora",
    type: "Jabuticaba",
    location: {
      lat: -23.5567,
      lng: -46.6428,
      address: "Rua Augusta, 1500, São Paulo",
      neighborhood: "Consolação"
    },
    harvestPeriod: {
      start: "08-01",
      end: "10-31"
    },
    description: "Jabuticabeira rara com frutos que crescem direto no tronco.",
    isAvailableToday: false,
    nextHarvest: "2024-08-15"
  },
  {
    id: "5",
    name: "Goiabeira do Quintal",
    species: "Psidium guajava", 
    type: "Goiaba",
    location: {
      lat: -23.5439,
      lng: -46.6419,
      address: "Rua da Consolação, 800, São Paulo",
      neighborhood: "Consolação"
    },
    harvestPeriod: {
      start: "11-01",
      end: "02-28"
    },
    description: "Goiabeira com frutos aromáticos ricos em vitamina C.",
    isAvailableToday: true,
    nextHarvest: "2024-01-20"
  },
  {
    id: "6",
    name: "Limoeiro da Horta",
    species: "Citrus limon",
    type: "Limão",
    location: {
      lat: -23.5523,
      lng: -46.6311,
      address: "Horta Comunitária Vila Madalena",
      neighborhood: "Vila Madalena"
    },
    harvestPeriod: {
      start: "04-01",
      end: "07-31"
    },
    description: "Limoeiro orgânico com frutos ácidos perfeitos para temperos.",
    isAvailableToday: false,
    nextHarvest: "2024-04-05"
  }
];

export const getFruitIcon = (type: string): string => {
  const icons: Record<string, string> = {
    "Manga": "🥭",
    "Laranja": "🍊",
    "Abacate": "🥑",
    "Jabuticaba": "🍇",
    "Goiaba": "🍈",
    "Limão": "🍋"
  };
  return icons[type] || "🍎";
};

export const getAvailableToday = () => {
  return mockTrees.filter(tree => tree.isAvailableToday);
};

export const getTreesByType = (type: string) => {
  return mockTrees.filter(tree => 
    tree.type.toLowerCase().includes(type.toLowerCase())
  );
};
