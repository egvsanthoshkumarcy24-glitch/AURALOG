import Insights from "../Insights";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function InsightsExample() {
  localStorage.setItem("auralog-user", JSON.stringify({ id: "1", email: "user@example.com", name: "Alex" }));
  
  // Add mock data
  const mockVideoSessions = [
    {
      id: "video-1",
      date: Date.now() - 86400000,
      duration: 180,
      dominantEmotion: "calm",
      emotionData: [],
    },
    {
      id: "video-2",
      date: Date.now() - 172800000,
      duration: 240,
      dominantEmotion: "happy",
      emotionData: [],
    },
  ];

  const mockVoiceJournals = [
    {
      id: "voice-1",
      date: Date.now() - 86400000,
      title: "Morning Reflection",
      content: "Today was a great day! I felt very productive and accomplished a lot of my goals.",
      emotion: "happy",
      confidence: 92,
      duration: 120,
    },
    {
      id: "voice-2",
      date: Date.now() - 259200000,
      title: "Evening Thoughts",
      content: "Feeling calm and peaceful after a long day of work. Ready to relax.",
      emotion: "calm",
      confidence: 88,
      duration: 150,
    },
  ];

  localStorage.setItem("auralog-video-sessions", JSON.stringify(mockVideoSessions));
  localStorage.setItem("auralog-voice-journals", JSON.stringify(mockVoiceJournals));
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <Insights />
      </AuthProvider>
    </ThemeProvider>
  );
}
