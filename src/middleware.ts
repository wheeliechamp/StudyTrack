import createMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  console.log('Middleware is running!'); // この行を追加

  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          console.log(`Middleware: Getting cookie ${name}:`, request.cookies.get(name)?.value); // 追加
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          console.log(`Middleware: Setting cookie ${name}:`, value); // 追加
          request.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          console.log(`Middleware: Removing cookie ${name}`); // 追加
          request.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Refresh session if expired - this will update the session cookie as well
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  console.log('Middleware: Supabase user data:', user); // 追加
  console.log('Middleware: Supabase user error:', userError); // 追加

  // Next-intl middleware
  const nextIntlMiddleware = createMiddleware({
    locales: ['en', 'ja'],
    defaultLocale: 'en',
  });

  return nextIntlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};