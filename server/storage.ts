import { 
  type User, type UpsertUser,
  type ContentStrategy, type InsertContentStrategy,
  type ArchetypeResult, type InsertArchetypeResult,
  type VoicePost, type InsertVoicePost,
  type CaseStudy, type InsertCaseStudy,
  users, contentStrategies, archetypeResults, voicePosts, caseStudies
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, ilike, or, and } from "drizzle-orm";

export interface IStorage {
  // Users (for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUser(id: string, data: Partial<UpsertUser>): Promise<User | undefined>;
  
  // Content Strategies
  getContentStrategies(userId: string): Promise<ContentStrategy[]>;
  getContentStrategy(id: string, userId: string): Promise<ContentStrategy | undefined>;
  createContentStrategy(strategy: InsertContentStrategy): Promise<ContentStrategy>;
  deleteContentStrategy(id: string, userId: string): Promise<void>;
  
  // Archetype Results
  getArchetypeResults(userId: string): Promise<ArchetypeResult[]>;
  getLatestArchetypeResult(userId: string): Promise<ArchetypeResult | undefined>;
  createArchetypeResult(result: InsertArchetypeResult): Promise<ArchetypeResult>;
  
  // Voice Posts
  getVoicePosts(userId: string): Promise<VoicePost[]>;
  createVoicePost(post: InsertVoicePost): Promise<VoicePost>;
  deleteVoicePost(id: string, userId: string): Promise<void>;
  
  // Case Studies
  getCaseStudies(userId: string): Promise<CaseStudy[]>;
  getCaseStudy(id: string, userId: string): Promise<CaseStudy | undefined>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
  searchCaseStudies(query: string, userId: string): Promise<CaseStudy[]>;
  deleteCaseStudy(id: string, userId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Users (for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUser(id: string, data: Partial<UpsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Content Strategies
  async getContentStrategies(userId: string): Promise<ContentStrategy[]> {
    return db.select().from(contentStrategies)
      .where(eq(contentStrategies.userId, userId))
      .orderBy(desc(contentStrategies.createdAt));
  }

  async getContentStrategy(id: string, userId: string): Promise<ContentStrategy | undefined> {
    const [strategy] = await db.select().from(contentStrategies)
      .where(and(eq(contentStrategies.id, id), eq(contentStrategies.userId, userId)));
    return strategy;
  }

  async createContentStrategy(strategy: InsertContentStrategy): Promise<ContentStrategy> {
    const [created] = await db.insert(contentStrategies).values(strategy).returning();
    return created;
  }

  async deleteContentStrategy(id: string, userId: string): Promise<void> {
    await db.delete(contentStrategies).where(
      and(eq(contentStrategies.id, id), eq(contentStrategies.userId, userId))
    );
  }

  // Archetype Results
  async getArchetypeResults(userId: string): Promise<ArchetypeResult[]> {
    return db.select().from(archetypeResults)
      .where(eq(archetypeResults.userId, userId))
      .orderBy(desc(archetypeResults.createdAt));
  }

  async getLatestArchetypeResult(userId: string): Promise<ArchetypeResult | undefined> {
    const [result] = await db.select().from(archetypeResults)
      .where(eq(archetypeResults.userId, userId))
      .orderBy(desc(archetypeResults.createdAt))
      .limit(1);
    return result;
  }

  async createArchetypeResult(result: InsertArchetypeResult): Promise<ArchetypeResult> {
    const [created] = await db.insert(archetypeResults).values(result).returning();
    return created;
  }

  // Voice Posts
  async getVoicePosts(userId: string): Promise<VoicePost[]> {
    return db.select().from(voicePosts)
      .where(eq(voicePosts.userId, userId))
      .orderBy(desc(voicePosts.createdAt));
  }

  async createVoicePost(post: InsertVoicePost): Promise<VoicePost> {
    const [created] = await db.insert(voicePosts).values(post).returning();
    return created;
  }

  async deleteVoicePost(id: string, userId: string): Promise<void> {
    await db.delete(voicePosts).where(
      and(eq(voicePosts.id, id), eq(voicePosts.userId, userId))
    );
  }

  // Case Studies
  async getCaseStudies(userId: string): Promise<CaseStudy[]> {
    return db.select().from(caseStudies)
      .where(eq(caseStudies.userId, userId))
      .orderBy(desc(caseStudies.createdAt));
  }

  async getCaseStudy(id: string, userId: string): Promise<CaseStudy | undefined> {
    const [caseStudy] = await db.select().from(caseStudies)
      .where(and(eq(caseStudies.id, id), eq(caseStudies.userId, userId)));
    return caseStudy;
  }

  async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const [created] = await db.insert(caseStudies).values(caseStudy).returning();
    return created;
  }

  async searchCaseStudies(query: string, userId: string): Promise<CaseStudy[]> {
    const searchCondition = or(
      ilike(caseStudies.reviewText, `%${query}%`),
      ilike(caseStudies.generatedQuote, `%${query}%`),
      ilike(caseStudies.generatedBody, `%${query}%`)
    );
    
    return db.select().from(caseStudies)
      .where(and(eq(caseStudies.userId, userId), searchCondition))
      .orderBy(desc(caseStudies.createdAt));
  }

  async deleteCaseStudy(id: string, userId: string): Promise<void> {
    await db.delete(caseStudies).where(
      and(eq(caseStudies.id, id), eq(caseStudies.userId, userId))
    );
  }
}

export const storage = new DatabaseStorage();
