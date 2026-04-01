import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Briefings table for storing client form submissions
 */
export const briefings = mysqlTable("briefings", {
  id: int("id").autoincrement().primaryKey(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }).notNull(),
  briefingType: varchar("briefingType", { length: 50 }).notNull(),
  formData: text("formData").notNull(),
  status: mysqlEnum("status", ["novo", "em-andamento", "concluido"]).default("novo").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Briefing = typeof briefings.$inferSelect;
export type InsertBriefing = typeof briefings.$inferInsert;

/**
 * Custom forms table for storing client-specific form templates
 */
export const customForms = mysqlTable("customForms", {
  id: int("id").autoincrement().primaryKey(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }).notNull(),
  formTitle: varchar("formTitle", { length: 255 }).notNull(),
  htmlContent: text("htmlContent").notNull(),
  cssContent: text("cssContent"),
  uniqueLink: varchar("uniqueLink", { length: 100 }).notNull().unique(),
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CustomForm = typeof customForms.$inferSelect;
export type InsertCustomForm = typeof customForms.$inferInsert;

/**
 * Custom form submissions table
 */
export const customFormSubmissions = mysqlTable("customFormSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  formId: int("formId").notNull(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }).notNull(),
  formData: text("formData").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CustomFormSubmission = typeof customFormSubmissions.$inferSelect;
export type InsertCustomFormSubmission = typeof customFormSubmissions.$inferInsert;