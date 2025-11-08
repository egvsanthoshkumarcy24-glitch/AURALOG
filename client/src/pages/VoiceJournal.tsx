import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import EmotionBadge from "@/components/EmotionBadge";
import ConfidenceRing from "@/components/ConfidenceRing";
import { analyzeAudioChunk, type EmotionData } from "@/lib/emotionAnalysis";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function VoiceJournal() {
  const [isRecording, setIsRecording] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState<EmotionData | null>(null);
  const [recordingStart, setRecordingStart] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingStart(Date.now());
      
      // Mock emotion analysis
      const emotionData = analyzeAudioChunk();
      setEmotion(emotionData);
      
      // Mock voice-to-text
      setTimeout(() => {
        setContent((prev) =>
          prev + " Today I'm feeling quite productive and accomplished. The session went well."
        );
      }, 2000);
    } catch (err) {
      console.error("Failed to access microphone:", err);
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to record voice journals.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
  };

  const saveJournal = async () => {
    if (!title || !content) {
      toast({
        title: "Missing Information",
        description: "Please add a title and content to your journal.",
        variant: "destructive",
      });
      return;
    }

    const duration = recordingStart ? Math.floor((Date.now() - recordingStart) / 1000) : 0;
    
    try {
      await apiRequest("/api/voice-journals", {
        method: "POST",
        body: JSON.stringify({
          date: new Date(),
          title,
          content,
          emotion: emotion?.emotion || "neutral",
          confidence: emotion?.confidence || 75,
          duration,
        }),
      });

      toast({
        title: "Journal Saved",
        description: "Your voice journal has been saved successfully.",
      });

      setLocation("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save journal. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/dashboard")}
            className="gap-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="text-center">
            <motion.button
              onClick={isRecording ? stopRecording : startRecording}
              whileTap={{ scale: 0.95 }}
              className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 mx-auto ${
                isRecording
                  ? "bg-destructive hover:bg-destructive/90"
                  : "bg-primary hover:bg-primary/90"
              } transition-colors`}
              data-testid="button-record"
            >
              {isRecording ? (
                <Square className="w-10 h-10 text-primary-foreground" />
              ) : (
                <Mic className="w-10 h-10 text-primary-foreground" />
              )}
            </motion.button>
            <p className="text-muted-foreground">
              {isRecording ? "Recording... Click to stop" : "Click to start recording"}
            </p>
          </div>

          {emotion && (
            <Card className="p-6 rounded-2xl">
              <h3 className="text-lg font-serif font-semibold mb-4 text-center">
                Detected Emotion
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                <EmotionBadge emotion={emotion.emotion} size="lg" />
                <ConfidenceRing confidence={emotion.confidence} size={100} />
              </div>
            </Card>
          )}

          <Card className="p-6 rounded-2xl">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="text-sm font-medium mb-2 block">
                  Journal Title
                </label>
                <Input
                  id="title"
                  placeholder="Give your journal entry a title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl rounded-xl"
                  data-testid="input-title"
                />
              </div>
              <div>
                <label htmlFor="content" className="text-sm font-medium mb-2 block">
                  Journal Entry
                </label>
                <Textarea
                  id="content"
                  placeholder="Your thoughts will appear here as you speak, or you can type them directly..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[300px] resize-y rounded-xl"
                  data-testid="input-content"
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={saveJournal}
              size="lg"
              className="rounded-full px-8"
              data-testid="button-save"
            >
              Save Journal
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
