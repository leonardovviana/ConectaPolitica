import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExternalLink, AlertTriangle, Newspaper, MessageCircle, Video } from "lucide-react";

export interface Mention {
  id: string;
  title: string;
  source: string;
  sourceType: "news" | "social" | "video" | "blog";
  date: string;
  sentiment: "positive" | "negative" | "neutral";
  priority?: "urgent" | "high" | "medium" | "low";
  excerpt: string;
  url: string;
}

interface MentionCardProps {
  mention: Mention;
  className?: string;
  delay?: number;
}

export function MentionCard({ mention, className, delay = 0 }: MentionCardProps) {
  const sourceIcons = {
    news: Newspaper,
    social: MessageCircle,
    video: Video,
    blog: Newspaper,
  };

  const SourceIcon = sourceIcons[mention.sourceType];

  return (
    <article
      className={cn(
        "feed-card group cursor-pointer opacity-0 animate-slide-up",
        className
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={mention.sentiment}>
              {mention.sentiment === "positive" && "Positivo"}
              {mention.sentiment === "negative" && "Negativo"}
              {mention.sentiment === "neutral" && "Neutro"}
            </Badge>
            {mention.priority === "urgent" && (
              <Badge variant="urgent" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                Urgente
              </Badge>
            )}
            {mention.priority === "high" && (
              <Badge variant="high">Alta Relevância</Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="text-title-3 line-clamp-2 mb-2 group-hover:text-secondary transition-colors">
            {mention.title}
          </h3>

          {/* Excerpt */}
          <p className="text-callout text-muted-foreground line-clamp-2 mb-3">
            {mention.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-footnote text-muted-foreground">
              <SourceIcon className="w-4 h-4" />
              <span className="font-medium">{mention.source}</span>
              <span className="opacity-50">•</span>
              <time className="font-light">{mention.date}</time>
            </div>

            <a
              href={mention.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-secondary text-subhead hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Ver fonte
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
