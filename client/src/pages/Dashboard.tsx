import { motion } from "framer-motion";
import { Video, Mic } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            How are you feeling today? Choose a tracking mode to get started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <DashboardCard
            title="Video Session"
            description="Track your emotions in real-time using your webcam with live analysis"
            icon={<Video className="w-8 h-8 text-primary" />}
            href="/video"
            gradient="linear-gradient(135deg, hsl(262, 70%, 60%) 0%, hsl(210, 75%, 55%) 100%)"
          />
          <DashboardCard
            title="Voice Journal"
            description="Record your thoughts and analyze emotional tone through voice"
            icon={<Mic className="w-8 h-8 text-primary" />}
            href="/voice"
            gradient="linear-gradient(135deg, hsl(210, 75%, 55%) 0%, hsl(280, 65%, 60%) 100%)"
          />
        </motion.div>
      </div>
    </div>
  );
}
