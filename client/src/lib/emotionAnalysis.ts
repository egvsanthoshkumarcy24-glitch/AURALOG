// Mock emotion analysis functions
// TODO: Replace with real RunAnywhere SDK or other emotion analysis API

export type Emotion = "happy" | "sad" | "calm" | "stressed" | "anxious" | "neutral" | "excited";

export interface EmotionData {
  emotion: Emotion;
  confidence: number;
  stressLevel: number;
  timestamp: number;
}

const emotions: Emotion[] = ["happy", "calm", "neutral", "excited", "anxious", "stressed", "sad"];

// Mock function to analyze video frame
export function analyzeVideoFrame(): EmotionData {
  const emotion = emotions[Math.floor(Math.random() * emotions.length)];
  return {
    emotion,
    confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
    stressLevel: Math.floor(Math.random() * 100),
    timestamp: Date.now(),
  };
}

// Mock function to analyze audio chunk
export function analyzeAudioChunk(): EmotionData {
  const emotion = emotions[Math.floor(Math.random() * emotions.length)];
  return {
    emotion,
    confidence: Math.floor(Math.random() * 25) + 75, // 75-100%
    stressLevel: Math.floor(Math.random() * 100),
    timestamp: Date.now(),
  };
}

export function getEmotionColor(emotion: Emotion): string {
  const colors: Record<Emotion, string> = {
    happy: "hsl(45, 93%, 58%)",
    sad: "hsl(210, 60%, 50%)",
    calm: "hsl(160, 60%, 55%)",
    stressed: "hsl(0, 70%, 55%)",
    anxious: "hsl(30, 80%, 55%)",
    neutral: "hsl(210, 15%, 60%)",
    excited: "hsl(280, 70%, 60%)",
  };
  return colors[emotion];
}
