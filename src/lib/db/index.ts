import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '$env/dynamic/private'
import { DefaultLogger } from 'drizzle-orm/logger'
import { log } from '$lib/logger'

export const drizzleLogger = new DefaultLogger({
	writer: {
		write(message) {
			log.warn(message)
		}
	}
})

export const db = drizzle(postgres(env.DB_URL), { logger: drizzleLogger })
