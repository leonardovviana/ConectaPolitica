import { MentionCard, Mention } from "./MentionCard";
import { cn } from "@/lib/utils";

interface MentionFeedProps {
  mentions: Mention[];
  className?: string;
}

export function MentionFeed({ mentions, className }: MentionFeedProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {mentions.map((mention, index) => (
        <MentionCard
          key={mention.id}
          mention={mention}
          delay={100 + index * 50}
        />
      ))}
    </div>
  );
}
