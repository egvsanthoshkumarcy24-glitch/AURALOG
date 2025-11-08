import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  gradient: string;
}

export default function DashboardCard({
  title,
  description,
  icon,
  href,
  gradient,
}: DashboardCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Card
          className="relative overflow-hidden p-8 cursor-pointer hover-elevate h-full min-h-[280px] flex flex-col justify-between rounded-3xl"
          data-testid={`card-${title.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: gradient,
            }}
          />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              {icon}
            </div>
            <h3 className="text-2xl font-serif font-semibold mb-2">{title}</h3>
            <p className="text-base text-muted-foreground">{description}</p>
          </div>
          <div className="relative z-10 flex justify-end">
            <ArrowRight className="w-6 h-6 text-primary" />
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
