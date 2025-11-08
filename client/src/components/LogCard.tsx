import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface LogCardProps {
  date: number;
  emotion: string;
  type: "video" | "voice";
  duration?: number;
  snippet?: string;
  onClick?: () => void;
}

export default function LogCard({ date, emotion, type, duration, snippet, onClick }: LogCardProps) {
  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="p-6 hover-elevate cursor-pointer rounded-2xl"
        onClick={onClick}
        data-testid={`card-log-${type}`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(date)}</span>
          </div>
          <Badge variant="secondary" className="rounded-full capitalize">
            {emotion}
          </Badge>
        </div>
        {duration && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(duration)}</span>
          </div>
        )}
        {snippet && (
          <p className="text-sm text-foreground line-clamp-2">{snippet}</p>
        )}
      </Card>
    </motion.div>
  );
}
