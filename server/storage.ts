import { topics, type Topic, type InsertTopic } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// 1. Define the Interface
// This ensures your storage class implements exactly what the routes need.
export interface IStorage {
  getAllTopics(): Promise<Topic[]>;
  getTopic(id: string): Promise<Topic | undefined>;
  createTopic(topic: InsertTopic): Promise<Topic>;
  updateTopic(id: string, topic: Partial<InsertTopic>): Promise<Topic | undefined>;
  deleteTopic(id: string): Promise<boolean>;
}

// 2. The Database Implementation
export class DatabaseStorage implements IStorage {
  
  async getAllTopics(): Promise<Topic[]> {
    // Returns all topics, sorted by creation (optional, using id for now)
    return await db.select().from(topics);
  }

  async getTopic(id: string): Promise<Topic | undefined> {
    const [topic] = await db.select().from(topics).where(eq(topics.id, id));
    return topic;
  }

  async createTopic(insertTopic: InsertTopic): Promise<Topic> {
    const [topic] = await db
      .insert(topics)
      .values(insertTopic)
      .returning();
    return topic;
  }

  async updateTopic(id: string, patch: Partial<InsertTopic>): Promise<Topic | undefined> {
    const [updatedTopic] = await db
      .update(topics)
      .set(patch)
      .where(eq(topics.id, id))
      .returning();
    return updatedTopic;
  }

  async deleteTopic(id: string): Promise<boolean> {
    const [deletedTopic] = await db
      .delete(topics)
      .where(eq(topics.id, id))
      .returning();
    
    // Returns true if a row was actually deleted
    return !!deletedTopic;
  }
}

// 3. Export a singleton instance
export const storage = new DatabaseStorage();
