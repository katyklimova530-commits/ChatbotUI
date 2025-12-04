import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
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

// Content Strategies
export const contentStrategies = pgTable("content_strategies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  topic: text("topic").notNull(),
  goal: text("goal").notNull(),
  days: integer("days").notNull().default(7),
  posts: jsonb("posts").notNull().$type<ContentPost[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export interface ContentPost {
  day: number;
  topic: string;
  hook: string;
  cta: string;
  hashtags: string[];
}

export const insertContentStrategySchema = createInsertSchema(contentStrategies).omit({
  id: true,
  createdAt: true,
});

export type InsertContentStrategy = z.infer<typeof insertContentStrategySchema>;
export type ContentStrategy = typeof contentStrategies.$inferSelect;

// Archetype Results
export const archetypeResults = pgTable("archetype_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  archetypeName: text("archetype_name").notNull(),
  archetypeDescription: text("archetype_description").notNull(),
  answers: jsonb("answers").notNull().$type<number[]>(),
  recommendations: jsonb("recommendations").notNull().$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertArchetypeResultSchema = createInsertSchema(archetypeResults).omit({
  id: true,
  createdAt: true,
});

export type InsertArchetypeResult = z.infer<typeof insertArchetypeResultSchema>;
export type ArchetypeResult = typeof archetypeResults.$inferSelect;

// Voice Posts
export const voicePosts = pgTable("voice_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  originalText: text("original_text").notNull(),
  refinedText: text("refined_text").notNull(),
  tone: text("tone").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertVoicePostSchema = createInsertSchema(voicePosts).omit({
  id: true,
  createdAt: true,
});

export type InsertVoicePost = z.infer<typeof insertVoicePostSchema>;
export type VoicePost = typeof voicePosts.$inferSelect;

// Case Studies
export const caseStudies = pgTable("case_studies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  reviewText: text("review_text").notNull(),
  before: text("before"),
  action: text("action"),
  after: text("after"),
  tags: jsonb("tags").notNull().$type<string[]>(),
  generatedHeadlines: jsonb("generated_headlines").$type<string[]>(),
  generatedQuote: text("generated_quote"),
  generatedBody: text("generated_body"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCaseStudySchema = createInsertSchema(caseStudies).omit({
  id: true,
  createdAt: true,
});

export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
export type CaseStudy = typeof caseStudies.$inferSelect;
