import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Sentiment variants
        positive: "bg-accent/15 text-accent border-accent/30",
        negative: "bg-destructive/15 text-destructive border-destructive/30",
        neutral: "bg-muted text-muted-foreground border-muted",
        warning: "bg-yellow-500/20 text-yellow-700 border-yellow-500/40",
        // Priority variants
        urgent: "bg-destructive text-destructive-foreground border-transparent animate-pulse",
        high: "bg-destructive/80 text-destructive-foreground border-transparent",
        medium: "bg-yellow-500 text-primary border-transparent",
        low: "bg-muted text-muted-foreground border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
