import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: async (name: string) => {
          const cookieStore = cookies();
          return cookieStore.get(name)?.value;
        },
        set: (name: string, value: string, options: CookieOptions) => cookies().set(name, value, options),
        remove: (name: string, options: CookieOptions) => cookies().set(name, '', options),
      },
    }
  );
}
