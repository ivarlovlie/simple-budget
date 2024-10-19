import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").unique().notNull(),
	email: text("email").unique(),
	password: text("password").notNull(),
	role: text("role").$type<"admin" | "customer">().notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at"),
});
