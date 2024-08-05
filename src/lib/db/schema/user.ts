import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: uuid("id").generatedAlwaysAs("uuid"),
	name: text("name"),
	email: text("email"),
	password: text("password"),
	role: text("role").$type<"admin" | "customer">(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});
