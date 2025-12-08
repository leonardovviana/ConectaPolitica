import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

interface MentionChartProps {
  data: Array<{
    date: string;
    mentions: number;
    positive: number;
    negative: number;
  }>;
  className?: string;
}

export function MentionChart({ data, className }: MentionChartProps) {
  return (
    <div className={cn("glass-card rounded-2xl p-6", className)}>
      <div className="mb-6">
        <h3 className="text-title-3">Menções ao Longo do Tempo</h3>
        <p className="text-caption mt-1">Últimos 7 dias</p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="mentionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(228, 92%, 55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(228, 92%, 55%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(145, 65%, 44%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(145, 65%, 44%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              dx={-10}
            />
            
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="glass-card rounded-xl p-3 shadow-ios-lg">
                      <p className="text-subhead mb-1">{label}</p>
                      {payload.map((entry, index) => (
                        <p key={index} className="text-footnote" style={{ color: entry.color }}>
                          {entry.name}: {entry.value}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            
            <Area
              type="monotone"
              dataKey="mentions"
              name="Total"
              stroke="hsl(228, 92%, 55%)"
              strokeWidth={2.5}
              fill="url(#mentionsGradient)"
            />
            <Area
              type="monotone"
              dataKey="positive"
              name="Positivas"
              stroke="hsl(145, 65%, 44%)"
              strokeWidth={2}
              fill="url(#positiveGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
