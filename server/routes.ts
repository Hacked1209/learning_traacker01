import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTopicSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

/**
 * Attach all API routes to an existing Express app instance.
 *
 * This is used both for the local HTTP server and for serverless
 * environments like Vercel, where we just export the Express app
 * without calling `listen` directly.
 */
export function attachRoutes(app: Express): void {
  // Get all topics
  app.get("/api/topics", async (_req, res) => {
    try {
      const topics = await storage.getAllTopics();
      res.json(topics);
    } catch (error) {
      console.error("Error fetching topics:", error);
      res.status(500).json({ error: "Failed to fetch topics" });
    }
  });

  // Get a single topic
  app.get("/api/topics/:id", async (req, res) => {
    try {
      const topic = await storage.getTopic(req.params.id);
      if (!topic) {
        return res.status(404).json({ error: "Topic not found" });
      }
      res.json(topic);
    } catch (error) {
      console.error("Error fetching topic:", error);
      res.status(500).json({ error: "Failed to fetch topic" });
    }
  });

  // Create a new topic
  app.post("/api/topics", async (req, res) => {
    try {
      const validationResult = insertTopicSchema.safeParse(req.body);
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({ error: validationError.message });
      }

      const topic = await storage.createTopic(validationResult.data);
      res.status(201).json(topic);
    } catch (error) {
      console.error("Error creating topic:", error);
      res.status(500).json({ error: "Failed to create topic" });
    }
  });

  // Update a topic
  app.put("/api/topics/:id", async (req, res) => {
    try {
      const partialTopicSchema = insertTopicSchema.partial();
      const validationResult = partialTopicSchema.safeParse(req.body);
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({ error: validationError.message });
      }

      const topic = await storage.updateTopic(
        req.params.id,
        validationResult.data,
      );
      if (!topic) {
        return res.status(404).json({ error: "Topic not found" });
      }
      res.json(topic);
    } catch (error) {
      console.error("Error updating topic:", error);
      res.status(500).json({ error: "Failed to update topic" });
    }
  });

  // Delete a topic
  app.delete("/api/topics/:id", async (req, res) => {
    try {
      const success = await storage.deleteTopic(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Topic not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting topic:", error);
      res.status(500).json({ error: "Failed to delete topic" });
    }
  });
}

/**
 * Local/dev entrypoint: create an HTTP server around the Express app.
 */
export async function registerRoutes(app: Express): Promise<Server> {
  attachRoutes(app);
  const httpServer = createServer(app);
  return httpServer;
}
