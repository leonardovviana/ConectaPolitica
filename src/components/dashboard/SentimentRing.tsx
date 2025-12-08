import { cn } from "@/lib/utils";

interface SentimentRingProps {
  positive: number;
  negative: number;
  neutral: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SentimentRing({
  positive,
  negative,
  neutral,
  size = "md",
  className,
}: SentimentRingProps) {
  const total = positive + negative + neutral;
  const positivePercent = Math.round((positive / total) * 100);
  const negativePercent = Math.round((negative / total) * 100);
  const neutralPercent = Math.round((neutral / total) * 100);

  const sizes = {
    sm: { ring: 80, stroke: 8, text: "text-lg" },
    md: { ring: 120, stroke: 12, text: "text-2xl" },
    lg: { ring: 160, stroke: 16, text: "text-3xl" },
  };

  const { ring, stroke, text } = sizes[size];
  const radius = (ring - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate dash arrays for each segment
  const positiveDash = (positivePercent / 100) * circumference;
  const negativeDash = (negativePercent / 100) * circumference;
  const neutralDash = (neutralPercent / 100) * circumference;

  const positiveOffset = 0;
  const negativeOffset = -(positiveDash);
  const neutralOffset = -(positiveDash + negativeDash);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={ring}
        height={ring}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={ring / 2}
          cy={ring / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={stroke}
          className="opacity-30"
        />
        
        {/* Neutral segment */}
        <circle
          cx={ring / 2}
          cy={ring / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={stroke}
          strokeDasharray={`${neutralDash} ${circumference}`}
          strokeDashoffset={neutralOffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out opacity-50"
        />

        {/* Negative segment */}
        <circle
          cx={ring / 2}
          cy={ring / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--destructive))"
          strokeWidth={stroke}
          strokeDasharray={`${negativeDash} ${circumference}`}
          strokeDashoffset={negativeOffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Positive segment */}
        <circle
          cx={ring / 2}
          cy={ring / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth={stroke}
          strokeDasharray={`${positiveDash} ${circumference}`}
          strokeDashoffset={positiveOffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold", text)}>{positivePercent}%</span>
        <span className="text-caption">Positivo</span>
      </div>
    </div>
  );
}

export function SentimentLegend() {
  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-accent" />
        <span className="text-footnote">Positivo</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-destructive" />
        <span className="text-footnote">Negativo</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-muted-foreground opacity-50" />
        <span className="text-footnote">Neutro</span>
      </div>
    </div>
  );
}
