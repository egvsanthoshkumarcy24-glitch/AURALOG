import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import LogCard from "@/components/LogCard";
import { useQuery } from "@tanstack/react-query";
import type { VideoSession, VoiceJournal } from "@shared/schema";

export default function Insights() {
  const { data: videoSessions = [], isLoading: loadingSessions } = useQuery<VideoSession[]>({
    queryKey: ["/api/video-sessions"],
  });

  const { data: voiceJournals = [], isLoading: loadingJournals } = useQuery<VoiceJournal[]>({
    queryKey: ["/api/voice-journals"],
  });

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-2">Insights</h1>
          <p className="text-lg text-muted-foreground">
            Review your emotional journey and track your progress over time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="video" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="video" data-testid="tab-video">
                Video Logs
              </TabsTrigger>
              <TabsTrigger value="voice" data-testid="tab-voice">
                Voice Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="video">
              {loadingSessions ? (
                <div className="text-center py-16">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading sessions...</p>
                </div>
              ) : videoSessions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videoSessions.map((session) => (
                    <LogCard
                      key={session.id}
                      date={new Date(session.date).getTime()}
                      emotion={session.dominantEmotion}
                      type="video"
                      duration={session.duration}
                      onClick={() => console.log("View session:", session.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No video sessions yet</p>
                  <p className="text-sm text-muted-foreground">
                    Start a video session to track your emotions in real-time
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="voice">
              {loadingJournals ? (
                <div className="text-center py-16">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading journals...</p>
                </div>
              ) : voiceJournals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {voiceJournals.map((journal) => (
                    <LogCard
                      key={journal.id}
                      date={new Date(journal.date).getTime()}
                      emotion={journal.emotion}
                      type="voice"
                      duration={journal.duration}
                      snippet={journal.content}
                      onClick={() => console.log("View journal:", journal.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No voice journals yet</p>
                  <p className="text-sm text-muted-foreground">
                    Create a voice journal to capture your thoughts and feelings
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
