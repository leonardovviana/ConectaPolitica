import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { BarChart3, Bell, LogOut, Menu, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [notifications] = useState(3);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 glass-card border-b border-border/50",
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-ios">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-headline">Conecta Política</h1>
              <p className="text-caption hidden sm:block">Inteligência Política</p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" className="nav-item-active">
              Dashboard
            </Button>
            <Button variant="ghost">
              Menções
            </Button>
            <Button variant="ghost">
              Relatórios
            </Button>
            <Button variant="ghost">
              Configurações
            </Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>

            {/* Profile */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="w-5 h-5" />
            </Button>

            {/* Logout */}
            <Button variant="ghost" size="icon" onClick={handleSignOut} className="hidden sm:flex">
              <LogOut className="w-5 h-5" />
            </Button>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
