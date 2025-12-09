import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Loader2, Lock, Mail, TrendingUp, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get("mode") === "signup");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/onboarding");
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      if (isSignUp) {
        const result = signUpSchema.safeParse(formData);
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setLoading(false);
          return;
        }

        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("Este e-mail já está cadastrado. Tente fazer login.");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Conta criada com sucesso! Verifique seu e-mail para confirmar.");
        }
      } else {
        const result = signInSchema.safeParse({ email: formData.email, password: formData.password });
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setLoading(false);
          return;
        }

        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("E-mail ou senha incorretos.");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Login realizado com sucesso!");
          navigate("/onboarding");
        }
      }
    } catch (err) {
      toast.error("Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent" />
        <div className="relative z-10 p-12 flex flex-col justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Conecta Política</h1>
              <p className="text-sm text-white/70">Inteligência Política</p>
            </div>
          </Link>

          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Proteja sua reputação política com IA
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Monitore menções, analise sentimentos e tome decisões estratégicas 
              baseadas em dados precisos.
            </p>
            <div className="space-y-4">
              {["Monitoramento 24/7", "Filtragem inteligente", "Alertas em tempo real"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-white/90">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/50 text-sm">
            © 2024 Conecta Política. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-headline">Conecta Política</h1>
          </Link>

          <div className="mb-8">
            <h2 className="text-display mb-2">
              {isSignUp ? "Criar Conta" : "Bem-vindo de volta"}
            </h2>
            <p className="text-body text-muted-foreground">
              {isSignUp
                ? "Preencha os dados para criar sua conta"
                : "Entre com seu e-mail e senha para continuar"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Seu nome completo"
                    className="pl-10 h-12"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10 h-12"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-12"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full h-12"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isSignUp ? "Criar Conta" : "Entrar"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-callout text-muted-foreground">
              {isSignUp ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-secondary font-medium hover:underline"
              >
                {isSignUp ? "Fazer login" : "Criar conta"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
