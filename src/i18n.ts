import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { headers } from 'next/headers';
 
const locales = ['en', 'ja'];
 
export default getRequestConfig(async ({locale}) => {
  // This line ensures headers() is called in an async context
  headers();

  if (!locales.includes(locale as any)) notFound();
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});