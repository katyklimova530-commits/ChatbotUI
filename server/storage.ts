import { 
  type User, type InsertUser,
  type ContentStrategy, type InsertContentStrategy,
  type ArchetypeResult, type InsertArchetypeResult,
  type VoicePost, type InsertVoicePost,
  type CaseStudy, type InsertCaseStudy,
  users, contentStrategies, archetypeResults, voicePosts, caseStudies
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, ilike, or } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Content Strategies
  getContentStrategies(): Promise<ContentStrategy[]>;
  getContentStrategy(id: string): Promise<ContentStrategy | undefined>;
  createContentStrategy(strategy: InsertContentStrategy): Promise<ContentStrategy>;
  deleteContentStrategy(id: string): Promise<void>;
  
  // Archetype Results
  getArchetypeResults(): Promise<ArchetypeResult[]>;
  getLatestArchetypeResult(): Promise<ArchetypeResult | undefined>;
  createArchetypeResult(result: InsertArchetypeResult): Promise<ArchetypeResult>;
  
  // Voice Posts
  getVoicePosts(): Promise<VoicePost[]>;
  createVoicePost(post: InsertVoicePost): Promise<VoicePost>;
  deleteVoicePost(id: string): Promise<void>;
  
  // Case Studies
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudy(id: string): Promise<CaseStudy | undefined>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
  searchCaseStudies(query: string): Promise<CaseStudy[]>;
  deleteCaseStudy(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Content Strategies
  async getContentStrategies(): Promise<ContentStrategy[]> {
    return db.select().from(contentStrategies).orderBy(desc(contentStrategies.createdAt));
  }

  async getContentStrategy(id: string): Promise<ContentStrategy | undefined> {
    const [strategy] = await db.select().from(contentStrategies).where(eq(contentStrategies.id, id));
    return strategy;
  }

  async createContentStrategy(strategy: InsertContentStrategy): Promise<ContentStrategy> {
    const [created] = await db.insert(contentStrategies).values(strategy).returning();
    return created;
  }

  async deleteContentStrategy(id: string): Promise<void> {
    await db.delete(contentStrategies).where(eq(contentStrategies.id, id));
  }

  // Archetype Results
  async getArchetypeResults(): Promise<ArchetypeResult[]> {
    return db.select().from(archetypeResults).orderBy(desc(archetypeResults.createdAt));
  }

  async getLatestArchetypeResult(): Promise<ArchetypeResult | undefined> {
    const [result] = await db.select().from(archetypeResults)
      .orderBy(desc(archetypeResults.createdAt))
      .limit(1);
    return result;
  }

  async createArchetypeResult(result: InsertArchetypeResult): Promise<ArchetypeResult> {
    const [created] = await db.insert(archetypeResults).values(result).returning();
    return created;
  }

  // Voice Posts
  async getVoicePosts(): Promise<VoicePost[]> {
    return db.select().from(voicePosts).orderBy(desc(voicePosts.createdAt));
  }

  async createVoicePost(post: InsertVoicePost): Promise<VoicePost> {
    const [created] = await db.insert(voicePosts).values(post).returning();
    return created;
  }

  async deleteVoicePost(id: string): Promise<void> {
    await db.delete(voicePosts).where(eq(voicePosts.id, id));
  }

  // Case Studies
  async getCaseStudies(): Promise<CaseStudy[]> {
    return db.select().from(caseStudies).orderBy(desc(caseStudies.createdAt));
  }

  async getCaseStudy(id: string): Promise<CaseStudy | undefined> {
    const [caseStudy] = await db.select().from(caseStudies).where(eq(caseStudies.id, id));
    return caseStudy;
  }

  async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const [created] = await db.insert(caseStudies).values(caseStudy).returning();
    return created;
  }

  async searchCaseStudies(query: string): Promise<CaseStudy[]> {
    return db.select().from(caseStudies)
      .where(
        or(
          ilike(caseStudies.reviewText, `%${query}%`),
          ilike(caseStudies.generatedQuote, `%${query}%`),
          ilike(caseStudies.generatedBody, `%${query}%`)
        )
      )
      .orderBy(desc(caseStudies.createdAt));
  }

  async deleteCaseStudy(id: string): Promise<void> {
    await db.delete(caseStudies).where(eq(caseStudies.id, id));
  }
}

export const storage = new DatabaseStorage();
