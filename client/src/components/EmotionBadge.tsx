import { Badge } from "@/components/ui/badge";
import { type Emotion } from "@/lib/emotionAnalysis";

interface EmotionBadgeProps {
  emotion: Emotion;
  size?: "sm" | "md" | "lg";
}

const emotionEmojis: Record<Emotion, string> = {
  happy: "😊",
  sad: "😢",
  calm: "😌",
  stressed: "😰",
  anxious: "😟",
  neutral: "😐",
  excited: "🤩",
};

export default function EmotionBadge({ emotion, size = "md" }: EmotionBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-3 py-1",
    md: "text-sm px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  return (
    <Badge
      variant="secondary"
      className={`${sizeClasses[size]} rounded-full capitalize font-medium`}
      data-testid={`badge-emotion-${emotion}`}
    >
      <span className="mr-2">{emotionEmojis[emotion]}</span>
      {emotion}
    </Badge>
  );
}
