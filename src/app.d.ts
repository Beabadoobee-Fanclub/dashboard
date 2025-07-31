import { Service } from '@cloudflare/workers-types';


// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
        interface Platform {
            env: {
                API: Service,
                API_HOST: string,
            }
            cf: CfProperties
            ctx: ExecutionContext
        }
    }
}

export {};