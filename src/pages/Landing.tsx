import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PricingCard } from "@/components/pricing/PricingCard";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  Brain,
  Globe,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  Instagram,
  Youtube,
  Newspaper,
  Users,
  ArrowRight
} from "lucide-react";

const pricingPlans = [
  {
    name: "Vereador",
    price: 500,
    description: "Ideal para mandatos municipais",
    features: [
      "Monitoramento básico",
      "Alertas por e-mail",
      "1 político monitorado",
      "Relatório semanal",
      "Suporte por e-mail",
    ],
  },
  {
    name: "Prefeito",
    price: 900,
    description: "Para gestões municipais completas",
    features: [
      "Tudo do plano Vereador",
      "Dashboard completo",
      "Relatório mensal PDF",
      "Análise de sentimento IA",
      "Suporte prioritário",
      "Alertas em tempo real",
    ],
    highlighted: true,
    badge: "Mais Popular",
  },
  {
    name: "Deputado",
    price: 1500,
    description: "Cobertura federal ampliada",
    features: [
      "Tudo do plano Prefeito",
      "Até 3 políticos",
      "Relatórios premium",
      "Status de prioridade",
      "Análise de tendências",
      "API de integração",
    ],
  },
  {
    name: "Elite",
    price: 2500,
    description: "Para grandes assessorias",
    features: [
      "Monitoramento ilimitado",
      "Suporte imediato 24/7",
      "Tendências avançadas",
      "Predições de reputação",
      "Treinamento exclusivo",
      "Gerente de conta dedicado",
    ],
  },
];

const features = [
  {
    icon: Brain,
    title: "Filtragem Inteligente",
    description: "IA avançada que identifica menções corretas e remove homônimos automaticamente",
  },
  {
    icon: Zap,
    title: "Tempo Real",
    description: "Monitoramento 24/7 com alertas instantâneos para menções críticas",
  },
  {
    icon: Shield,
    title: "Análise de Risco",
    description: "Identificação automática de crises e ameaças à reputação",
  },
  {
    icon: BarChart3,
    title: "Dashboard Completo",
    description: "Visualização clara de tendências, sentimentos e métricas de reputação",
  },
];

const sources = [
  { icon: Newspaper, name: "Portais de Notícias", count: "500+" },
  { icon: Instagram, name: "Instagram", count: "Menções públicas" },
  { icon: Youtube, name: "YouTube", count: "Vídeos e comentários" },
  { icon: Globe, name: "Blogs Regionais", count: "1000+" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-headline">PolitiMonitor</h1>
                <p className="text-caption hidden sm:block">Inteligência Política</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/auth">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button
                  variant="hero"
                  className="hidden sm:flex shadow-none bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500"
                >
                  Começar Agora
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20 px-4 py-1.5">
                <Zap className="w-3.5 h-3.5 mr-1.5" />
                Monitoramento com IA Avançada
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
                Monitore sua{" "}
                <span className="text-secondary">reputação política</span>{" "}
                em tempo real
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
                Inteligência artificial para capturar, filtrar e analisar todas as menções sobre você. 
                Tome decisões estratégicas com dados precisos.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
                <Link to="/auth?mode=signup">
                  <Button
                    variant="hero"
                    size="lg"
                    className="text-lg px-8 py-6 shadow-none bg-rose-500 text-white hover:bg-rose-600"
                  >
                    Começar Gratuitamente
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Ver Demonstração
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-sm">+500 políticos monitorados</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-sm">Análise 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-sm">99.9% de precisão</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sources Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-caption uppercase tracking-wider mb-2">Fontes de Dados</p>
              <h2 className="text-title-1">Monitoramos onde você é mencionado</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sources.map((source, index) => (
                <div 
                  key={source.name} 
                  className="glass-card rounded-2xl p-6 text-center opacity-0 animate-slide-up"
                  style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: "forwards" }}
                >
                  <source.icon className="w-10 h-10 text-secondary mx-auto mb-4" />
                  <h3 className="text-subhead mb-1">{source.name}</h3>
                  <p className="text-caption">{source.count}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-caption uppercase tracking-wider mb-2">Funcionalidades</p>
              <h2 className="text-display mb-4">Tudo que você precisa para proteger sua imagem</h2>
              <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                Nossa plataforma combina inteligência artificial com análise especializada 
                para entregar insights acionáveis.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={feature.title} 
                  className="glass-card rounded-2xl p-6 opacity-0 animate-slide-up"
                  style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: "forwards" }}
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-title-3 mb-2">{feature.title}</h3>
                  <p className="text-callout text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-caption uppercase tracking-wider mb-2 text-primary-foreground/70">Como Funciona</p>
              <h2 className="text-display">Simples e Poderoso</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: "01", title: "Cadastre", desc: "Crie sua conta e cadastre os políticos que deseja monitorar" },
                { step: "02", title: "Monitore", desc: "Nossa IA coleta e filtra menções 24 horas por dia, 7 dias por semana" },
                { step: "03", title: "Analise", desc: "Receba insights, alertas e relatórios para tomar decisões estratégicas" },
              ].map((item, index) => (
                <div 
                  key={item.step} 
                  className="text-center opacity-0 animate-fade-in"
                  style={{ animationDelay: `${300 + index * 150}ms`, animationFillMode: "forwards" }}
                >
                  <div className="text-6xl font-bold text-secondary mb-4">{item.step}</div>
                  <h3 className="text-title-2 mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-caption uppercase tracking-wider mb-2">Planos</p>
              <h2 className="text-display mb-3">Escolha seu Plano</h2>
              <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                Monitore sua reputação política com inteligência artificial. 
                Todos os planos incluem coleta automática 24/7 e filtragem inteligente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={plan.name}
                  {...plan}
                  delay={200 + index * 100}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-secondary/10 to-accent/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MessageSquare className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h2 className="text-display mb-4">Pronto para proteger sua reputação?</h2>
            <p className="text-body text-muted-foreground max-w-xl mx-auto mb-8">
              Comece agora mesmo e tenha acesso a todas as menções sobre você em um só lugar.
            </p>
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Criar Conta Gratuita
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-subhead">PolitiMonitor</span>
            </div>
            <div className="flex items-center gap-6 text-caption">
              <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
              <a href="#" className="hover:text-foreground transition-colors">Contato</a>
            </div>
            <p className="text-caption">
              © 2024 PolitiMonitor. Inteligência política para o Brasil.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
