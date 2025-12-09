import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Brain, 
  Shield, 
  BarChart3, 
  Zap,
  ChevronRight,
  ChevronLeft,
  Newspaper,
  Instagram,
  Youtube,
  Globe,
  Bell,
  FileText
} from "lucide-react";

interface OnboardingStep {
  icon: React.ElementType;
  title: string;
  description: string;
  features?: { icon: React.ElementType; text: string }[];
}

const steps: OnboardingStep[] = [
  {
    icon: TrendingUp,
    title: "Bem-vindo ao Conecta Política",
    description: "Sua plataforma de inteligência política para monitoramento de reputação em tempo real.",
    features: [
      { icon: Brain, text: "Inteligência Artificial avançada" },
      { icon: Shield, text: "Proteção de reputação 24/7" },
      { icon: BarChart3, text: "Análises e relatórios detalhados" },
    ],
  },
  {
    icon: Globe,
    title: "Coleta de Dados",
    description: "Monitoramos diversas fontes para capturar todas as menções sobre você.",
    features: [
      { icon: Newspaper, text: "Portais de notícias e blogs regionais" },
      { icon: Instagram, text: "Instagram e Facebook públicos" },
      { icon: Youtube, text: "YouTube - vídeos e comentários" },
      { icon: Globe, text: "Google News e RSS feeds" },
    ],
  },
  {
    icon: Brain,
    title: "Filtragem Inteligente",
    description: "Nossa IA processa cada menção para garantir precisão e relevância.",
    features: [
      { icon: Shield, text: "Confirma se a menção é sobre você" },
      { icon: Zap, text: "Remove homônimos automaticamente" },
      { icon: TrendingUp, text: "Classifica sentimento: positivo, negativo ou neutro" },
      { icon: Bell, text: "Identifica menções urgentes e críticas" },
    ],
  },
  {
    icon: BarChart3,
    title: "Dashboard & Relatórios",
    description: "Visualize sua reputação com gráficos claros e receba relatórios detalhados.",
    features: [
      { icon: BarChart3, text: "Dashboard interativo em tempo real" },
      { icon: Bell, text: "Alertas instantâneos por e-mail" },
      { icon: FileText, text: "Relatórios PDF mensais" },
      { icon: TrendingUp, text: "Análise de tendências e predições" },
    ],
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skip = () => {
    navigate("/dashboard");
  };

  const step = steps[currentStep];
  const StepIcon = step.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-headline hidden sm:block">Conecta Política</h1>
        </div>
        <Button variant="ghost" onClick={skip}>
          Pular
        </Button>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? "w-8 bg-secondary" 
                    : index < currentStep 
                    ? "w-4 bg-secondary/50" 
                    : "w-4 bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Step Content */}
          <div className="text-center mb-12 opacity-0 animate-fade-in" key={currentStep} style={{ animationFillMode: "forwards" }}>
            <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-8">
              <StepIcon className="w-10 h-10 text-secondary" />
            </div>
            
            <h2 className="text-display mb-4">{step.title}</h2>
            <p className="text-body text-muted-foreground max-w-md mx-auto mb-10">
              {step.description}
            </p>

            {/* Features */}
            {step.features && (
              <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                {step.features.map((feature, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-xl p-4 flex items-center gap-3 opacity-0 animate-slide-up"
                    style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: "forwards" }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-subhead text-left">{feature.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <Button 
              variant="ghost" 
              onClick={prevStep}
              disabled={currentStep === 0}
              className="opacity-0 data-[visible=true]:opacity-100 transition-opacity"
              data-visible={currentStep > 0}
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>
            
            <Button variant="hero" onClick={nextStep} className="min-w-[160px]">
              {currentStep === steps.length - 1 ? "Começar" : "Próximo"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
