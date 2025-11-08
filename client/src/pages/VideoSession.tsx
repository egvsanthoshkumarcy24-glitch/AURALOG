import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import EmotionBadge from "@/components/EmotionBadge";
import ConfidenceRing from "@/components/ConfidenceRing";
import StressBar from "@/components/StressBar";
import EmotionChart from "@/components/EmotionChart";
import { analyzeVideoFrame, type EmotionData } from "@/lib/emotionAnalysis";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type SessionStatus = "idle" | "running" | "paused";

export default function VideoSession() {
  const [status, setStatus] = useState<SessionStatus>("idle");
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null);
  const [emotionHistory, setEmotionHistory] = useState<EmotionData[]>([]);
  const [sessionStart, setSessionStart] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Request webcam access
    if (videoRef.current && status === "running") {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Failed to access webcam:", err);
          toast({
            title: "Camera Access Denied",
            description: "Please allow camera access to use video sessions.",
            variant: "destructive",
          });
        });
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [status, toast]);

  const startSession = () => {
    setStatus("running");
    setSessionStart(Date.now());
    setEmotionHistory([]);
    
    intervalRef.current = setInterval(() => {
      const data = analyzeVideoFrame();
      setCurrentEmotion(data);
      setEmotionHistory((prev) => [...prev, data]);
    }, 1000);
  };

  const pauseSession = () => {
    setStatus("paused");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resumeSession = () => {
    setStatus("running");
    intervalRef.current = setInterval(() => {
      const data = analyzeVideoFrame();
      setCurrentEmotion(data);
      setEmotionHistory((prev) => [...prev, data]);
    }, 1000);
  };

  const stopSession = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Save session
    if (emotionHistory.length > 0) {
      const emotions = emotionHistory.map((d) => d.emotion);
      const dominantEmotion = emotions.sort((a, b) =>
        emotions.filter((e) => e === a).length - emotions.filter((e) => e === b).length
      ).pop() || "neutral";

      try {
        await apiRequest("/api/video-sessions", {
          method: "POST",
          body: JSON.stringify({
            date: new Date(sessionStart),
            duration: Math.floor((Date.now() - sessionStart) / 1000),
            dominantEmotion,
            emotionData: emotionHistory,
          }),
        });

        toast({
          title: "Session Saved",
          description: "Your video session has been saved to your logs.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save session. Please try again.",
          variant: "destructive",
        });
      }
    }

    setStatus("idle");
    setCurrentEmotion(null);
    setEmotionHistory([]);
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setLocation("/dashboard")}
            className="gap-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          {status !== "idle" && (
            <Badge variant="secondary" className="gap-2 px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-chart-1 animate-pulse" />
              LIVE
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden rounded-2xl">
              <div className="aspect-video bg-muted relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {status === "idle" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <p className="text-muted-foreground">Camera preview will appear here</p>
                  </div>
                )}
              </div>
              <div className="p-6 backdrop-blur bg-card/80 flex gap-4 justify-center">
                {status === "idle" && (
                  <Button
                    onClick={startSession}
                    className="gap-2 rounded-full px-8"
                    size="lg"
                    data-testid="button-start"
                  >
                    <Play className="w-5 h-5" />
                    Start Session
                  </Button>
                )}
                {status === "running" && (
                  <>
                    <Button
                      onClick={pauseSession}
                      variant="secondary"
                      className="gap-2 rounded-full px-8"
                      size="lg"
                      data-testid="button-pause"
                    >
                      <Pause className="w-5 h-5" />
                      Pause
                    </Button>
                    <Button
                      onClick={stopSession}
                      variant="destructive"
                      className="gap-2 rounded-full px-8"
                      size="lg"
                      data-testid="button-stop"
                    >
                      <Square className="w-5 h-5" />
                      Stop
                    </Button>
                  </>
                )}
                {status === "paused" && (
                  <>
                    <Button
                      onClick={resumeSession}
                      className="gap-2 rounded-full px-8"
                      size="lg"
                      data-testid="button-resume"
                    >
                      <Play className="w-5 h-5" />
                      Resume
                    </Button>
                    <Button
                      onClick={stopSession}
                      variant="destructive"
                      className="gap-2 rounded-full px-8"
                      size="lg"
                      data-testid="button-stop"
                    >
                      <Square className="w-5 h-5" />
                      Stop
                    </Button>
                  </>
                )}
              </div>
            </Card>

            {emotionHistory.length > 0 && (
              <Card className="p-6 rounded-2xl">
                <h3 className="text-xl font-serif font-semibold mb-4">Emotion Trends</h3>
                <EmotionChart data={emotionHistory} />
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6 rounded-2xl">
              <h3 className="text-lg font-serif font-semibold mb-4">Current Metrics</h3>
              {currentEmotion ? (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <EmotionBadge emotion={currentEmotion.emotion} size="lg" />
                  </div>
                  <div className="flex justify-center">
                    <ConfidenceRing confidence={currentEmotion.confidence} />
                  </div>
                  <StressBar level={currentEmotion.stressLevel} />
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Start a session to see metrics
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
