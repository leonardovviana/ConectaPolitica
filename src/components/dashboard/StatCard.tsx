import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "accent" | "trust" | "warning";
  className?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
  delay = 0,
}: StatCardProps) {
  const iconColors = {
    default: "text-muted-foreground",
    accent: "text-secondary",
    trust: "text-accent",
    warning: "text-institutional-yellow",
  };

  const trendColors = trend?.isPositive
    ? "text-accent bg-accent/10"
    : "text-destructive bg-destructive/10";

  return (
    <div
      className={cn(
        "stat-card opacity-0 animate-slide-up",
        className
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-2.5 rounded-xl bg-muted/50",
          iconColors[variant]
        )}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trendColors
          )}>
            {trend.isPositive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-caption uppercase tracking-wider">{title}</p>
        <p className="text-display">{value}</p>
        {subtitle && (
          <p className="text-footnote text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
