import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { EmotionData } from "@/lib/emotionAnalysis";

interface EmotionChartProps {
  data: EmotionData[];
}

export default function EmotionChart({ data }: EmotionChartProps) {
  const chartData = data.map((d, index) => ({
    time: index,
    confidence: d.confidence,
    stress: d.stressLevel,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="time"
          stroke="hsl(var(--muted-foreground))"
          tick={{ fill: "hsl(var(--muted-foreground))" }}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          tick={{ fill: "hsl(var(--muted-foreground))" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="confidence"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={false}
          name="Confidence %"
        />
        <Line
          type="monotone"
          dataKey="stress"
          stroke="hsl(var(--chart-2))"
          strokeWidth={2}
          dot={false}
          name="Stress %"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
