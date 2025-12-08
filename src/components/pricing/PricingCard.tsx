import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  className?: string;
  delay?: number;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  highlighted = false,
  badge,
  className,
  delay = 0,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-3xl p-6 transition-all duration-300 opacity-0 animate-slide-up",
        highlighted
          ? "glass-card-dark text-sidebar-foreground shadow-ios-lg scale-105"
          : "glass-card",
        className
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {badge && (
        <Badge
          variant="secondary"
          className="absolute -top-3 left-1/2 -translate-x-1/2"
        >
          {badge}
        </Badge>
      )}

      <div className="mb-6">
        <h3 className={cn(
          "text-title-2 mb-2",
          highlighted && "text-sidebar-foreground"
        )}>
          {name}
        </h3>
        <p className={cn(
          "text-callout",
          highlighted ? "text-sidebar-foreground/70" : "text-muted-foreground"
        )}>
          {description}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-footnote">R$</span>
          <span className="text-display">{price.toLocaleString("pt-BR")}</span>
          <span className={cn(
            "text-footnote",
            highlighted ? "text-sidebar-foreground/60" : "text-muted-foreground"
          )}>
            /mês
          </span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={cn(
              "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
              highlighted ? "bg-secondary" : "bg-accent/20"
            )}>
              <Check className={cn(
                "w-3 h-3",
                highlighted ? "text-secondary-foreground" : "text-accent"
              )} />
            </div>
            <span className={cn(
              "text-callout",
              highlighted ? "text-sidebar-foreground/90" : "text-foreground"
            )}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        variant={highlighted ? "hero" : "glass"}
        className="w-full"
        size="lg"
      >
        Começar Agora
      </Button>
    </div>
  );
}
