
import { MapPin, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/auth";
  };

  return (
    <header className="bg-gradient-to-r from-nature-green-600 to-nature-green-700 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-nature-orange-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-2xl">🌳</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Colheita Inteligente</h1>
            <p className="text-nature-green-100 text-sm">Frutas do campus ao seu alcance</p>
          </div>
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-nature-green-100">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Cachoeiro de Itapemirim, ES</span>
          </div>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <User className="w-4 h-4 mr-2" />
                  {profile?.full_name || user.email}
                  {profile?.is_admin && (
                    <Badge className="ml-2 bg-nature-orange-500 text-white text-xs">
                      Admin
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{profile?.full_name || "Usuário"}</span>
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuItem>
                {profile?.is_admin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Painel Admin
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" className="text-white hover:bg-white/20">
              <Link to="/auth">
                <User className="w-4 h-4 mr-2" />
                Entrar
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
