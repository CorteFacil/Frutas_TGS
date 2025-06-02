
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FruitCategory {
  id: string;
  name: string;
  icon: string;
  description: string | null;
}

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
}

interface TreeFormProps {
  tree?: Tree | null;
  categories: FruitCategory[];
  onSave: () => void;
  onCancel: () => void;
}

const months = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
];

const TreeForm = ({ tree, categories, onSave, onCancel }: TreeFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    category_id: '',
    latitude: '',
    longitude: '',
    description: '',
    harvest_start_month: '',
    harvest_end_month: '',
    is_available_today: false,
    next_harvest_date: '',
    location_details: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (tree) {
      setFormData({
        name: tree.name,
        species: tree.species,
        category_id: tree.category_id,
        latitude: tree.latitude.toString(),
        longitude: tree.longitude.toString(),
        description: tree.description || '',
        harvest_start_month: tree.harvest_start_month?.toString() || '',
        harvest_end_month: tree.harvest_end_month?.toString() || '',
        is_available_today: tree.is_available_today,
        next_harvest_date: tree.next_harvest_date || '',
        location_details: tree.location_details || '',
      });
    }
  }, [tree]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const treeData = {
        name: formData.name,
        species: formData.species,
        category_id: formData.category_id,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        description: formData.description || null,
        harvest_start_month: formData.harvest_start_month ? parseInt(formData.harvest_start_month) : null,
        harvest_end_month: formData.harvest_end_month ? parseInt(formData.harvest_end_month) : null,
        is_available_today: formData.is_available_today,
        next_harvest_date: formData.next_harvest_date || null,
        location_details: formData.location_details || null,
      };

      let error;
      if (tree) {
        ({ error } = await supabase
          .from('trees')
          .update(treeData)
          .eq('id', tree.id));
      } else {
        ({ error } = await supabase
          .from('trees')
          .insert([treeData]));
      }

      if (error) throw error;

      toast({
        title: tree ? "Árvore atualizada" : "Árvore cadastrada",
        description: tree ? "A árvore foi atualizada com sucesso." : "Nova árvore foi cadastrada com sucesso.",
      });

      onSave();
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a árvore. Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>
            {tree ? 'Editar Árvore' : 'Nova Árvore'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Árvore</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Mangueira do pátio"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="species">Espécie</Label>
                <Input
                  id="species"
                  value={formData.species}
                  onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                  placeholder="Ex: Mangifera indica"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select 
                value={formData.category_id} 
                onValueChange={(value) => setFormData({ ...formData, category_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  placeholder="-20.840917"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  placeholder="-41.399889"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location_details">Detalhes da Localização</Label>
              <Input
                id="location_details"
                value={formData.location_details}
                onChange={(e) => setFormData({ ...formData, location_details: e.target.value })}
                placeholder="Ex: Próximo ao prédio de Engenharia"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="harvest_start">Mês de Início da Colheita</Label>
                <Select 
                  value={formData.harvest_start_month} 
                  onValueChange={(value) => setFormData({ ...formData, harvest_start_month: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o mês" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value.toString()}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="harvest_end">Mês de Fim da Colheita</Label>
                <Select 
                  value={formData.harvest_end_month} 
                  onValueChange={(value) => setFormData({ ...formData, harvest_end_month: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o mês" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value.toString()}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="next_harvest_date">Próxima Data de Colheita</Label>
              <Input
                id="next_harvest_date"
                type="date"
                value={formData.next_harvest_date}
                onChange={(e) => setFormData({ ...formData, next_harvest_date: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_available_today"
                checked={formData.is_available_today}
                onCheckedChange={(checked) => setFormData({ ...formData, is_available_today: checked })}
              />
              <Label htmlFor="is_available_today">Disponível para colheita hoje</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva características especiais da árvore..."
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-nature-green-600 hover:bg-nature-green-700"
              >
                {loading ? "Salvando..." : tree ? "Atualizar" : "Cadastrar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreeForm;
