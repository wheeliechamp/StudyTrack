import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from '@/navigation';
 
export const dynamic = 'force-dynamic';
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const locale = params.locale;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
 
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const messages = await getMessages();
 
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
