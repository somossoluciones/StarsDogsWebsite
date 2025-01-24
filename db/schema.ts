import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

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
  breed: text("breed").notNull(),
  gender: text("gender").notNull(),
  age: text("age").notNull(),
  color: text("color").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  available: boolean("available").default(true).notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const lineageRelationships = pgTable("lineage_relationships", {
  id: serial("id").primaryKey(),
  puppyId: integer("puppy_id").notNull().references(() => puppies.id),
  parentId: integer("parent_id").notNull().references(() => puppies.id),
  relationshipType: text("relationship_type").notNull(), // 'father' or 'mother'
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

// Define relations
export const puppiesRelations = relations(puppies, ({ many }) => ({
  parentsRelations: many(lineageRelationships, { relationName: "child" }),
  childrenRelations: many(lineageRelationships, { relationName: "parent" }),
}));

export const lineageRelationsRelations = relations(lineageRelationships, ({ one }) => ({
  puppy: one(puppies, {
    fields: [lineageRelationships.puppyId],
    references: [puppies.id],
    relationName: "child",
  }),
  parent: one(puppies, {
    fields: [lineageRelationships.parentId],
    references: [puppies.id],
    relationName: "parent",
  }),
}));

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const insertPuppySchema = createInsertSchema(puppies);
export const selectPuppySchema = createSelectSchema(puppies);
export type InsertPuppy = typeof puppies.$inferInsert;
export type SelectPuppy = typeof puppies.$inferSelect;

export const insertLineageSchema = createInsertSchema(lineageRelationships);
export const selectLineageSchema = createSelectSchema(lineageRelationships);
export type InsertLineage = typeof lineageRelationships.$inferInsert;
export type SelectLineage = typeof lineageRelationships.$inferSelect;