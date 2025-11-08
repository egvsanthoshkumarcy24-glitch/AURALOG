// localStorage utilities for mock data
// TODO: Replace with real backend API

export interface VideoSession {
  id: string;
  date: number;
  duration: number;
  dominantEmotion: string;
  emotionData: Array<{
    emotion: string;
    confidence: number;
    stressLevel: number;
    timestamp: number;
  }>;
}

export interface VoiceJournal {
  id: string;
  date: number;
  title: string;
  content: string;
  emotion: string;
  confidence: number;
  duration: number;
}

export function getVideoSessions(): VideoSession[] {
  const stored = localStorage.getItem("auralog-video-sessions");
  return stored ? JSON.parse(stored) : [];
}

export function saveVideoSession(session: VideoSession) {
  const sessions = getVideoSessions();
  sessions.unshift(session);
  localStorage.setItem("auralog-video-sessions", JSON.stringify(sessions));
}

export function getVoiceJournals(): VoiceJournal[] {
  const stored = localStorage.getItem("auralog-voice-journals");
  return stored ? JSON.parse(stored) : [];
}

export function saveVoiceJournal(journal: VoiceJournal) {
  const journals = getVoiceJournals();
  journals.unshift(journal);
  localStorage.setItem("auralog-voice-journals", JSON.stringify(journals));
}

export function getSessionById(id: string): VideoSession | undefined {
  const sessions = getVideoSessions();
  return sessions.find((s) => s.id === id);
}

export function getJournalById(id: string): VoiceJournal | undefined {
  const journals = getVoiceJournals();
  return journals.find((j) => j.id === id);
}
