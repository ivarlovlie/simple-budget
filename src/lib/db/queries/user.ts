import { db } from "$lib/db";
import { user } from "$lib/db/schema/user";
import { count, eq } from "drizzle-orm";

export async function usernameIsUnique(username: string): Promise<boolean> {
	const result = await db.select({ count: count() }).from(user).where(eq(user.name, username));
	return result[0].count === 0;
}
