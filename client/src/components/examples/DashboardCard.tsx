import DashboardCard from "../DashboardCard";
import { Video, Mic } from "lucide-react";

export default function DashboardCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-6xl">
      <DashboardCard
        title="Video Session"
        description="Track your emotions in real-time using your webcam"
        icon={<Video className="w-8 h-8 text-primary" />}
        href="/video"
        gradient="linear-gradient(135deg, hsl(262, 70%, 60%) 0%, hsl(210, 75%, 55%) 100%)"
      />
      <DashboardCard
        title="Voice Journal"
        description="Record your thoughts and analyze emotional tone"
        icon={<Mic className="w-8 h-8 text-primary" />}
        href="/voice"
        gradient="linear-gradient(135deg, hsl(210, 75%, 55%) 0%, hsl(280, 65%, 60%) 100%)"
      />
    </div>
  );
}
