import { MentionChart } from "@/components/dashboard/MentionChart";
import { RiskCard } from "@/components/dashboard/RiskCard";
import { SentimentLegend, SentimentRing } from "@/components/dashboard/SentimentRing";
import { StatCard } from "@/components/dashboard/StatCard";
import { TopSourcesCard } from "@/components/dashboard/TopSourcesCard";
import { MentionFeed } from "@/components/feed/MentionFeed";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { monitoringService } from "@/services/monitoringService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    ChevronRight,
    Database,
    MessageSquare,
    Newspaper,
    RefreshCw,
    TrendingUp,
    Users
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Mock data for chart (could be aggregated from real data in a real app)
const defaultChartData = [
  { date: "Seg", mentions: 45, positive: 28, negative: 12 },
  { date: "Ter", mentions: 52, positive: 35, negative: 10 },
  { date: "Qua", mentions: 78, positive: 45, negative: 20 },
  { date: "Qui", mentions: 63, positive: 40, negative: 15 },
  { date: "Sex", mentions: 89, positive: 55, negative: 22 },
  { date: "Sáb", mentions: 42, positive: 30, negative: 8 },
  { date: "Dom", mentions: 38, positive: 25, negative: 9 },
];

const sampleMentions = [
  {
    title: "Prefeito anuncia novo programa de habitação popular para famílias de baixa renda",
    source: "G1 Política",
    source_type: "news",
    sentiment: "positive",
    priority: "high",
    excerpt: "O programa deve beneficiar mais de 5 mil famílias nos próximos dois anos, com investimento de R$ 50 milhões em infraestrutura.",
    url: "#",
  },
  {
    title: "Oposição critica atraso em obras de saneamento básico no município",
    source: "Folha Regional",
    source_type: "news",
    sentiment: "negative",
    priority: "urgent",
    excerpt: "Vereadores da oposição protocolaram requerimento pedindo explicações sobre o cronograma das obras prometidas.",
    url: "#",
  },
  {
    title: "Secretário de Saúde defende gestão em entrevista exclusiva",
    source: "YouTube - TV Local",
    source_type: "video",
    sentiment: "neutral",
    priority: "medium",
    excerpt: "Em entrevista de 45 minutos, o secretário apresentou números e defendeu as ações da pasta durante a gestão.",
    url: "#",
  },
  {
    title: "Moradores elogiam nova iluminação pública no centro da cidade",
    source: "Instagram",
    source_type: "social",
    sentiment: "positive",
    priority: "low",
    excerpt: "Publicações nas redes sociais destacam a melhoria na segurança e valorização do comércio local.",
    url: "#",
  },
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleRefreshMentions = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      // Usa o nome do usuário como termo de busca inicial
      // Em um app real, isso viria de uma configuração de "Termos Monitorados"
      const searchTerm = user.user_metadata?.full_name || "Política Brasil";
      
      toast.info(`Buscando menções para: ${searchTerm}...`);
      
      const newMentions = await monitoringService.fetchMentions(searchTerm);
      const savedCount = await monitoringService.saveMentions(newMentions, user.id);
      
      if (savedCount > 0) {
        toast.success(`${savedCount} novas menções encontradas e salvas!`);
        queryClient.invalidateQueries({ queryKey: ["mentions"] });
      } else {
        toast.info("Nenhuma menção nova encontrada no momento.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar atualizações.");
    } finally {
      setIsUpdating(false);
    }
  };

  const { data: mentions, isLoading: isLoadingMentions } = useQuery({
    queryKey: ["mentions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mentions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      return data.map((item) => ({
        id: item.id,
        title: item.title,
        source: item.source,
        sourceType: item.source_type as "news" | "social" | "video" | "blog",
        date: new Date(item.created_at).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        sentiment: item.sentiment as "positive" | "negative" | "neutral",
        priority: item.priority as "urgent" | "high" | "medium" | "low",
        excerpt: item.excerpt || "",
        url: item.url || "#",
      }));
    },
    enabled: !!user,
  });

  const topSources = useMemo(() => {
    if (!mentions || mentions.length === 0) return [];
    const sourceCounts: Record<string, { count: number, type: string }> = {};
    mentions.forEach(m => {
      if (!sourceCounts[m.source]) {
        sourceCounts[m.source] = { count: 0, type: m.sourceType };
      }
      sourceCounts[m.source].count++;
    });

    const total = mentions.length;
    return Object.entries(sourceCounts)
      .map(([name, { count, type }]) => ({
        name,
        type: type as "news" | "social" | "video" | "blog",
        mentions: count,
        percentage: Math.round((count / total) * 100)
      }))
      .sort((a, b) => b.mentions - a.mentions)
      .slice(0, 4);
  }, [mentions]);

  const seedDataMutation = useMutation({
    mutationFn: async () => {
      if (!user) return;
      
      const mentionsToInsert = sampleMentions.map(m => ({
        ...m,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase.from("mentions").insert(mentionsToInsert);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentions"] });
      toast.success("Dados de exemplo inseridos com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao inserir dados: " + error.message);
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
              <p className="text-caption uppercase tracking-wider mb-1">Dashboard</p>
              <h1 className="text-display">Bom dia, {user?.user_metadata?.full_name?.split(" ")[0] || "Usuário"}</h1>
              <p className="text-body text-muted-foreground mt-1">
                Acompanhe sua reputação em tempo real
              </p>
            </div>
            <div className="flex gap-2 self-start sm:self-auto opacity-0 animate-fade-in" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
              <Button 
                variant="outline" 
                onClick={handleRefreshMentions} 
                disabled={isUpdating}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
                {isUpdating ? "Buscando..." : "Atualizar Menções"}
              </Button>
              
              {mentions && mentions.length === 0 && (
                <Button variant="outline" onClick={() => seedDataMutation.mutate()} disabled={seedDataMutation.isPending}>
                  <Database className="w-4 h-4 mr-2" />
                  {seedDataMutation.isPending ? "Inserindo..." : "Inserir Dados de Exemplo"}
                </Button>
              )}
              <Button variant="hero">
                Gerar Relatório
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Menções Hoje"
              value={mentions?.length.toString() || "0"}
              subtitle="+23% vs ontem"
              icon={MessageSquare}
              trend={{ value: 23, isPositive: true }}
              variant="accent"
              delay={100}
            />
            <StatCard
              title="Notícias"
              value={mentions?.filter(m => m.sourceType === 'news').length.toString() || "0"}
              subtitle="Em portais"
              icon={Newspaper}
              variant="default"
              delay={200}
            />
            <StatCard
              title="Redes Sociais"
              value={mentions?.filter(m => m.sourceType === 'social').length.toString() || "0"}
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
            <MentionChart data={defaultChartData} />
          </div>

          {/* Sentiment Ring */}
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center">
            <h3 className="text-title-3 mb-6 self-start">Sentimento Geral</h3>
            <SentimentRing
              positive={mentions?.filter(m => m.sentiment === 'positive').length || 0}
              negative={mentions?.filter(m => m.sentiment === 'negative').length || 0}
              neutral={mentions?.filter(m => m.sentiment === 'neutral').length || 0}
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
          {isLoadingMentions ? (
             <div className="text-center py-10 text-muted-foreground">Carregando menções...</div>
          ) : (
            <MentionFeed mentions={mentions || []} />
          )}
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-subhead">Conecta Política</span>
            </div>
            <p className="text-caption">
              © 2024 Conecta Política. Inteligência política para o Brasil.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
