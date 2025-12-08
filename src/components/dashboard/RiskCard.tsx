import { cn } from "@/lib/utils";
import { AlertTriangle, TrendingDown, TrendingUp, Shield } from "lucide-react";

interface RiskCardProps {
  level: "low" | "medium" | "high" | "critical";
  score: number;
  change: number;
  className?: string;
}

export function RiskCard({ level, score, change, className }: RiskCardProps) {
  const config = {
    low: {
      icon: Shield,
      label: "Baixo",
      color: "text-accent",
      bgColor: "bg-accent/10",
      ringColor: "ring-accent/30",
    },
    medium: {
      icon: AlertTriangle,
      label: "Médio",
      color: "text-institutional-yellow",
      bgColor: "bg-institutional-yellow/10",
      ringColor: "ring-institutional-yellow/30",
    },
    high: {
      icon: TrendingDown,
      label: "Alto",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      ringColor: "ring-orange-500/30",
    },
    critical: {
      icon: AlertTriangle,
      label: "Crítico",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      ringColor: "ring-destructive/30",
    },
  };

  const { icon: Icon, label, color, bgColor, ringColor } = config[level];
  const isPositive = change < 0; // Lower risk is positive

  return (
    <div className={cn(
      "glass-card rounded-2xl p-6 ring-1",
      ringColor,
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-xl", bgColor)}>
          <Icon className={cn("w-6 h-6", color)} />
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
          isPositive ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
        )}>
          {isPositive ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>

      <div>
        <p className="text-caption uppercase tracking-wider mb-1">Risco Reputacional</p>
        <div className="flex items-baseline gap-2">
          <span className={cn("text-display", color)}>{score}</span>
          <span className="text-muted-foreground text-body">/100</span>
        </div>
        <p className={cn("text-subhead mt-1", color)}>{label}</p>
      </div>

      {/* Risk Bar */}
      <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            level === "low" && "bg-accent",
            level === "medium" && "bg-institutional-yellow",
            level === "high" && "bg-orange-500",
            level === "critical" && "bg-destructive"
          )}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
