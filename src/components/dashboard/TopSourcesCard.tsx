import { cn } from "@/lib/utils";
import { Newspaper, Globe, Video, MessageCircle } from "lucide-react";

interface Source {
  name: string;
  type: "news" | "website" | "video" | "social";
  mentions: number;
  percentage: number;
}

interface TopSourcesCardProps {
  sources: Source[];
  className?: string;
}

export function TopSourcesCard({ sources, className }: TopSourcesCardProps) {
  const icons = {
    news: Newspaper,
    website: Globe,
    video: Video,
    social: MessageCircle,
  };

  return (
    <div className={cn("glass-card rounded-2xl p-6", className)}>
      <h3 className="text-title-3 mb-4">Fontes que Mais Citaram</h3>
      
      <div className="space-y-4">
        {sources.map((source, index) => {
          const Icon = icons[source.type];
          return (
            <div
              key={source.name}
              className="flex items-center gap-3 opacity-0 animate-slide-up"
              style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: "forwards" }}
            >
              <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-subhead truncate">{source.name}</span>
                  <span className="text-footnote text-muted-foreground ml-2">
                    {source.mentions} menções
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
