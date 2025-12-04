import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContentStrategySchema, insertArchetypeResultSchema, insertVoicePostSchema, insertCaseStudySchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Content Strategies
  app.get("/api/strategies", async (req, res) => {
    try {
      const strategies = await storage.getContentStrategies();
      res.json(strategies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch strategies" });
    }
  });

  app.get("/api/strategies/:id", async (req, res) => {
    try {
      const strategy = await storage.getContentStrategy(req.params.id);
      if (!strategy) {
        return res.status(404).json({ error: "Strategy not found" });
      }
      res.json(strategy);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch strategy" });
    }
  });

  app.post("/api/strategies", async (req, res) => {
    try {
      const parsed = insertContentStrategySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }
      const strategy = await storage.createContentStrategy(parsed.data);
      res.status(201).json(strategy);
    } catch (error) {
      res.status(500).json({ error: "Failed to create strategy" });
    }
  });

  app.delete("/api/strategies/:id", async (req, res) => {
    try {
      await storage.deleteContentStrategy(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete strategy" });
    }
  });

  // Archetype Results
  app.get("/api/archetypes", async (req, res) => {
    try {
      const results = await storage.getArchetypeResults();
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch archetype results" });
    }
  });

  app.get("/api/archetypes/latest", async (req, res) => {
    try {
      const result = await storage.getLatestArchetypeResult();
      res.json(result || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest archetype result" });
    }
  });

  app.post("/api/archetypes", async (req, res) => {
    try {
      const parsed = insertArchetypeResultSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }
      const result = await storage.createArchetypeResult(parsed.data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to save archetype result" });
    }
  });

  // Voice Posts
  app.get("/api/voice-posts", async (req, res) => {
    try {
      const posts = await storage.getVoicePosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch voice posts" });
    }
  });

  app.post("/api/voice-posts", async (req, res) => {
    try {
      const parsed = insertVoicePostSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }
      const post = await storage.createVoicePost(parsed.data);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to save voice post" });
    }
  });

  app.delete("/api/voice-posts/:id", async (req, res) => {
    try {
      await storage.deleteVoicePost(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete voice post" });
    }
  });

  // Case Studies
  app.get("/api/cases", async (req, res) => {
    try {
      const query = req.query.q as string | undefined;
      const cases = query 
        ? await storage.searchCaseStudies(query)
        : await storage.getCaseStudies();
      res.json(cases);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch case studies" });
    }
  });

  app.get("/api/cases/:id", async (req, res) => {
    try {
      const caseStudy = await storage.getCaseStudy(req.params.id);
      if (!caseStudy) {
        return res.status(404).json({ error: "Case study not found" });
      }
      res.json(caseStudy);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch case study" });
    }
  });

  app.post("/api/cases", async (req, res) => {
    try {
      const parsed = insertCaseStudySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }
      const caseStudy = await storage.createCaseStudy(parsed.data);
      res.status(201).json(caseStudy);
    } catch (error) {
      res.status(500).json({ error: "Failed to create case study" });
    }
  });

  app.delete("/api/cases/:id", async (req, res) => {
    try {
      await storage.deleteCaseStudy(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete case study" });
    }
  });

  return httpServer;
}
