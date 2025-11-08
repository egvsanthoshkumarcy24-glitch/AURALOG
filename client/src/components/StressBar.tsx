import { motion } from "framer-motion";

interface StressBarProps {
  level: number;
}

export default function StressBar({ level }: StressBarProps) {
  const getColor = () => {
    if (level < 30) return "hsl(160, 60%, 55%)";
    if (level < 70) return "hsl(45, 93%, 58%)";
    return "hsl(0, 70%, 55%)";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-muted-foreground">Stress Level</span>
        <span className="text-sm font-mono font-medium" data-testid="text-stress-level">
          {level}%
        </span>
      </div>
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: getColor() }}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
