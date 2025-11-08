import EmotionChart from "../EmotionChart";
import { analyzeVideoFrame } from "@/lib/emotionAnalysis";

export default function EmotionChartExample() {
  const mockData = Array.from({ length: 20 }, () => analyzeVideoFrame());
  
  return (
    <div className="p-8">
      <EmotionChart data={mockData} />
    </div>
  );
}
