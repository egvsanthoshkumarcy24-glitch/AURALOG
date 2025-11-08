import EmotionBadge from "../EmotionBadge";

export default function EmotionBadgeExample() {
  return (
    <div className="flex flex-wrap gap-4 p-8">
      <EmotionBadge emotion="happy" size="sm" />
      <EmotionBadge emotion="calm" size="md" />
      <EmotionBadge emotion="stressed" size="lg" />
    </div>
  );
}
