import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Create Supabase client for server-side operations (Route Handlers & Server Components)
 * Uses cookies to automatically retrieve the user's session from the request
 * This is the CORRECT pattern for Next.js App Router with Supabase
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set(name, value, options)
          } catch {
            // In Route Handlers, cookies().set() may fail if called after response is sent
            // This is expected and can be safely ignored
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set(name, '', options)
          } catch {
            // Same as above
          }
        }
      },
    }
  )
}
