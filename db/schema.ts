import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  email: text("email").unique().notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const puppies = pgTable("puppies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: text("age").notNull(),
  color: text("color").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  available: boolean("available").default(true).notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const insertPuppySchema = createInsertSchema(puppies);
export const selectPuppySchema = createSelectSchema(puppies);
export type InsertPuppy = typeof puppies.$inferInsert;
export type SelectPuppy = typeof puppies.$inferSelect;