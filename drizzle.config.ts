import type { Config } from "drizzle-kit";

export default {
	schema: "./src/lib/db/schema/*",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.DB_URL as string,
	},
} satisfies Config;
