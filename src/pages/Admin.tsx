
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, MapPin, Settings } from 'lucide-react';
import TreeForm from '@/components/admin/TreeForm';
import TreeList from '@/components/admin/TreeList';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

interface FruitCategory {
  id: string;
  name: string;
  icon: string;
  description: string | null;
}

const Admin = () => {
  const { profile, loading: authLoading } = useAuth();
  const [trees, setTrees] = useState<Tree[]>([]);
  const [categories, setCategories] = useState<FruitCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTreeForm, setShowTreeForm] = useState(false);
  const [editingTree, setEditingTree] = useState<Tree | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (profile?.is_admin) {
      fetchTrees();
      fetchCategories();
    }
  }, [profile]);

  const fetchTrees = async () => {
    try {
      const { data, error } = await supabase
        .from('trees')
        .select(`
          *,
          fruit_categories (
            name,
            icon
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTrees(data || []);
    } catch (error) {
      toast({
        title: "Erro ao carregar árvores",
        description: "Não foi possível carregar a lista de árvores.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('fruit_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      toast({
        title: "Erro ao carregar categorias",
        description: "Não foi possível carregar as categorias de frutas.",
        variant: "destructive",
      });
    }
  };

  const handleTreeSaved = () => {
    setShowTreeForm(false);
    setEditingTree(null);
    fetchTrees();
  };

  const handleEditTree = (tree: Tree) => {
    setEditingTree(tree);
    setShowTreeForm(true);
  };

  const handleDeleteTree = async (treeId: string) => {
    try {
      const { error } = await supabase
        .from('trees')
        .delete()
        .eq('id', treeId);

      if (error) throw error;

      toast({
        title: "Árvore removida",
        description: "A árvore foi removida com sucesso.",
      });
      
      fetchTrees();
    } catch (error) {
      toast({
        title: "Erro ao remover árvore",
        description: "Não foi possível remover a árvore.",
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-nature-green-300 border-t-nature-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-nature-green-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return <Navigate to="/auth" replace />;
  }

  if (!profile.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nature-green-100 to-nature-orange-100">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-nature-green-800 mb-2">
              Acesso Negado
            </h2>
            <p className="text-nature-green-600 mb-4">
              Você não tem permissão para acessar o painel administrativo.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-nature-green-600 hover:bg-nature-green-700"
            >
              Voltar ao Início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-green-50 to-nature-orange-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-nature-green-800 mb-2">
                Painel Administrativo
              </h1>
              <p className="text-nature-green-600">
                Gerencie as árvores frutíferas do campus
              </p>
            </div>
            <Badge className="bg-nature-orange-500 text-white">
              <Settings className="w-4 h-4 mr-1" />
              Administrador
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="trees" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="trees">Árvores</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="trees">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Árvores Cadastradas ({trees.length})
                    </CardTitle>
                    <Button 
                      onClick={() => setShowTreeForm(true)}
                      className="bg-nature-green-600 hover:bg-nature-green-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Árvore
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="w-8 h-8 border-4 border-nature-green-300 border-t-nature-green-600 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-nature-green-600">Carregando árvores...</p>
                    </div>
                  ) : (
                    <TreeList 
                      trees={trees}
                      onEdit={handleEditTree}
                      onDelete={handleDeleteTree}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-nature-green-800 mb-2">
                      {trees.length}
                    </div>
                    <p className="text-nature-green-600">Total de Árvores</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-nature-orange-600 mb-2">
                      {trees.filter(t => t.is_available_today).length}
                    </div>
                    <p className="text-nature-green-600">Disponíveis Hoje</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-nature-brown-600 mb-2">
                      {categories.length}
                    </div>
                    <p className="text-nature-green-600">Categorias</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {showTreeForm && (
          <TreeForm
            tree={editingTree}
            categories={categories}
            onSave={handleTreeSaved}
            onCancel={() => {
              setShowTreeForm(false);
              setEditingTree(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
