import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const topicStatusEnum = z.enum(["not_started", "in_progress", "completed"]);
export type TopicStatus = z.infer<typeof topicStatusEnum>;

export const assignedToEnum = z.enum(["none", "chayan", "divyam"]);
export type AssignedTo = z.infer<typeof assignedToEnum>;

export const subtopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
});
export type Subtopic = z.infer<typeof subtopicSchema>;

export const topics = pgTable("topics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  subtopics: jsonb("subtopics").notNull().default(sql`'[]'::jsonb`),
  status: text("status").notNull().default("not_started"),
  assignedTo: text("assigned_to").notNull().default("none"),
});

export const insertTopicSchema = createInsertSchema(topics).omit({
  id: true,
}).extend({
  status: topicStatusEnum,
  assignedTo: assignedToEnum,
  subtopics: z.array(subtopicSchema),
});

export type Topic = {
  id: string;
  title: string;
  description: string;
  subtopics: Subtopic[];
  status: TopicStatus;
  assignedTo: AssignedTo;
};

export type InsertTopic = z.infer<typeof insertTopicSchema>;
