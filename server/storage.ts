import { 
  type User, 
  type InsertUser,
  type VideoSession,
  type InsertVideoSession,
  type VoiceJournal,
  type InsertVoiceJournal,
  users,
  videoSessions,
  voiceJournals
} from "@shared/schema";
import { db } from "../db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createVideoSession(session: InsertVideoSession): Promise<VideoSession>;
  getVideoSessionsByUser(userId: string): Promise<VideoSession[]>;
  getVideoSession(id: string): Promise<VideoSession | undefined>;
  
  createVoiceJournal(journal: InsertVoiceJournal): Promise<VoiceJournal>;
  getVoiceJournalsByUser(userId: string): Promise<VoiceJournal[]>;
  getVoiceJournal(id: string): Promise<VoiceJournal | undefined>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createVideoSession(insertSession: InsertVideoSession): Promise<VideoSession> {
    const [session] = await db.insert(videoSessions).values(insertSession).returning();
    return session;
  }

  async getVideoSessionsByUser(userId: string): Promise<VideoSession[]> {
    return await db
      .select()
      .from(videoSessions)
      .where(eq(videoSessions.userId, userId))
      .orderBy(desc(videoSessions.date));
  }

  async getVideoSession(id: string): Promise<VideoSession | undefined> {
    const [session] = await db.select().from(videoSessions).where(eq(videoSessions.id, id));
    return session;
  }

  async createVoiceJournal(insertJournal: InsertVoiceJournal): Promise<VoiceJournal> {
    const [journal] = await db.insert(voiceJournals).values(insertJournal).returning();
    return journal;
  }

  async getVoiceJournalsByUser(userId: string): Promise<VoiceJournal[]> {
    return await db
      .select()
      .from(voiceJournals)
      .where(eq(voiceJournals.userId, userId))
      .orderBy(desc(voiceJournals.date));
  }

  async getVoiceJournal(id: string): Promise<VoiceJournal | undefined> {
    const [journal] = await db.select().from(voiceJournals).where(eq(voiceJournals.id, id));
    return journal;
  }
}

export const storage = new DbStorage();
