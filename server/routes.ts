import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertVideoSessionSchema, insertVoiceJournalSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, password, name } = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({ email, password: hashedPassword, name });
      
      req.session.userId = user.id;
      res.json({ id: user.id, email: user.email, name: user.name });
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.userId = user.id;
      res.json({ id: user.id, email: user.email, name: user.name });
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ id: user.id, email: user.email, name: user.name });
  });

  // Middleware to check authentication
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    next();
  };

  // Video session routes
  app.post("/api/video-sessions", requireAuth, async (req, res) => {
    try {
      const data = insertVideoSessionSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });
      
      const session = await storage.createVideoSession(data);
      res.json(session);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.get("/api/video-sessions", requireAuth, async (req, res) => {
    try {
      const sessions = await storage.getVideoSessionsByUser(req.session.userId!);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sessions" });
    }
  });

  app.get("/api/video-sessions/:id", requireAuth, async (req, res) => {
    try {
      const session = await storage.getVideoSession(req.params.id);
      if (!session || session.userId !== req.session.userId) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch session" });
    }
  });

  // Voice journal routes
  app.post("/api/voice-journals", requireAuth, async (req, res) => {
    try {
      const data = insertVoiceJournalSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });
      
      const journal = await storage.createVoiceJournal(data);
      res.json(journal);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.get("/api/voice-journals", requireAuth, async (req, res) => {
    try {
      const journals = await storage.getVoiceJournalsByUser(req.session.userId!);
      res.json(journals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch journals" });
    }
  });

  app.get("/api/voice-journals/:id", requireAuth, async (req, res) => {
    try {
      const journal = await storage.getVoiceJournal(req.params.id);
      if (!journal || journal.userId !== req.session.userId) {
        return res.status(404).json({ error: "Journal not found" });
      }
      res.json(journal);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch journal" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
