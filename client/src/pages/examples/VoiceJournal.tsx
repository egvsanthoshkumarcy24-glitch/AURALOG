import VoiceJournal from "../VoiceJournal";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function VoiceJournalExample() {
  localStorage.setItem("auralog-user", JSON.stringify({ id: "1", email: "user@example.com", name: "Alex" }));
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <VoiceJournal />
      </AuthProvider>
    </ThemeProvider>
  );
}
