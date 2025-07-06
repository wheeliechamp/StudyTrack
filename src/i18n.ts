import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
const locales = ['en', 'ja'];
 
export default getRequestConfig(async () => {
  const { headers } = await import('next/headers');
  const locale = headers().get('x-next-intl-locale');
 
  if (!locales.includes(locale as any)) notFound();
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});