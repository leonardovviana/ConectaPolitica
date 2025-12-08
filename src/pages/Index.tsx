import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { SentimentRing, SentimentLegend } from "@/components/dashboard/SentimentRing";
import { MentionChart } from "@/components/dashboard/MentionChart";
import { MentionFeed } from "@/components/feed/MentionFeed";
import { RiskCard } from "@/components/dashboard/RiskCard";
import { TopSourcesCard } from "@/components/dashboard/TopSourcesCard";
import { PricingCard } from "@/components/pricing/PricingCard";
import { Mention } from "@/components/feed/MentionCard";
import { 
  TrendingUp, 
  MessageSquare, 
  Newspaper, 
  Users,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data
const chartData = [
  { date: "Seg", mentions: 45, positive: 28, negative: 12 },
  { date: "Ter", mentions: 52, positive: 35, negative: 10 },
  { date: "Qua", mentions: 78, positive: 45, negative: 20 },
  { date: "Qui", mentions: 63, positive: 40, negative: 15 },
  { date: "Sex", mentions: 89, positive: 55, negative: 22 },
  { date: "Sáb", mentions: 42, positive: 30, negative: 8 },
  { date: "Dom", mentions: 38, positive: 25, negative: 9 },
];

const mentions: Mention[] = [
  {
    id: "1",
    title: "Prefeito anuncia novo programa de habitação popular para famílias de baixa renda",
    source: "G1 Política",
    sourceType: "news",
    date: "Há 2 horas",
    sentiment: "positive",
    priority: "high",
    excerpt: "O programa deve beneficiar mais de 5 mil famílias nos próximos dois anos, com investimento de R$ 50 milhões em infraestrutura.",
    url: "#",
  },
  {
    id: "2",
    title: "Oposição critica atraso em obras de saneamento básico no município",
    source: "Folha Regional",
    sourceType: "news",
    date: "Há 4 horas",
    sentiment: "negative",
    priority: "urgent",
    excerpt: "Vereadores da oposição protocolaram requerimento pedindo explicações sobre o cronograma das obras prometidas.",
    url: "#",
  },
  {
    id: "3",
    title: "Secretário de Saúde defende gestão em entrevista exclusiva",
    source: "YouTube - TV Local",
    sourceType: "video",
    date: "Há 6 horas",
    sentiment: "neutral",
    excerpt: "Em entrevista de 45 minutos, o secretário apresentou números e defendeu as ações da pasta durante a gestão.",
    url: "#",
  },
  {
    id: "4",
    title: "Moradores elogiam nova iluminação pública no centro da cidade",
    source: "Instagram",
    sourceType: "social",
    date: "Há 8 horas",
    sentiment: "positive",
    excerpt: "Publicações nas redes sociais destacam a melhoria na segurança e valorização do comércio local.",
    url: "#",
  },
];

const topSources = [
  { name: "G1 Política", type: "news" as const, mentions: 45, percentage: 85 },
  { name: "Folha Regional", type: "news" as const, mentions: 32, percentage: 60 },
  { name: "Instagram", type: "social" as const, mentions: 28, percentage: 52 },
  { name: "YouTube", type: "video" as const, mentions: 18, percentage: 34 },
];

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
    description: "Cobertura estadual ampliada",
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
              <p className="text-caption uppercase tracking-wider mb-1">Dashboard</p>
              <h1 className="text-display">Bom dia, João</h1>
              <p className="text-body text-muted-foreground mt-1">
                Acompanhe sua reputação em tempo real
              </p>
            </div>
            <Button variant="hero" className="opacity-0 animate-fade-in self-start sm:self-auto" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
              Gerar Relatório
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Menções Hoje"
              value="127"
              subtitle="+23% vs ontem"
              icon={MessageSquare}
              trend={{ value: 23, isPositive: true }}
              variant="accent"
              delay={100}
            />
            <StatCard
              title="Notícias"
              value="45"
              subtitle="Em 12 portais"
              icon={Newspaper}
              variant="default"
              delay={200}
            />
            <StatCard
              title="Redes Sociais"
              value="82"
              subtitle="Instagram, Facebook"
              icon={Users}
              variant="trust"
              delay={300}
            />
            <StatCard
              title="Tendência"
              value="+15%"
              subtitle="Crescimento semanal"
              icon={TrendingUp}
              trend={{ value: 15, isPositive: true }}
              variant="accent"
              delay={400}
            />
          </div>
        </section>

        {/* Main Dashboard Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Chart - 2 columns */}
          <div className="lg:col-span-2">
            <MentionChart data={chartData} />
          </div>

          {/* Sentiment Ring */}
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center">
            <h3 className="text-title-3 mb-6 self-start">Sentimento Geral</h3>
            <SentimentRing
              positive={65}
              negative={20}
              neutral={15}
              size="lg"
            />
            <div className="mt-6">
              <SentimentLegend />
            </div>
          </div>
        </section>

        {/* Secondary Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Risk Card */}
          <RiskCard
            level="medium"
            score={42}
            change={-5}
          />

          {/* Top Sources */}
          <div className="lg:col-span-2">
            <TopSourcesCard sources={topSources} />
          </div>
        </section>

        {/* Feed Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-title-2">Menções Recentes</h2>
              <p className="text-caption mt-1">Atualizações em tempo real</p>
            </div>
            <Button variant="ghost">
              Ver Todas
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <MentionFeed mentions={mentions} />
        </section>

        {/* Pricing Section */}
        <section className="py-16 border-t border-border/50">
          <div className="text-center mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
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
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-subhead">PolitiMonitor</span>
            </div>
            <p className="text-caption">
              © 2024 PolitiMonitor. Inteligência política para o Brasil.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
