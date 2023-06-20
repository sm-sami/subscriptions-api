import {
  pgTable,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  name: varchar("name", { length: 255 }).notNull(),
  email: text("email").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isVerified: boolean("is_verified").notNull().default(false),
  code: text("verification_code").notNull(),
});

export const userSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email(),
  createdAt: (schema) => schema.createdAt.default(() => new Date()),
});

export const addUserSchema = userSchema.pick({
  name: true,
  email: true,
  createdAt: true,
});

export const verifyUserSchema = createSelectSchema(users, {}).pick({
  email: true,
  code: true,
});

export const deleteUserSchema = createSelectSchema(users, {}).pick({
  email: true,
});

export type User = InferModel<typeof users>;
export type NewUser = z.infer<typeof addUserSchema>;
