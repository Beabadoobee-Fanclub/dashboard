// See https://svelte.dev/docs/kit/types#app.d.ts

import type { D1Database } from "@cloudflare/workers-types";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { db } from '$lib/server/db';

// for information about these interfaces
declare global {
	namespace App {
        interface Locals {
          user: DiscordAccount | null;
          db: DrizzleD1Database;
        }
        interface Platform {
          env?: {
            DATABASE: D1Database;
          }
        }
    }
}

export {};
