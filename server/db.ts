import { drizzle } from "drizzle-orm/mysql2";
import { eq, desc } from "drizzle-orm";
import { InsertUser, users, briefings, InsertBriefing, Briefing, customForms, InsertCustomForm, CustomForm, customFormSubmissions, InsertCustomFormSubmission, CustomFormSubmission } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function createUser(user: InsertUser): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create user: database not available");
    return;
  }
  await db.insert(users).values({ ...user, lastSignedIn: new Date() });
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateLastSignedIn(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, id));
}

export async function adminExists(): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select({ id: users.id }).from(users).limit(1);
  return result.length > 0;
}


// Briefing queries
export async function createBriefing(briefing: InsertBriefing): Promise<Briefing | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create briefing: database not available");
    return null;
  }

  try {
    const result = await db.insert(briefings).values(briefing);
    const id = (result as any)[0]?.insertId;
    if (!id) return null;
    
    const created = await db.select().from(briefings).where(eq(briefings.id, id)).limit(1);
    return created.length > 0 ? created[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create briefing:", error);
    return null;
  }
}

export async function getBriefings(): Promise<Briefing[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get briefings: database not available");
    return [];
  }

  try {
    return await db.select().from(briefings).orderBy(desc(briefings.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get briefings:", error);
    return [];
  }
}

export async function getBriefingById(id: number): Promise<Briefing | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get briefing: database not available");
    return null;
  }

  try {
    const result = await db.select().from(briefings).where(eq(briefings.id, id)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get briefing:", error);
    return null;
  }
}

export async function updateBriefing(id: number, updates: Partial<Briefing>): Promise<Briefing | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update briefing: database not available");
    return null;
  }

  try {
    await db.update(briefings).set(updates).where(eq(briefings.id, id));
    return getBriefingById(id);
  } catch (error) {
    console.error("[Database] Failed to update briefing:", error);
    return null;
  }
}

export async function deleteBriefing(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete briefing: database not available");
    return false;
  }

  try {
    await db.delete(briefings).where(eq(briefings.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete briefing:", error);
    return false;
  }
}

// Custom Forms queries
export async function createCustomForm(form: InsertCustomForm): Promise<CustomForm | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create custom form: database not available");
    return null;
  }

  try {
    const result = await db.insert(customForms).values(form);
    const id = (result as any)[0]?.insertId;
    if (!id) return null;
    
    const created = await db.select().from(customForms).where(eq(customForms.id, id)).limit(1);
    return created.length > 0 ? created[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create custom form:", error);
    return null;
  }
}

export async function getCustomForms(): Promise<CustomForm[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get custom forms: database not available");
    return [];
  }

  try {
    return await db.select().from(customForms).where(eq(customForms.isActive, 1)).orderBy(desc(customForms.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get custom forms:", error);
    return [];
  }
}

export async function getCustomFormByLink(uniqueLink: string): Promise<CustomForm | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get custom form: database not available");
    return null;
  }

  try {
    const result = await db.select().from(customForms).where(eq(customForms.uniqueLink, uniqueLink)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get custom form:", error);
    return null;
  }
}

export async function deleteCustomForm(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete custom form: database not available");
    return false;
  }

  try {
    await db.delete(customForms).where(eq(customForms.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete custom form:", error);
    return false;
  }
}

// Custom Form Submissions
export async function createCustomFormSubmission(submission: InsertCustomFormSubmission): Promise<CustomFormSubmission | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create submission: database not available");
    return null;
  }

  try {
    const result = await db.insert(customFormSubmissions).values(submission);
    const id = (result as any)[0]?.insertId;
    if (!id) return null;
    
    const created = await db.select().from(customFormSubmissions).where(eq(customFormSubmissions.id, id)).limit(1);
    return created.length > 0 ? created[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create submission:", error);
    return null;
  }
}

export async function getCustomFormSubmissions(formId: number): Promise<CustomFormSubmission[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get submissions: database not available");
    return [];
  }

  try {
    return await db.select().from(customFormSubmissions).where(eq(customFormSubmissions.formId, formId)).orderBy(desc(customFormSubmissions.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get submissions:", error);
    return [];
  }
}
